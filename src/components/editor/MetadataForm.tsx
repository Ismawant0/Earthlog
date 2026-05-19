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
  'equipment',
  'chemical',
  'process',
  'instrumentation',
  'maintenance',
  'learning-path',
  'glossary'
];

export function MetadataForm({ initialData, onSave, onCancel }: MetadataFormProps) {
  const [formData, setFormData] = useState<Metadata>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || CATEGORIES[0],
    description: initialData?.description || '',
    difficulty: initialData?.difficulty || 'Beginner',
    keywords: initialData?.keywords || [],
    tags: initialData?.tags || [],
    readingTime: initialData?.readingTime || '5 min',
    featured: initialData?.featured || false,
    cover: initialData?.cover || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'keywords' | 'tags') => {
    const values = e.target.value.split(',').map(v => v.trim()).filter(v => v);
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const generateSlug = () => {
    if (!formData.title) return;
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 my-8 relative">
        <h2 className="text-2xl font-bold font-serif mb-6 text-gray-900">Article Metadata</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                placeholder="Article Title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <div className="flex gap-2">
                <input 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                  placeholder="article-slug"
                  required
                />
                <button type="button" onClick={generateSlug} className="bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 text-sm font-medium text-gray-900">Auto</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma separated)</label>
              <input 
                value={formData.keywords.join(', ')}
                onChange={(e) => handleArrayChange(e, 'keywords')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input 
                value={formData.tags.join(', ')}
                onChange={(e) => handleArrayChange(e, 'tags')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reading Time</label>
              <input 
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <input 
                name="cover"
                value={formData.cover}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Article</label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-md transition text-gray-900">Cancel</button>
          <button 
            onClick={() => {
              if (!formData.title || !formData.slug) {
                alert('Title and Slug are required.');
                return;
              }
              onSave(formData);
            }} 
            className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
          >
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
}
