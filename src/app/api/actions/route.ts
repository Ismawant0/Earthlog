import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const githubToken = process.env.GITHUB_PAT;
  const owner = "Ismawant0";
  const repo = "Earthlog";

  // 1. Try fetching live actions from GitHub API if token is present
  if (githubToken) {
    try {
      const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/actions`;
      const res = await fetch(fileUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Earthlog-CMS'
        },
        next: { revalidate: 30 } // Cache list for 30 seconds
      });

      if (res.ok) {
        const files = await res.json();
        if (Array.isArray(files)) {
          const actions = [];
          for (const file of files) {
            if (file.name.endsWith(".json") && file.name !== ".gitkeep") {
              const fileContentRes = await fetch(file.download_url);
              if (fileContentRes.ok) {
                try {
                  const data = await fileContentRes.json();
                  actions.push(data);
                } catch (parseErr) {
                  console.error(`Failed to parse json for file ${file.name}:`, parseErr);
                }
              }
            }
          }
          // Sort newest first
          actions.sort((a, b) => b.id.localeCompare(a.id));
          return NextResponse.json(actions);
        }
      }
    } catch (e) {
      console.error("Failed to fetch actions from GitHub API, falling back to local files:", e);
    }
  }

  // 2. Fallback: Read local actions directory from filesystem
  try {
    const actionsDir = path.join(process.cwd(), "content", "actions");
    const files = await fs.readdir(actionsDir);
    const actions = [];

    for (const file of files) {
      if (file.endsWith(".json") && file !== ".gitkeep") {
        try {
          const content = await fs.readFile(path.join(actionsDir, file), "utf-8");
          actions.push(JSON.parse(content));
        } catch (fileErr) {
          console.error(`Error reading/parsing local action file ${file}:`, fileErr);
        }
      }
    }

    // Sort newest first
    actions.sort((a, b) => b.id.localeCompare(a.id));
    return NextResponse.json(actions);
  } catch (e) {
    return NextResponse.json([]);
  }
}
export const dynamic = 'force-dynamic';
