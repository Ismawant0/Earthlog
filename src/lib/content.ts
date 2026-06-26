import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  category: string;
  categories: string[];
  categorySlug: string;
  date: string;
  author: string;
  difficulty: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  keywords?: string[];
  takeaways?: string[];
  cover?: string;
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
export const CATEGORIES = [
  // PGDOWN technology categories
  { name: "News", slug: "news", count: 1, icon: "Newspaper", desc: "Latest updates, announcements, and tech industry news." },
  { name: "Software", slug: "software", count: 1, icon: "Code", desc: "Software engineering, apps, architecture, and development." },
  { name: "Hardware", slug: "hardware", count: 1, icon: "Cpu", desc: "Hardware reviews, gadgets, processors, and devices." },
  { name: "Reviews", slug: "reviews", count: 1, icon: "Star", desc: "In-depth reviews of software, hardware, and tech services." },
  { name: "AI", slug: "ai", count: 1, icon: "Cpu", desc: "Artificial Intelligence, Machine Learning, LLMs, and Neural Networks." },
  { name: "Linux", slug: "linux", count: 1, icon: "Terminal", desc: "Linux distributions, kernel development, command line tools, and open source ecosystems." },
  { name: "Windows", slug: "windows", count: 1, icon: "Monitor", desc: "Windows development, system administration, PowerShell, and enterprise technology." },
  { name: "Open Source", slug: "open-source", count: 1, icon: "GitBranch", desc: "Open source software, licensing, community projects, and collaborative development." },
  { name: "Cyber Security", slug: "cyber-security", count: 1, icon: "Shield", desc: "Network security, penetration testing, threat intelligence, and vulnerability mitigation." },
  { name: "Programming", slug: "programming", count: 1, icon: "Code2", desc: "Programming languages, algorithms, data structures, and syntax guides." },
  { name: "Cloud", slug: "cloud", count: 1, icon: "CloudSun", desc: "Cloud computing, AWS, Azure, GCP, Docker, Kubernetes, and DevOps pipelines." },

  // Keep old categories as fallback so dynamic lookup does not crash on existing content
  { name: "Fundamentals", slug: "fundamentals", count: 0, icon: "Library", desc: "Basic engineering, industrial science, thermodynamics, fluid mechanics, and oil & gas fundamentals." },
  { name: "Production Operations", slug: "production-operations", count: 0, icon: "Factory", desc: "Oil & gas production facilities, operational flow, and production systems." },
  { name: "Equipment", slug: "equipment", count: 12, icon: "Settings", desc: "Industrial static and rotating equipment used in oil & gas and process industries." },
  { name: "Process Systems", slug: "process-systems", count: 15, icon: "GitBranch", desc: "Industrial process systems, separation, flow systems, and thermodynamic processes." },
  { name: "Process Chemicals", slug: "process-chemicals", count: 8, icon: "FlaskConical", desc: "Chemical treatment and processing chemicals used in oil & gas facilities." },
  { name: "Instrumentation", slug: "instrumentation", count: 10, icon: "Gauge", desc: "Sensors, control systems, automation, PLC, DCS, and industrial instrumentation." },
  { name: "Maintenance", slug: "maintenance", count: 9, icon: "Wrench", desc: "Asset reliability, inspection, maintenance engineering, and integrity systems." },
  { name: "Safety", slug: "safety", count: 6, icon: "ShieldAlert", desc: "Industrial safety, process safety, and HSE systems." },
  { name: "Utility Systems", slug: "utility-systems", count: 5, icon: "Droplet", desc: "Supporting systems required for industrial plant operation." },
  { name: "Troubleshooting", slug: "troubleshooting", count: 0, icon: "AlertTriangle", desc: "Operational issues, failure modes, diagnosis, and corrective action." },
  { name: "Learning Path", slug: "learning-path", count: 4, icon: "Map", desc: "Structured guided learning roadmap for different career paths." },
  { name: "Glossary", slug: "glossary", count: 45, icon: "BookOpen", desc: "Technical engineering terminology and definitions." },
];

const CONTENT_PATH = path.join(process.cwd(), "content");

// Simple, robust frontmatter parser using gray-matter
export function parseFrontmatter(fileContent: string): { data: any; content: string } {
  try {
    const { data, content } = matter(fileContent);
    return { data, content };
  } catch (error) {
    console.error("Error parsing with gray-matter, falling back:", error);
    // Basic fallback regex parser if gray-matter fails
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
}

// Fallback data in case the file reading has any runtime issues (e.g. during edge runtimes)
const fallbackArticles: Article[] = [
  {
    slug: "separator-tiga-fasa",
    title: "Separator Tiga Fasa: Pemisahan Gas, Minyak & Air",
    description: "Panduan teknis mendalam tentang separator tiga fasa, fungsi, komponen internal, prinsip pemisahan fluida, dan penanganan masalah operasional di industri migas.",
    category: "Equipment",
    categories: ["equipment"],
    categorySlug: "equipment",
    date: "2026-05-18",
    author: "PGDOWN Team",
    difficulty: "Menengah",
    readTime: "8 Menit",
    featured: true,
    tags: ["Separator", "Migas", "Pemisahan Fluida", "Process Equipment"],
    keywords: ["Separator 3 Fasa", "Separator Tiga Fasa", "Pemisahan Fluida"],
    cover: "",
    content: ""
  },
  {
    slug: "demulsifier",
    title: "Demulsifier: Mengatasi Emulsi Minyak dan Air",
    description: "Panduan kimia perminyakan tentang demulsifier, mekanisme pemecahan emulsi air dalam minyak, jenis surfaktan, dan aplikasi optimal di lapangan produksi migas.",
    category: "Process Chemicals",
    categories: ["process-chemicals"],
    categorySlug: "process-chemicals",
    date: "2026-05-18",
    author: "PGDOWN Team",
    difficulty: "Menengah",
    readTime: "6 Menit",
    featured: false,
    tags: ["Chemical", "Migas", "Demulsifier", "Emulsi", "Produksi"],
    keywords: ["Demulsifier", "Emulsi", "Minyak Air"],
    cover: "",
    content: ""
  },
  {
    slug: "upstream-migas",
    title: "Sistem Hulu Migas: Aliran Proses dari Sumur ke Terminal",
    description: "Gambaran komprehensif rantai proses industri hulu (upstream) minyak dan gas bumi, mulai dari reservoir, pengeboran, stasiun pengumpul, hingga stasiun pengapalan.",
    category: "Process Systems",
    categories: ["process-systems"],
    categorySlug: "process-systems",
    date: "2026-05-18",
    author: "PGDOWN Team",
    difficulty: "Pengantar",
    readTime: "7 Menit",
    featured: false,
    tags: ["Process", "Migas", "Upstream", "Produksi", "Eksplorasi"],
    keywords: ["Upstream", "Hulu Migas", "Aliran Proses"],
    cover: "",
    content: ""
  },
  {
    slug: "choke-valve",
    title: "Choke Valve: Katup Pengontrol Tekanan Sumur",
    description: "Pengertian teknis choke valve (katup choke), fungsi pencegahan jatuhnya tekanan reservoir secara drastis, serta perbedaan tipe fixed choke dan adjustable choke.",
    category: "Glossary",
    categories: ["glossary"],
    categorySlug: "glossary",
    date: "2026-05-18",
    author: "PGDOWN Team",
    difficulty: "Pengantar",
    readTime: "4 Menit",
    featured: false,
    tags: ["Glossary", "Migas", "Valves", "Instrumentation", "Peralatan"],
    keywords: ["Choke Valve", "Katup Choke"],
    cover: "",
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
          
          // Parse categories array and category display string
          const rawCategory = data.category || folder;
          let parsedCategories: string[] = [];
          if (Array.isArray(rawCategory)) {
            parsedCategories = rawCategory.map(c => String(c).trim());
          } else if (typeof rawCategory === "string") {
            parsedCategories = rawCategory.split(",").map(c => c.trim()).filter(Boolean);
          } else {
            parsedCategories = [String(rawCategory).trim()];
          }

          const categoriesSlugs = parsedCategories.map(c => {
            const found = CATEGORIES.find(cat => cat.slug === c.toLowerCase() || cat.name.toLowerCase() === c.toLowerCase());
            return found ? found.slug : c.toLowerCase().replace(/\s+/g, '-');
          });

          const categoriesNames = categoriesSlugs.map(s => {
            const found = CATEGORIES.find(cat => cat.slug === s);
            return found ? found.name : s;
          });
          
          // Ensure tags are parsed as an array
          const rawTags = data.tags || [];
          const parsedTags = Array.isArray(rawTags)
            ? rawTags
            : (typeof rawTags === "string" ? rawTags.split(",").map((t: string) => t.trim()) : []);

          // Ensure keywords are parsed as an array
          const rawKeywords = data.keywords || [];
          const parsedKeywords = Array.isArray(rawKeywords)
            ? rawKeywords
            : (typeof rawKeywords === "string" ? rawKeywords.split(/[;,]/).map((k: string) => k.trim()).filter(Boolean) : []);

          // Ensure takeaways are parsed as an array
          const rawTakeaways = data.takeaways || [];
          const parsedTakeaways = Array.isArray(rawTakeaways)
            ? rawTakeaways
            : (typeof rawTakeaways === "string" ? rawTakeaways.split(/[;,]/).map((k: string) => k.trim()).filter(Boolean) : []);

          const safeContent = content.replace(/<(img|br|hr)\b([^>]*?)(?:\/?)>/gi, '<$1$2 />');

          articles.push({
            slug,
            title: data.title || slug,
            description: data.description || "",
            category: categoriesNames.join(", "),
            categories: categoriesSlugs,
            categorySlug: categoriesSlugs[0] || folder,
            date: data.date || "2026-05-18",
            author: data.author || "PGDOWN Editor",
            difficulty: data.difficulty || "Umum",
            readTime: data.readingTime || data.readTime || "5 Menit",
            featured: !!data.featured,
            tags: parsedTags,
            keywords: parsedKeywords,
            takeaways: parsedTakeaways,
            cover: data.cover || "",
            content: safeContent
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
  const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log(`[DEBUG] getAllArticles returning ${sortedArticles.length} total articles. Equipment articles:`, sortedArticles.filter(a => a.categorySlug === 'equipment').map(a => a.slug));
  return sortedArticles;
}

export async function getArticleBySlug(categorySlug: string, slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(CONTENT_PATH, categorySlug, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = parseFrontmatter(fileContent);
      
      // Parse categories array and category display string
      const rawCategory = data.category || categorySlug;
      let parsedCategories: string[] = [];
      if (Array.isArray(rawCategory)) {
        parsedCategories = rawCategory.map(c => String(c).trim());
      } else if (typeof rawCategory === "string") {
        parsedCategories = rawCategory.split(",").map(c => c.trim()).filter(Boolean);
      } else {
        parsedCategories = [String(rawCategory).trim()];
      }

      const categoriesSlugs = parsedCategories.map(c => {
        const found = CATEGORIES.find(cat => cat.slug === c.toLowerCase() || cat.name.toLowerCase() === c.toLowerCase());
        return found ? found.slug : c.toLowerCase().replace(/\s+/g, '-');
      });

      const categoriesNames = categoriesSlugs.map(s => {
        const found = CATEGORIES.find(cat => cat.slug === s);
        return found ? found.name : s;
      });

      const rawTags = data.tags || [];
      const parsedTags = Array.isArray(rawTags)
        ? rawTags
        : (typeof rawTags === "string" ? rawTags.split(",").map((t: string) => t.trim()) : []);

      // Ensure keywords are parsed as an array
      const rawKeywords = data.keywords || [];
      const parsedKeywords = Array.isArray(rawKeywords)
        ? rawKeywords
        : (typeof rawKeywords === "string" ? rawKeywords.split(/[;,]/).map((k: string) => k.trim()).filter(Boolean) : []);

      // Ensure takeaways are parsed as an array
      const rawTakeaways = data.takeaways || [];
      const parsedTakeaways = Array.isArray(rawTakeaways)
        ? rawTakeaways
        : (typeof rawTakeaways === "string" ? rawTakeaways.split(/[;,]/).map((k: string) => k.trim()).filter(Boolean) : []);

      const safeContent = content.replace(/<(img|br|hr)\b([^>]*?)(?:\/?)>/gi, '<$1$2 />');

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: categoriesNames.join(", "),
        categories: categoriesSlugs,
        categorySlug: categoriesSlugs[0] || categorySlug,
        date: data.date || "2026-05-18",
        author: data.author || "PGDOWN Editor",
        difficulty: data.difficulty || "Umum",
        readTime: data.readingTime || data.readTime || "5 Menit",
        featured: !!data.featured,
        tags: parsedTags,
        keywords: parsedKeywords,
        takeaways: parsedTakeaways,
        cover: data.cover || "",
        content: safeContent
      };
    }
  } catch (error) {
    console.error(`Error reading article ${categorySlug}/${slug}`, error);
  }
  
  // Try matching fallback articles
  const matched = fallbackArticles.find((a) => a.categorySlug === categorySlug && a.slug === slug);
  if (matched) {
    return matched;
  }

  // Cross-category search fallback if physical folder slug did not match exactly (e.g. secondary categories)
  try {
    const all = await getAllArticles();
    const found = all.find(a => a.slug === slug && (a.categorySlug === categorySlug || a.categories.includes(categorySlug)));
    if (found) return found;
    
    const anyFound = all.find(a => a.slug === slug);
    if (anyFound) return anyFound;
  } catch (err) {
    console.error("Error running fallback search in getArticleBySlug:", err);
  }
  
  return null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.featured);
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.categorySlug === categorySlug || a.categories.includes(categorySlug));
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
