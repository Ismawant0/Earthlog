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

    const filePath = path.join(process.cwd(), 'content', categorySlug, `${slug}.mdx`);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'Article file does not exist or cannot be deleted' }, { status: 404 });
    }

    await fs.unlink(filePath);
    
    // Purge cache after deletion
    const { revalidatePath } = require('next/cache');
    revalidatePath(`/${categorySlug}/${slug}`);
    revalidatePath(`/category/${categorySlug}`);
    revalidatePath('/');
    
    return NextResponse.json({ success: true, message: 'Artikel berhasil dihapus.' });
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete article' }, { status: 500 });
  }
}
