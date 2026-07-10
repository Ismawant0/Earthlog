import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { mdxComponents } from "@/components/MdxComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Calendar, Clock, ChevronRight, ArrowLeft } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug("articles", slug);
  if (!article) return {};

  return {
    title: `${article.title} — Earthlog`,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      title: `${article.title} — Earthlog`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.cover || "/og-image.png",
          alt: article.title,
        }
      ],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug("articles", slug);

  if (!article) {
    return notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-12 md:py-20">
        <div className="max-w-[740px] mx-auto px-6 space-y-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-foreground-sub select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/articles" className="hover:text-primary transition-colors">
              Articles
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-bold truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>

          {/* Article Header */}
          <div className="space-y-4 border-b border-border pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase select-none">
              <span>{article.category}</span>
              <span className="text-border">&bull;</span>
              <span className="flex items-center gap-1 text-foreground-sub">
                <Clock className="h-3.5 w-3.5" /> {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {article.title}
            </h1>

            <p className="text-base text-foreground-sub leading-relaxed font-medium">
              {article.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-foreground-sub select-none pt-2">
              <span className="font-semibold text-foreground">By {article.author}</span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {article.date}
              </span>
            </div>
          </div>

          {/* Cover Photo */}
          {article.cover && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-background border border-border select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body (MDX Content) */}
          <div className="article-body prose max-w-none text-foreground leading-relaxed text-[17px] font-serif">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          </div>

          {/* Back link */}
          <div className="pt-8 border-t border-border select-none">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground-sub hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Articles
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
