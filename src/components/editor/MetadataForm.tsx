import React, { useState } from 'react';

interface Metadata {
  title: string;
  slug: string;
  category: string;
  description: string;
  difficulty: string;
  keywords: string[];
  tags: string[];
  readingTime: string;
  featured: boolean;
  cover: string;
}

interface MetadataFormProps {
  initialData?: Partial<Metadata>;
  onSave: (metadata: Metadata) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  'fundamentals',
  'production-operations',
  'equipment',
  'process-systems',
  'process-chemicals',
  'instrumentation',
  'maintenance',
  'safety',
  'utility-systems',
  'troubleshooting',
  'learning-path',
  'glossary'
];

export function MetadataForm({ initialData, onSave, onCancel }: MetadataFormProps) {
  const getInitialCategories = (): string[] => {
    const raw = initialData?.category || '';
    if (Array.isArray(raw)) return raw;
    return String(raw).split(',').map(s => s.trim()).filter(Boolean);
  };

  const [formData, setFormData] = useState<Metadata>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: getInitialCategories().join(', ') || CATEGORIES[0],
    description: initialData?.description || '',
    difficulty: initialData?.difficulty || 'Beginner',
    keywords: initialData?.keywords || [],
    tags: initialData?.tags || [],
    readingTime: initialData?.readingTime || '5 min',
    featured: initialData?.featured || false,
    cover: initialData?.cover || '',
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    getInitialCategories().length > 0 ? getInitialCategories() : [CATEGORIES[0]]
  );

  const [tagInput, setTagInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryToggle = (catSlug: string) => {
    let updated: string[];
    if (selectedCategories.includes(catSlug)) {
      // Keep at least one category selected
      if (selectedCategories.length <= 1) return;
      updated = selectedCategories.filter(c => c !== catSlug);
    } else {
      updated = [...selectedCategories, catSlug];
    }
    setSelectedCategories(updated);
    setFormData(prev => ({ ...prev, category: updated.join(', ') }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const values = rawValue.split(';').map(v => v.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, keywords: values }));
  };

  const applyTag = () => {
    if (!tagInput.trim()) return;
    const newTags = tagInput
      .split(/[;,]/)
      .map(t => t.trim())
      .filter(t => t && !formData.tags.includes(t));
      
    if (newTags.length > 0) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, ...newTags] }));
    }
    setTagInput('');
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const generateSlug = () => {
    if (!formData.title) return;
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const getTagColorClass = (tag: string) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
      'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',
      'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
      'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto select-none">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 my-8 relative border border-gray-150 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-5 text-gray-950 pb-3 border-b border-gray-100 flex items-center gap-2">
          <span>📝</span> Edit Article Metadata
        </h2>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Title *</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-medium transition shadow-sm"
                placeholder="Article Title"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Slug *</label>
              <div className="flex gap-2">
                <input 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-medium transition shadow-sm"
                  placeholder="article-slug"
                  required
                />
                <button 
                  type="button" 
                  onClick={generateSlug} 
                  className="bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-lg hover:bg-gray-100 text-xs font-bold text-gray-800 transition cursor-pointer"
                >
                  Auto
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Categories * (Select one or more)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-50/50 border border-gray-200 rounded-xl p-3">
              {CATEGORIES.map(c => {
                const isSelected = selectedCategories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCategoryToggle(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition select-none text-left cursor-pointer ${
                      isSelected
                        ? 'bg-black border-black text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-0 shrink-0 pointer-events-none hidden"
                    />
                    <span className="capitalize">{c.replace(/-/g, ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-medium transition shadow-sm"
              rows={3}
              placeholder="Provide a short technical summary..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-semibold transition shadow-sm"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Reading Time</label>
              <input 
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-medium transition shadow-sm"
                placeholder="E.g., 5 min or 8 Menit"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Keywords (Semicolon separated for flexibility)</label>
            <input 
              value={formData.keywords.join('; ')}
              onChange={handleKeywordsChange}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-medium transition shadow-sm"
              placeholder="E.g., Pump Basic; Pump Fundamental; Centrifugal Pump"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">Separate multiple keywords with a semicolon (;) to allow multi-word expressions.</span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Tags (Comma or Semicolon separated, click Apply)</label>
            <div className="flex gap-2 mb-2">
              <input 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-medium transition shadow-sm"
                placeholder="Type tag (e.g. Pump, Separator)..."
              />
              <button
                type="button"
                onClick={applyTag}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer shadow-sm shrink-0"
              >
                Apply Tag
              </button>
            </div>
            
            {/* Tag Badges Container */}
            <div className="flex flex-wrap gap-1.5 p-3 bg-gray-50/50 border border-gray-200 border-dashed rounded-xl min-h-[46px] items-center">
              {formData.tags.length === 0 ? (
                <span className="text-xs text-gray-400 italic">No tags applied yet. Use input above.</span>
              ) : (
                formData.tags.map(tag => (
                  <span 
                    key={tag}
                    className={`inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm select-none animate-in fade-in duration-100 ${getTagColorClass(tag)}`}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full w-4 h-4 inline-flex items-center justify-center font-bold text-xs transition cursor-pointer"
                      title="Remove tag"
                    >
                      &times;
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Cover Image URL</label>
            <input 
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none text-gray-900 bg-white text-sm font-medium transition shadow-sm"
              placeholder="E.g., https://images.unsplash.com/photo-..."
            />
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <input 
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-0 shrink-0 cursor-pointer"
            />
            <label htmlFor="featured" className="text-xs font-bold uppercase tracking-wider text-gray-700 cursor-pointer select-none">Featured Article</label>
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-2.5 pt-4 border-t border-gray-100">
          <button 
            type="button"
            onClick={onCancel} 
            className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => {
              if (!formData.title || !formData.slug) {
                alert('Title and Slug are required.');
                return;
              }
              onSave(formData);
            }} 
            className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-900 transition cursor-pointer shadow"
          >
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
}
