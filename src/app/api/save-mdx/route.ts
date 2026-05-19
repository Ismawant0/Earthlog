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

    // Save to the appropriate category directory
    const categoryFolder = path.join(process.cwd(), 'content', frontmatter.category);
    
    // Ensure the category directory exists
    await fs.mkdir(categoryFolder, { recursive: true });

    const filePath = path.join(categoryFolder, `${frontmatter.slug}.mdx`);

    await fs.writeFile(filePath, fileContent, 'utf-8');

    // Purge the Next.js cache for this article and relevant pages
    revalidatePath(`/${frontmatter.category}/${frontmatter.slug}`, 'page');
    revalidatePath(`/category/${frontmatter.category}`, 'page');
    revalidatePath('/', 'page');

    return NextResponse.json({ success: true, message: 'Artikel berhasil disimpan.' });
  } catch (error: any) {
    console.error('Error saving MDX:', error);
    return NextResponse.json({ error: error.message || 'Failed to save MDX' }, { status: 500 });
  }
}
