import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getAllArticles, getArticleBySlug } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('categorySlug');
    const slug = searchParams.get('slug');

    if (categorySlug && slug) {
      const article = await getArticleBySlug(categorySlug, slug);
      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json(article);
    }

    const articles = await getAllArticles();
    return NextResponse.json(articles);
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('categorySlug');
    const slug = searchParams.get('slug');

    if (!categorySlug || !slug) {
      return NextResponse.json({ error: 'Missing categorySlug or slug parameters' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_PAT;
    const isVercel = process.env.VERCEL === '1';

    // 1. Try deleting locally first if NOT on Vercel
    let localDeleteSuccess = false;
    const filePath = path.join(process.cwd(), 'content', categorySlug, `${slug}.mdx`);

    if (!isVercel) {
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        localDeleteSuccess = true;
        console.log("Local delete successful!");
      } catch (err: any) {
        console.warn("Local delete failed or file not found, will check GitHub fallback.", err.message);
      }
    }

    if (localDeleteSuccess) {
      const { revalidatePath } = require('next/cache');
      revalidatePath(`/${categorySlug}/${slug}`);
      revalidatePath(`/category/${categorySlug}`);
      revalidatePath('/');
      return NextResponse.json({ success: true, message: 'Artikel berhasil dihapus.' });
    }

    // 2. Delete from GitHub if GITHUB_PAT is present
    if (githubToken) {
      const owner = 'Ismawant0';
      const repo = 'garudaloka';
      const gitPath = `content/${categorySlug}/${slug}.mdx`;
      const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${gitPath}`;

      try {
        // First retrieve file SHA from GitHub
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
          
          // Execute DELETE request to GitHub Contents API
          const gitDeleteRes = await fetch(fileUrl, {
            method: 'DELETE',
            headers: {
              'Authorization': `token ${githubToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Garudaloka-CMS'
            },
            body: JSON.stringify({
              message: `cms: delete article ${slug}`,
              sha: sha,
              branch: 'main'
            })
          });

          if (gitDeleteRes.ok) {
            console.log("Successfully deleted file from GitHub!");
            return NextResponse.json({ 
              success: true, 
              code: 'GITHUB_DELETED', 
              message: 'Artikel berhasil dihapus dari GitHub. Vercel akan memperbarui situs Anda dalam beberapa saat.' 
            });
          } else {
            const errText = await gitDeleteRes.text();
            console.error("Failed to delete file from GitHub:", errText);
          }
        } else {
          console.warn("File was not found on GitHub to delete.");
          // If not found on GitHub, it might be a local-only article in localStorage
          return NextResponse.json({ 
            success: true, 
            code: 'GITHUB_DELETED', 
            message: 'Artikel telah dihapus dari repositori cloud.' 
          });
        }
      } catch (gitErr) {
        console.error("GitHub API delete transaction failed:", gitErr);
      }
    }

    // 3. Fallback to read-only browser localStorage if all else fails
    return NextResponse.json({ 
      success: false, 
      code: 'READ_ONLY_FILESYSTEM', 
      message: 'Repositori berjalan di serverless hosting dengan read-only file system. Penghapusan akan dilakukan secara lokal.' 
    });
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete article' }, { status: 500 });
  }
}
