import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string || 'drafts').trim();
    const slug = (formData.get('slug') as string || `draft-${Date.now()}`).trim();

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer());
    const originalExt = path.extname(file.name).toLowerCase();
    
    // Sanitize filename
    const baseName = path.basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    const isSvg = originalExt === '.svg';
    const isGif = originalExt === '.gif';
    const shouldOptimize = !isSvg && !isGif;

    let finalBuffer: any = originalBuffer;
    let finalExt = originalExt;

    if (shouldOptimize) {
      try {
        // Optimize using sharp: convert to webp, compress, resize if width > 1600px
        let image = sharp(originalBuffer);
        const metadata = await image.metadata();

        if (metadata.width && metadata.width > 1600) {
          image = image.resize({
            width: 1600,
            fit: 'inside',
            withoutEnlargement: true
          });
        }

        finalBuffer = await image
          .webp({ quality: 80 })
          .toBuffer();
        
        finalExt = '.webp';
      } catch (err) {
        console.error('Sharp optimization failed, falling back to original file:', err);
        // Fallback to original buffer
        finalBuffer = originalBuffer;
        finalExt = originalExt;
      }
    }

    const finalFilename = `${baseName}${finalExt}`;
    const relativeUrl = `/content-assets/${category}/${slug}/${finalFilename}`;

    const githubToken = process.env.GITHUB_PAT;
    const isVercel = process.env.VERCEL === '1';

    let localWriteSuccess = false;

    // 1. Try writing locally first if NOT on Vercel
    if (!isVercel) {
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'content-assets', category, slug);
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, finalFilename);
        await fs.writeFile(filePath, finalBuffer);
        localWriteSuccess = true;
        console.log('Local image upload successful:', filePath);
      } catch (err) {
        console.error('Local image upload failed, attempting GitHub upload...', err);
      }
    }

    // 2. If local write was bypassed/failed and GITHUB_PAT is present, upload to GitHub
    if (!localWriteSuccess && githubToken) {
      const owner = 'Ismawant0';
      const repo = 'PGDown';
      const gitPath = `public/content-assets/${category}/${slug}/${finalFilename}`;
      const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${gitPath}`;

      try {
        // Check if file already exists to get SHA (updates it if it does)
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
        }

        // Commit image to GitHub
        const commitRes = await fetch(fileUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Garudaloka-CMS'
          },
          body: JSON.stringify({
            message: `cms: upload image ${finalFilename} for ${slug}`,
            content: finalBuffer.toString('base64'),
            branch: 'main',
            sha: sha
          })
        });

        if (commitRes.ok) {
          console.log('Successfully uploaded image to GitHub:', gitPath);
          return NextResponse.json({
            success: true,
            url: relativeUrl,
            message: 'Image uploaded and committed to GitHub successfully.'
          });
        } else {
          const errText = await commitRes.text();
          console.error('GitHub image upload commit failed:', errText);
          return NextResponse.json({ error: 'GitHub image upload failed' }, { status: 500 });
        }
      } catch (gitErr) {
        console.error('GitHub API transaction failed:', gitErr);
        return NextResponse.json({ error: 'GitHub transaction error' }, { status: 500 });
      }
    }

    if (localWriteSuccess) {
      return NextResponse.json({
        success: true,
        url: relativeUrl,
        message: 'Image uploaded locally successfully.'
      });
    }

    return NextResponse.json({ 
      error: 'Failed to write image file (Read-only system without GitHub credentials)' 
    }, { status: 500 });

  } catch (error: any) {
    console.error('Error handling image upload:', error);
    return NextResponse.json({ error: error.message || 'Failed to process image upload' }, { status: 500 });
  }
}
