import fs from "fs";
import path from "path";

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  difficulty: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export interface Article extends ArticleMetadata {
  content: string;
  htmlContent?: string;
  storageType?: string;
}

export interface LearningPath {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  modulesCount: number;
  tags: string[];
}

// Map the categories requested
export const CATEGORIES = [
  { name: "Equipment", slug: "equipment", count: 12, icon: "Settings", desc: "Peralatan mekanikal & industri" },
  { name: "Chemicals", slug: "chemical", count: 8, icon: "FlaskConical", desc: "Kimia minyak & pemrosesan" },
  { name: "Process Systems", slug: "process", count: 15, icon: "GitBranch", desc: "Sistem aliran & termodinamika" },
  { name: "Instrumentation", slug: "instrumentation", count: 10, icon: "Gauge", desc: "Sistem kontrol & otomasi" },
  { name: "Maintenance", slug: "maintenance", count: 9, icon: "Wrench", desc: "Perawatan & kehandalan mesin" },
  { name: "Safety", slug: "safety", count: 6, icon: "ShieldAlert", desc: "Keselamatan kerja & K3 industri" },
  { name: "Utilities", slug: "utilities", count: 5, icon: "Droplet", desc: "Sistem pendukung boiler & steam" },
  { name: "Learning Path", slug: "learning-path", count: 4, icon: "Map", desc: "Jalur belajar terstruktur" },
  { name: "Glossary", slug: "glossary", count: 45, icon: "BookOpen", desc: "Kamus istilah teknik industri" },
];

const CONTENT_PATH = path.join(process.cwd(), "content");

// Simple, robust frontmatter parser
export function parseFrontmatter(fileContent: string): { data: any; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent };
  }
  const yamlBlock = match[1];
  const content = match[2];
  const data: any = {};

  yamlBlock.split("\n").forEach((line) => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(":").trim();
      
      // Clean quotes
      let cleanedVal = val.replace(/^["']|["']$/g, "");
      
      if (cleanedVal === "true") {
        data[key] = true;
      } else if (cleanedVal === "false") {
        data[key] = false;
      } else if (cleanedVal.startsWith("[") && cleanedVal.endsWith("]")) {
        data[key] = cleanedVal
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      } else {
        data[key] = cleanedVal;
      }
    }
  });

  return { data, content };
}

// Fallback data in case the file reading has any runtime issues (e.g. during edge runtimes)
const fallbackArticles: Article[] = [
  {
    slug: "separator-tiga-fasa",
    title: "Separator Tiga Fasa: Pemisahan Gas, Minyak & Air",
    description: "Panduan teknis mendalam tentang separator tiga fasa, fungsi, komponen internal, prinsip pemisahan fluida, dan penanganan masalah operasional di industri migas.",
    category: "Equipment",
    categorySlug: "equipment",
    date: "2026-05-18",
    author: "Team Garudaloka",
    difficulty: "Menengah",
    readTime: "8 Menit",
    featured: true,
    tags: ["Separator", "Migas", "Pemisahan Fluida", "Process Equipment"],
    content: ""
  },
  {
    slug: "demulsifier",
    title: "Demulsifier: Mengatasi Emulsi Minyak dan Air",
    description: "Panduan kimia perminyakan tentang demulsifier, mekanisme pemecahan emulsi air dalam minyak, jenis surfaktan, dan aplikasi optimal di lapangan produksi migas.",
    category: "Chemicals",
    categorySlug: "chemical",
    date: "2026-05-18",
    author: "Team Garudaloka",
    difficulty: "Menengah",
    readTime: "6 Menit",
    featured: false,
    tags: ["Chemical", "Migas", "Demulsifier", "Emulsi", "Produksi"],
    content: ""
  },
  {
    slug: "upstream-migas",
    title: "Sistem Hulu Migas: Aliran Proses dari Sumur ke Terminal",
    description: "Gambaran komprehensif rantai proses industri hulu (upstream) minyak dan gas bumi, mulai dari reservoir, pengeboran, stasiun pengumpul, hingga stasiun pengapalan.",
    category: "Process Systems",
    categorySlug: "process",
    date: "2026-05-18",
    author: "Team Garudaloka",
    difficulty: "Pengantar",
    readTime: "7 Menit",
    featured: false,
    tags: ["Process", "Migas", "Upstream", "Produksi", "Eksplorasi"],
    content: ""
  },
  {
    slug: "choke-valve",
    title: "Choke Valve: Katup Pengontrol Tekanan Sumur",
    description: "Pengertian teknis choke valve (katup choke), fungsi pencegahan jatuhnya tekanan reservoir secara drastis, serta perbedaan tipe fixed choke dan adjustable choke.",
    category: "Glossary",
    categorySlug: "glossary",
    date: "2026-05-18",
    author: "Team Garudaloka",
    difficulty: "Pengantar",
    readTime: "4 Menit",
    featured: false,
    tags: ["Glossary", "Migas", "Valves", "Instrumentation", "Peralatan"],
    content: ""
  }
];

export async function getAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  
  try {
    if (!fs.existsSync(CONTENT_PATH)) {
      return fallbackArticles;
    }

    const folders = fs.readdirSync(CONTENT_PATH);
    
    for (const folder of folders) {
      const folderPath = path.join(CONTENT_PATH, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;
      
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;
        
        try {
          const filePath = path.join(folderPath, file);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data, content } = parseFrontmatter(fileContent);
          
          const slug = file.replace(/\.mdx$/, "").replace(/\.md$/, "");
          
          // Ensure tags are parsed as an array
          const rawTags = data.tags || [];
          const parsedTags = Array.isArray(rawTags)
            ? rawTags
            : (typeof rawTags === "string" ? rawTags.split(",").map((t: string) => t.trim()) : []);

          articles.push({
            slug,
            title: data.title || slug,
            description: data.description || "",
            category: data.category || folder,
            categorySlug: folder,
            date: data.date || "2026-05-18",
            author: data.author || "Editor Garudaloka",
            difficulty: data.difficulty || "Umum",
            readTime: data.readTime || "5 Menit",
            featured: !!data.featured,
            tags: parsedTags,
            content: content
          });
        } catch (fileError) {
          console.error(`Error reading article file ${folder}/${file}:`, fileError);
        }
      }
    }
  } catch (error) {
    console.error("Error reading MDX files", error);
    return fallbackArticles;
  }
  
  // Sort articles by date descending
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(categorySlug: string, slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(CONTENT_PATH, categorySlug, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = parseFrontmatter(fileContent);
      
      const rawTags = data.tags || [];
      const parsedTags = Array.isArray(rawTags)
        ? rawTags
        : (typeof rawTags === "string" ? rawTags.split(",").map((t: string) => t.trim()) : []);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: data.category || categorySlug,
        categorySlug,
        date: data.date || "2026-05-18",
        author: data.author || "Editor Garudaloka",
        difficulty: data.difficulty || "Umum",
        readTime: data.readTime || "5 Menit",
        featured: !!data.featured,
        tags: parsedTags,
        content: content
      };
    }
  } catch (error) {
    console.error(`Error reading article ${categorySlug}/${slug}`, error);
  }
  
  // Try matching fallback articles
  const matched = fallbackArticles.find((a) => a.categorySlug === categorySlug && a.slug === slug);
  if (matched) {
    // Attempt to load the real fallback content if file load failed
    return matched;
  }
  
  return null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.featured);
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getLearningPaths(): LearningPath[] {
  return [
    {
      slug: "proses-pemisahan-migas",
      title: "Jalur Proses Pemisahan Hidrokarbon Migas",
      description: "Kuasai konsep pemisahan cairan dan gas dari sumur produksi. Pelajari fungsi separator dua fasa, tiga fasa, dehidrasi gas, dan pengolahan emulsi.",
      duration: "4 Minggu",
      level: "Menengah",
      modulesCount: 5,
      tags: ["Separator", "Proses Hulu", "Migas", "Chemicals"]
    },
    {
      slug: "instrumentasi-dasar-industri",
      title: "Dasar-Dasar Instrumentasi & Sistem Kontrol",
      description: "Pelajari cara kerja sensor suhu, pemancar tekanan, katup kontrol (control valve), dan sistem interlock keselamatan ESD di pabrik kimia.",
      duration: "6 Minggu",
      level: "Pemula",
      modulesCount: 8,
      tags: ["Instrumentasi", "Valves", "Safety", "Control"]
    },
    {
      slug: "perawatan-kompresor-turbin",
      title: "Sistem Pemeliharaan Mesin Rotasi Industri",
      description: "Panduan pemeliharaan pompa sentrifugal, kompresor gas sentrifugal, turbin uap, dan analisis getaran (vibration analysis).",
      duration: "5 Minggu",
      level: "Mahir",
      modulesCount: 6,
      tags: ["Mechanical", "Maintenance", "Turbine", "Pumps"]
    }
  ];
}
