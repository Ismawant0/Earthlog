import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const action = await req.json();
    
    if (!action || !action.id || !action.category || !action.title) {
      return NextResponse.json({ error: 'Missing required action fields (id, category, title)' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_PAT;
    const owner = 'Ismawant0';
    const repo = 'Earthlog';
    
    const fileContent = JSON.stringify(action, null, 2);
    const filename = `${action.id}.json`;
    const gitPath = `content/actions/${filename}`;

    const isVercel = process.env.VERCEL === '1';
    let localWriteSuccess = false;

    // 1. Try writing locally first if not on Vercel
    if (!isVercel) {
      try {
        const actionsFolder = path.join(process.cwd(), 'content', 'actions');
        await fs.mkdir(actionsFolder, { recursive: true });
        const filePath = path.join(actionsFolder, filename);
        await fs.writeFile(filePath, fileContent, 'utf-8');
        localWriteSuccess = true;
        console.log("Logged action saved locally:", filePath);
      } catch (err) {
        console.error("Local action write failed:", err);
      }
    }

    if (localWriteSuccess) {
      return NextResponse.json({ success: true, message: 'Action logged locally.' });
    }

    // 2. Commit directly to GitHub using token if local write bypassed/failed
    if (githubToken) {
      const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${gitPath}`;

      try {
        const commitRes = await fetch(fileUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Earthlog-CMS'
          },
          body: JSON.stringify({
            message: `community: log new action ${action.title}`,
            content: Buffer.from(fileContent).toString('base64'),
            branch: 'main'
          })
        });

        if (commitRes.ok) {
          console.log("Logged action committed to GitHub successfully!");
          return NextResponse.json({ 
            success: true, 
            message: 'Aksi berhasil disimpan dan di-commit langsung ke repositori GitHub. Vercel akan membangun ulang situs Anda.' 
          });
        } else {
          const errText = await commitRes.text();
          console.error("GitHub action commit failed:", errText);
          return NextResponse.json({ error: 'GitHub commit failed', details: errText }, { status: 500 });
        }
      } catch (gitErr: any) {
        console.error("GitHub API action transaction failed:", gitErr);
        return NextResponse.json({ error: 'GitHub action API transaction failed', details: gitErr.message }, { status: 500 });
      }
    }

    return NextResponse.json({ 
      error: 'Failed to write action file (Read-only system without GitHub credentials)' 
    }, { status: 500 });

  } catch (error: any) {
    console.error('Error saving action:', error);
    return NextResponse.json({ error: error.message || 'Failed to save action' }, { status: 500 });
  }
}
