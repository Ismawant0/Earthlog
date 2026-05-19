'use client';

import React, { useState, useEffect } from 'react';
import { EditorComponent } from '@/components/editor/EditorComponent';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  BookOpen, 
  Settings, 
  Layers, 
  TrendingUp, 
  ChevronRight,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface Article {
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
  content: string;
  htmlContent?: string;
}

export default function EditorDashboard() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Article | null>(null);

  // Load articles on mount
  useEffect(() => {
    if (view === 'dashboard') {
      fetchArticles();
    }
  }, [view]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?t=${Date.now()}`, { cache: 'no-store' });
      let serverArticles: Article[] = [];
      if (res.ok) {
        serverArticles = await res.json();
      } else {
        console.warn('Gagal memuat daftar artikel dari server, menggunakan local fallback.');
      }
      
      // Load local articles from localStorage
      let localArticles: Article[] = [];
      try {
        const localArticlesStr = localStorage.getItem('garudaloka_local_articles') || '[]';
        localArticles = JSON.parse(localArticlesStr);
      } catch (e) {
        console.error('Error parsing local articles:', e);
      }
      
      // Merge: local articles override server articles if slug and categorySlug match
      const mergedArticles = [...serverArticles];
      localArticles.forEach(local => {
        const idx = mergedArticles.findIndex(a => a.slug === local.slug && a.categorySlug === local.categorySlug);
        if (idx > -1) {
          mergedArticles[idx] = local;
        } else {
          mergedArticles.unshift(local);
        }
      });
      
      setArticles(mergedArticles);
    } catch (error) {
      console.error('Fetch articles error:', error);
      showToast('Terjadi kesalahan jaringan saat memuat artikel.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (mdxContent: string, metadata: any, htmlContent: string) => {
    try {
      const res = await fetch('/api/save-mdx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mdxContent, metadata }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // If it successfully wrote to server disk, check if it was previously in local storage and delete it
        try {
          const localArticlesStr = localStorage.getItem('garudaloka_local_articles') || '[]';
          const localArticles: Article[] = JSON.parse(localArticlesStr);
          const filtered = localArticles.filter(a => !(a.slug === metadata.slug && a.categorySlug === metadata.category));
          localStorage.setItem('garudaloka_local_articles', JSON.stringify(filtered));
        } catch (e) {}

        showToast(
          editorMode === 'edit' 
            ? 'Artikel berhasil diperbarui di disk server.' 
            : 'Artikel baru berhasil disimpan di disk server.', 
          'success'
        );
        setView('dashboard');
        setCurrentArticle(null);
      } else if (data.code === 'READ_ONLY_FILESYSTEM') {
        // Read-only fallback! Save to localStorage
        const localArticlesStr = localStorage.getItem('garudaloka_local_articles') || '[]';
        const localArticles: Article[] = JSON.parse(localArticlesStr);
        
        const newArticle: Article = {
          slug: metadata.slug,
          title: metadata.title || metadata.slug,
          description: metadata.description || '',
          category: metadata.category,
          categorySlug: metadata.category, // e.g. equipment
          date: metadata.date || new Date().toISOString().split('T')[0],
          author: metadata.author || 'Editor Garudaloka',
          difficulty: metadata.difficulty || 'Beginner',
          readTime: metadata.readingTime || '5 min',
          featured: !!metadata.featured,
          tags: metadata.tags || [],
          content: mdxContent,
          htmlContent: htmlContent // Save the rendered HTML as local fallback!
        };

        // If editing, replace. Otherwise add.
        const existingIdx = localArticles.findIndex(a => a.slug === newArticle.slug && a.categorySlug === newArticle.categorySlug);
        if (existingIdx > -1) {
          localArticles[existingIdx] = newArticle;
        } else {
          localArticles.push(newArticle);
        }

        localStorage.setItem('garudaloka_local_articles', JSON.stringify(localArticles));
        
        showToast('Tersimpan secara lokal di browser Anda (Serverless Read-Only).', 'success');
        setView('dashboard');
        setCurrentArticle(null);
      } else {
        showToast(data.error || data.message || 'Gagal menyimpan artikel.', 'error');
      }
    } catch (error) {
      console.error('Save error:', error);
      showToast('Terjadi kesalahan yang tidak terduga saat menyimpan.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    
    try {
      const res = await fetch(`/api/articles?categorySlug=${deleteConfirm.categorySlug}&slug=${deleteConfirm.slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('Artikel berhasil dihapus.', 'success');
        setArticles(prev => prev.filter(a => !(a.slug === deleteConfirm.slug && a.categorySlug === deleteConfirm.categorySlug)));
      } else {
        const data = await res.json();
        showToast(data.error || 'Gagal menghapus artikel.', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showToast('Terjadi kesalahan saat menghapus artikel.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleEditClick = (article: Article) => {
    setEditorMode('edit');
    setCurrentArticle(article);
    setView('editor');
  };

  const handleCreateClick = () => {
    setEditorMode('create');
    setCurrentArticle(null);
    setView('editor');
  };

  // Filtered articles
  const filteredArticles = articles.filter(article => {
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query)) ||
      article.slug.toLowerCase().includes(query)
    );
  });

  const getCategoryColor = (categorySlug: string) => {
    switch (categorySlug) {
      case 'equipment':
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/50 dark:text-slate-300 dark:border-slate-800';
      case 'chemical':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800';
      case 'process':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-800';
      case 'instrumentation':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800';
      case 'maintenance':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800';
      case 'learning-path':
        return 'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:border-violet-800';
      case 'glossary':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  // Convert Article metadata to form-friendly Partial Metadata block
  const getInitialMetadata = () => {
    if (!currentArticle) return undefined;
    return {
      title: currentArticle.title,
      slug: currentArticle.slug,
      category: currentArticle.categorySlug,
      description: currentArticle.description,
      difficulty: currentArticle.difficulty,
      keywords: currentArticle.tags, // maps tags to keywords in MetadataForm
      tags: currentArticle.tags,
      readingTime: currentArticle.readTime,
      featured: currentArticle.featured,
      cover: '', // default
    };
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Dynamic Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-serif font-bold italic">G</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight">
              {view === 'dashboard' ? 'Garudaloka Editor Dashboard' : `${editorMode === 'edit' ? 'Edit' : 'Tulis'} Artikel`}
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">DEVELOPER MODE</p>
          </div>
        </div>

        {view === 'dashboard' && (
          <button 
            onClick={handleCreateClick}
            className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="h-4 w-4" /> Artikel Baru
          </button>
        )}
      </header>

      {/* Main Content Area */}
      {view === 'dashboard' ? (
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-200">
          
          {/* STATS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400">Total Artikel</p>
                <h3 className="text-2xl font-bold text-gray-950">{articles.length}</h3>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400">Kategori Aktif</p>
                <h3 className="text-2xl font-bold text-gray-950">
                  {new Set(articles.map(a => a.categorySlug)).size}
                </h3>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400">Featured Articles</p>
                <h3 className="text-2xl font-bold text-gray-950">
                  {articles.filter(a => a.featured).length}
                </h3>
              </div>
            </div>
          </div>

          {/* SEARCH & CONTROLS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Cari artikel berdasarkan judul, kategori, atau tag..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition text-gray-900 placeholder:text-gray-400 text-sm shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg self-start">
              Menampilkan {filteredArticles.length} dari {articles.length} Artikel
            </div>
          </div>

          {/* ARTICLES TABLE LIST */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-500">Memuat artikel dari content directory...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 shadow-inner">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">Tidak ada artikel ditemukan</h3>
                  <p className="text-sm text-gray-500 max-w-sm mt-1">Coba sesuaikan kata kunci pencarian Anda atau buat artikel baru sekarang.</p>
                </div>
                <button 
                  onClick={handleCreateClick}
                  className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full font-medium text-sm transition shadow-sm mt-2"
                >
                  Buat Artikel Pertama
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider select-none">
                      <th className="px-6 py-4">Judul & Ringkasan</th>
                      <th className="px-6 py-4">Kategori</th>
                      <th className="px-6 py-4">Tanggal</th>
                      <th className="px-6 py-4">Tingkat</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredArticles.map((article) => (
                      <tr 
                        key={`${article.categorySlug}/${article.slug}`} 
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        {/* Title & Description */}
                        <td className="px-6 py-5 max-w-md">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900 group-hover:text-black leading-tight text-[15px]">
                                {article.title}
                              </span>
                              {article.featured && (
                                <span className="bg-amber-100 border border-amber-200 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                              {article.description || 'Tidak ada deskripsi singkat.'}
                            </p>
                            <span className="text-[11px] text-gray-400 font-mono">
                              /{article.categorySlug}/{article.slug}.mdx
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-bold capitalize select-none ${getCategoryColor(article.categorySlug)}`}>
                            {article.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5 whitespace-nowrap text-gray-500 font-medium">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {article.date}
                          </div>
                        </td>

                        {/* Difficulty */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center text-xs font-semibold ${
                            article.difficulty === 'Beginner' || article.difficulty === 'Pengantar'
                              ? 'text-emerald-700 dark:text-emerald-500'
                              : article.difficulty === 'Intermediate' || article.difficulty === 'Menengah'
                              ? 'text-amber-700 dark:text-amber-500'
                              : 'text-rose-700 dark:text-rose-500'
                          }`}>
                            {article.difficulty}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a 
                              href={`/${article.categorySlug}/${article.slug}`}
                              target="_blank" 
                              rel="noreferrer"
                              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                              title="Lihat Artikel"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <button 
                              onClick={() => handleEditClick(article)}
                              className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                              title="Edit Artikel"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteConfirm(article)}
                              className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition cursor-pointer"
                              title="Hapus Artikel"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="px-4">
          <EditorComponent 
            initialContent={currentArticle?.content}
            initialMetadata={getInitialMetadata()}
            onSave={handleSave} 
            onCancel={() => {
              setView('dashboard');
              setCurrentArticle(null);
            }}
          />
        </main>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 max-w-md w-full space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-lg">Hapus Artikel?</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Apakah Anda yakin ingin menghapus artikel <strong className="text-gray-800">"{deleteConfirm.title}"</strong> secara permanen? File <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-red-600">/{deleteConfirm.categorySlug}/{deleteConfirm.slug}.mdx</code> akan dihapus selamanya dari disk.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button 
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
              >
                Ya, Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className={`px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 ${
            toast.type === 'success' ? 'bg-gray-900 text-white' : 'bg-red-500 text-white'
          }`}>
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
