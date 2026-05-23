import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { mdxContent, metadata, originalSlug, originalCategory } = data;
    console.log("RECEIVED SAVE REQUEST for:", metadata?.slug);
    console.log("MDX CONTENT PREVIEW:", mdxContent ? mdxContent.substring(0, 100) : "EMPTY");

    if (!metadata || !metadata.slug || !metadata.category) {
      return NextResponse.json({ error: 'Missing required metadata (slug, category)' }, { status: 400 });
    }

    // Extract categories
    let categorySlugs: string[] = [];
    if (Array.isArray(metadata.category)) {
      categorySlugs = metadata.category.map((c: string) => c.trim()).filter(Boolean);
    } else if (typeof metadata.category === 'string') {
      categorySlugs = metadata.category.split(',').map((c: string) => c.trim()).filter(Boolean);
    } else {
      categorySlugs = [String(metadata.category).trim()];
    }
    const primaryCategory = categorySlugs[0] || 'fundamentals';
    const githubToken = process.env.GITHUB_PAT;

    // Perform draft images relocation if any
    let cleanedMdxContent = mdxContent;
    try {
      cleanedMdxContent = await relocateImages(mdxContent, primaryCategory, metadata.slug, githubToken);
    } catch (relocError) {
      console.error("Draft relocation error (non-fatal):", relocError);
    }

    // Prepare frontmatter object
    const frontmatter = {
      title: metadata.title || '',
      slug: metadata.slug,
      category: categorySlugs, // Stored as array
      description: metadata.description || '',
      difficulty: metadata.difficulty || 'Beginner',
      keywords: metadata.keywords || [],
      takeaways: metadata.takeaways || [],
      tags: metadata.tags || [],
      readingTime: metadata.readingTime || '5 min',
      featured: metadata.featured || false,
      date: metadata.date || new Date().toISOString().split('T')[0],
      cover: metadata.cover || '',
    };

    // Generate MDX with frontmatter
    const fileContent = matter.stringify(cleanedMdxContent || '', frontmatter);

    const isVercel = process.env.VERCEL === '1';

    // 1. Try writing locally first if NOT on Vercel
    let localWriteSuccess = false;
    if (!isVercel) {
      try {
        const categoryFolder = path.join(process.cwd(), 'content', primaryCategory);
        await fs.mkdir(categoryFolder, { recursive: true });
        const filePath = path.join(categoryFolder, `${frontmatter.slug}.mdx`);
        await fs.writeFile(filePath, fileContent, 'utf-8');
        localWriteSuccess = true;
        console.log("Local write successful!");

        // If it's a rename/move, delete the old file!
        if (originalSlug && originalCategory && (originalSlug !== frontmatter.slug || originalCategory !== primaryCategory)) {
          const oldFilePath = path.join(process.cwd(), 'content', originalCategory, `${originalSlug}.mdx`);
          try {
            await fs.unlink(oldFilePath);
            console.log("Deleted old file on local rename:", oldFilePath);
          } catch (unlinkErr) {
            console.warn("Failed to delete old file on local rename:", unlinkErr);
          }
        }
      } catch (err) {
        console.warn("Local write failed, attempting GitHub path...", err);
      }
    }

    if (localWriteSuccess) {
      // Purge Next.js cache locally
      revalidatePath(`/${primaryCategory}/${frontmatter.slug}`, 'page');
      revalidatePath(`/category/${primaryCategory}`, 'page');
      revalidatePath('/', 'page');

      if (originalSlug && originalCategory) {
        revalidatePath(`/${originalCategory}/${originalSlug}`, 'page');
        revalidatePath(`/category/${originalCategory}`, 'page');
      }

      return NextResponse.json({ success: true, message: 'Artikel berhasil disimpan.' });
    }

    // 2. If local write was bypassed/failed and GITHUB_PAT is present, save to GitHub!
    if (githubToken) {
      const owner = 'Ismawant0';
      const repo = 'garudaloka';

      // If it's a rename/move on GitHub, first delete the old file on GitHub!
      if (originalSlug && originalCategory && (originalSlug !== frontmatter.slug || originalCategory !== primaryCategory)) {
        const oldGitPath = `content/${originalCategory}/${originalSlug}.mdx`;
        const oldFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${oldGitPath}`;
        try {
          const getOldFileRes = await fetch(oldFileUrl, {
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Garudaloka-CMS'
            }
          });
          if (getOldFileRes.ok) {
            const oldFileData = await getOldFileRes.json();
            const oldSha = oldFileData.sha;
            await fetch(oldFileUrl, {
              method: 'DELETE',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Garudaloka-CMS'
              },
              body: JSON.stringify({
                message: `cms: delete old file on rename ${originalSlug}`,
                sha: oldSha,
                branch: 'main'
              })
            });
            console.log("Deleted old file on GitHub rename:", oldGitPath);
          }
        } catch (gitDeleteErr) {
          console.error("Failed to delete old file on GitHub rename:", gitDeleteErr);
        }
      }

      const gitPath = `content/${primaryCategory}/${frontmatter.slug}.mdx`;
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

async function relocateImages(
  mdxContent: string, 
  primaryCategory: string, 
  slug: string, 
  githubToken?: string
): Promise<string> {
  const draftRegex = /\/content-assets\/drafts\/(draft-[a-zA-Z0-9]+)\//g;
  const draftIds = new Set<string>();
  let match;
  while ((match = draftRegex.exec(mdxContent)) !== null) {
    draftIds.add(match[1]);
  }

  if (draftIds.size === 0) return mdxContent;

  let updatedMdx = mdxContent;
  const owner = 'Ismawant0';
  const repo = 'garudaloka';

  for (const draftId of draftIds) {
    console.log(`[Relocating] Processing draft folder: ${draftId} to ${primaryCategory}/${slug}`);
    
    // 1. Local filesystem relocation (if NOT Vercel)
    const isVercel = process.env.VERCEL === '1';
    let localMoved = false;

    if (!isVercel) {
      try {
        const localSourceDir = path.join(process.cwd(), 'public', 'content-assets', 'drafts', draftId);
        const localDestDir = path.join(process.cwd(), 'public', 'content-assets', primaryCategory, slug);
        
        const stat = await fs.stat(localSourceDir).catch(() => null);
        if (stat && stat.isDirectory()) {
          await fs.mkdir(localDestDir, { recursive: true });
          const files = await fs.readdir(localSourceDir);
          
          for (const file of files) {
            const srcFile = path.join(localSourceDir, file);
            const destFile = path.join(localDestDir, file);
            await fs.rename(srcFile, destFile);
            console.log(`[Relocating] Moved local file: ${file}`);
          }
          
          await fs.rmdir(localSourceDir);
          localMoved = true;
          console.log(`[Relocating] Removed local source folder: ${draftId}`);
        }
      } catch (err) {
        console.error(`[Relocating] Local move failed for ${draftId}:`, err);
      }
    }

    // 2. GitHub relocation
    if (githubToken) {
      const sourceGitDir = `public/content-assets/drafts/${draftId}`;
      const listUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${sourceGitDir}`;

      try {
        const listRes = await fetch(listUrl, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Garudaloka-CMS'
          }
        });

        if (listRes.ok) {
          const files = await listRes.json();
          if (Array.isArray(files)) {
            for (const file of files) {
              if (file.type === 'file') {
                const filename = file.name;
                const fileSha = file.sha;
                
                const getFileRes = await fetch(file.url, {
                  headers: {
                    'Authorization': `token ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Garudaloka-CMS'
                  }
                });

                if (getFileRes.ok) {
                  const fileData = await getFileRes.json();
                  const base64Content = fileData.content;
                  
                  const destGitPath = `public/content-assets/${primaryCategory}/${slug}/${filename}`;
                  const putDestUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${destGitPath}`;
                  
                  let destSha = undefined;
                  const getDestRes = await fetch(putDestUrl, {
                    headers: {
                      'Authorization': `token ${githubToken}`,
                      'Accept': 'application/vnd.github.v3+json',
                      'User-Agent': 'Garudaloka-CMS'
                    }
                  });
                  if (getDestRes.ok) {
                    const destData = await getDestRes.json();
                    destSha = destData.sha;
                  }

                  const putRes = await fetch(putDestUrl, {
                    method: 'PUT',
                    headers: {
                      'Authorization': `token ${githubToken}`,
                      'Content-Type': 'application/json',
                      'Accept': 'application/vnd.github.v3+json',
                      'User-Agent': 'Garudaloka-CMS'
                    },
                    body: JSON.stringify({
                      message: `cms: relocate image ${filename} to ${slug}`,
                      content: base64Content,
                      branch: 'main',
                      sha: destSha
                    })
                  });

                  if (putRes.ok) {
                    console.log(`[Relocating] Copied image on GitHub to: ${destGitPath}`);
                    
                    const deleteRes = await fetch(file.url, {
                      method: 'DELETE',
                      headers: {
                        'Authorization': `token ${githubToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'Garudaloka-CMS'
                      },
                      body: JSON.stringify({
                        message: `cms: cleanup relocated draft image ${filename}`,
                        sha: fileSha,
                        branch: 'main'
                      })
                    });
                    
                    if (deleteRes.ok) {
                      console.log(`[Relocating] Deleted draft image on GitHub: ${file.path}`);
                    }
                  }
                }
              }
            }
          }
        }
      } catch (gitErr) {
        console.error(`[Relocating] GitHub image move transaction failed:`, gitErr);
      }
    }

    const searchStr = `/content-assets/drafts/${draftId}/`;
    const replaceStr = `/content-assets/${primaryCategory}/${slug}/`;
    updatedMdx = updatedMdx.replaceAll(searchStr, replaceStr);
    console.log(`[Relocating] Rewrote MDX URLs from ${searchStr} to ${replaceStr}`);
  }

  return updatedMdx;
}
