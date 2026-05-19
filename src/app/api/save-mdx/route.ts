import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { mdxContent, metadata } = data;
    console.log("RECEIVED SAVE REQUEST for:", metadata?.slug);
    console.log("MDX CONTENT PREVIEW:", mdxContent ? mdxContent.substring(0, 100) : "EMPTY");

    if (!metadata || !metadata.slug || !metadata.category) {
      return NextResponse.json({ error: 'Missing required metadata (slug, category)' }, { status: 400 });
    }

    // Prepare frontmatter object
    const frontmatter = {
      title: metadata.title || '',
      slug: metadata.slug,
      category: metadata.category,
      description: metadata.description || '',
      difficulty: metadata.difficulty || 'Beginner',
      keywords: metadata.keywords || [],
      tags: metadata.tags || [],
      readingTime: metadata.readingTime || '5 min',
      featured: metadata.featured || false,
      date: metadata.date || new Date().toISOString().split('T')[0],
      cover: metadata.cover || '',
    };

    // Generate MDX with frontmatter
    const fileContent = matter.stringify(mdxContent || '', frontmatter);

    const githubToken = process.env.GITHUB_PAT;
    const isVercel = process.env.VERCEL === '1';

    // 1. Try writing locally first if NOT on Vercel
    let localWriteSuccess = false;
    if (!isVercel) {
      try {
        const categoryFolder = path.join(process.cwd(), 'content', frontmatter.category);
        await fs.mkdir(categoryFolder, { recursive: true });
        const filePath = path.join(categoryFolder, `${frontmatter.slug}.mdx`);
        await fs.writeFile(filePath, fileContent, 'utf-8');
        localWriteSuccess = true;
        console.log("Local write successful!");
      } catch (err) {
        console.warn("Local write failed, attempting GitHub path...", err);
      }
    }

    if (localWriteSuccess) {
      // Purge Next.js cache locally
      revalidatePath(`/${frontmatter.category}/${frontmatter.slug}`, 'page');
      revalidatePath(`/category/${frontmatter.category}`, 'page');
      revalidatePath('/', 'page');
      return NextResponse.json({ success: true, message: 'Artikel berhasil disimpan.' });
    }

    // 2. If local write was bypassed/failed and GITHUB_PAT is present, save to GitHub!
    if (githubToken) {
      const owner = 'Ismawant0';
      const repo = 'garudaloka';
      const gitPath = `content/${frontmatter.category}/${frontmatter.slug}.mdx`;
      const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${gitPath}`;

      try {
        // Retrieve SHA if the file already exists on GitHub
        let sha = undefined;
        const getFileRes = await fetch(fileUrl, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Garudaloka-CMS'
          }
        });

        if (getFileRes.ok) {
          const fileData = await getFileRes.json();
          sha = fileData.sha;
          console.log(`File exists on GitHub. SHA: ${sha}`);
        }

        // Commit directly via GitHub API
        const commitRes = await fetch(fileUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Garudaloka-CMS'
          },
          body: JSON.stringify({
            message: `cms: ${sha ? 'update' : 'create'} article ${frontmatter.title}`,
            content: Buffer.from(fileContent).toString('base64'),
            branch: 'main',
            sha: sha
          })
        });

        if (commitRes.ok) {
          console.log("Successfully committed to GitHub!");
          return NextResponse.json({ 
            success: true, 
            code: 'GITHUB_SAVED', 
            message: 'Artikel berhasil disimpan dan di-commit langsung ke repositori GitHub. Vercel akan membangun ulang situs Anda dalam beberapa saat.' 
          });
        } else {
          const errText = await commitRes.text();
          console.error("GitHub commit failed:", errText);
        }
      } catch (gitErr) {
        console.error("GitHub API transaction failed:", gitErr);
      }
    }

    // 3. Fallback to read-only browser localStorage if all else fails
    return NextResponse.json({ 
      success: false, 
      code: 'READ_ONLY_FILESYSTEM', 
      message: 'Repositori berjalan di serverless hosting dengan read-only file system. Perubahan Anda akan disimpan sementara secara lokal di browser Anda.' 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving MDX:', error);
    return NextResponse.json({ error: error.message || 'Failed to save MDX' }, { status: 500 });
  }
}
