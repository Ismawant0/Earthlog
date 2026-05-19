import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Underline from '@tiptap/extension-underline';
// @ts-ignore
import { Markdown } from 'tiptap-markdown';
import Placeholder from '@tiptap/extension-placeholder';

import { Toolbar } from './Toolbar';
import { MetadataForm } from './MetadataForm';

// Custom Extensions
import { WarningBoxExtension } from './extensions/WarningBoxExtension';
import { FAQAccordionExtension } from './extensions/FAQAccordionExtension';
import { TechnicalTableExtension } from './extensions/TechnicalTableExtension';
import { InteractiveDiagramExtension } from './extensions/InteractiveDiagramExtension';

interface EditorComponentProps {
  initialContent?: string;
  initialMetadata?: any;
  onSave: (mdxContent: string, metadata: any) => Promise<void>;
  onCancel?: () => void;
}

const robustParseJSON = (str: string) => {
  let current = str;
  // Unescape HTML entities
  current = current
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
    
  // Unescape backslashes if double escaped
  for (let i = 0; i < 5; i++) {
    try {
      const parsed = JSON.parse(current);
      if (Array.isArray(parsed) || (parsed && typeof parsed === 'object')) {
        return parsed;
      }
      if (typeof parsed === 'string') {
        current = parsed;
      } else {
        break;
      }
    } catch {
      try {
        const unescaped = current.replace(/\\"/g, '"');
        const parsed = JSON.parse(unescaped);
        if (Array.isArray(parsed) || (parsed && typeof parsed === 'object')) {
          return parsed;
        }
      } catch {}
      break;
    }
  }
  return null;
};

const cleanMdx = (rawMdx: string) => {
  let cleaned = rawMdx;
  
  // Clean FAQAccordion
  cleaned = cleaned.replace(/<faqaccordion\s+items="([\s\S]*?)">\s*<\/faqaccordion>/gi, (match: string, items: string) => {
    const parsed = robustParseJSON(items);
    if (parsed) {
      return `<FAQAccordion items={${JSON.stringify(parsed, null, 2)}} />`;
    }
    return `<FAQAccordion items="${items}" />`;
  });

  // Clean TechnicalTable
  cleaned = cleaned.replace(/<technicaltable\s+headers="([\s\S]*?)"\s+data="([\s\S]*?)">\s*<\/technicaltable>/gi, (match: string, headers: string, data: string) => {
    const pHeaders = robustParseJSON(headers);
    const pData = robustParseJSON(data);
    if (pHeaders && pData) {
      return `<TechnicalTable headers={${JSON.stringify(pHeaders)}} data={${JSON.stringify(pData)}} />`;
    }
    return `<TechnicalTable headers="${headers}" data="${data}" />`;
  });

  // Clean InteractiveDiagram
  cleaned = cleaned.replace(/<interactivediagram\s+type="([^"]+)">\s*<\/interactivediagram>/gi, '<InteractiveDiagram type="$1" />');

  // Clean WarningBox
  cleaned = cleaned.replace(/<warningbox\s+type="([^"]+)">/gi, '<WarningBox type="$1">');
  cleaned = cleaned.replace(/<\/warningbox>/gi, '</WarningBox>');

  return cleaned;
};

const prepareMdxForEditor = (rawMdx?: string) => {
  if (!rawMdx) return '';
  let prepared = rawMdx;

  // 1. Repair escaped characters in raw MDX (brackets and braces) from previously corrupted saves
  prepared = prepared.replace(/\\\[/g, '[').replace(/\\\]/g, ']');
  prepared = prepared.replace(/\\\{/g, '{').replace(/\\\}/g, '}');

  // 2. Proactively convert &lt; and &gt; back to tag brackets < and >
  prepared = prepared.replace(/&lt;TechnicalTable/gi, '<TechnicalTable');
  prepared = prepared.replace(/&lt;FAQAccordion/gi, '<FAQAccordion');
  prepared = prepared.replace(/\/&gt;/g, '/>');

  // 3. Convert JSX FAQAccordion to HTML FAQAccordion with HTML entities
  prepared = prepared.replace(/<FAQAccordion\s+items={([\s\S]*?)}\s*\/>/gi, (match, itemsStr) => {
    try {
      const evalItems = new Function(`return ${itemsStr}`)();
      const safeItems = JSON.stringify(evalItems).replace(/"/g, '&quot;');
      return `<FAQAccordion items="${safeItems}"></FAQAccordion>`;
    } catch (e) {
      console.error("Error parsing FAQAccordion for editor:", e);
      return match;
    }
  });

  // 4. Convert JSX TechnicalTable to HTML TechnicalTable with HTML entities
  prepared = prepared.replace(/<TechnicalTable\s+headers={([\s\S]*?)}\s+data={([\s\S]*?)}\s*\/>/gi, (match, headersStr, dataStr) => {
    try {
      const evalHeaders = new Function(`return ${headersStr}`)();
      const evalData = new Function(`return ${dataStr}`)();
      const safeHeaders = JSON.stringify(evalHeaders).replace(/"/g, '&quot;');
      const safeData = JSON.stringify(evalData).replace(/"/g, '&quot;');
      return `<TechnicalTable headers="${safeHeaders}" data="${safeData}"></TechnicalTable>`;
    } catch (e) {
      console.error("Error parsing TechnicalTable for editor:", e);
      return match;
    }
  });

  return prepared;
};

export function EditorComponent({ initialContent, initialMetadata, onSave, onCancel }: EditorComponentProps) {
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [mdxPreview, setMdxPreview] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto mx-auto my-4',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'w-full border-collapse border border-gray-300 my-4',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 bg-gray-100 p-2 text-left font-bold',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'list-none pl-0 my-4',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex items-start gap-2 mb-1',
        },
      }),
      Underline,
      Markdown.configure({
        html: true,
        transformPastedText: true,
      }),
      WarningBoxExtension,
      FAQAccordionExtension,
      TechnicalTableExtension,
      InteractiveDiagramExtension,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading' && node.attrs.level === 1) {
            return 'New Article Title...';
          }
          return 'Start writing here...';
        },
      }),
    ],
    content: prepareMdxForEditor(initialContent) || '<h1></h1><p></p>',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-8 py-6',
      },
    },
    onUpdate: ({ editor }) => {
      // @ts-ignore
      const rawMdx = editor.storage.markdown.getMarkdown();
      setMdxPreview(cleanMdx(rawMdx));
    },
  });

  useEffect(() => {
    if (editor && initialContent !== undefined) {
      editor.commands.setContent(prepareMdxForEditor(initialContent) || '<h1></h1><p></p>');
    }
  }, [editor, initialContent]);

  const handleSaveClick = () => {
    if (editor) {
      // The markdown output including custom HTML nodes
      // @ts-ignore
      let rawMdx = editor.storage.markdown.getMarkdown();
      setMdxPreview(cleanMdx(rawMdx));
      setShowMetadataForm(true);
    }
  };

  const submitSave = async (metadata: any) => {
    setShowMetadataForm(false);
    
    // Ensure we get the absolute latest content directly from the editor
    let finalMdx = mdxPreview;
    if (editor) {
      // @ts-ignore
      let rawMdx = editor.storage.markdown.getMarkdown();
      finalMdx = cleanMdx(rawMdx);
    }
    
    await onSave(finalMdx, metadata);
  };

  // Update preview automatically if tab is switched
  useEffect(() => {
    if (activeTab === 'preview' && editor) {
      // @ts-ignore
      let rawMdx = editor.storage.markdown.getMarkdown();
      setMdxPreview(cleanMdx(rawMdx));
    }
  }, [activeTab, editor]);

  return (
    <div className="max-w-[1000px] mx-auto pt-8 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button 
            className={`pb-2 px-2 text-sm font-medium transition ${activeTab === 'editor' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`pb-2 px-2 text-sm font-medium transition ${activeTab === 'preview' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
            onClick={() => setActiveTab('preview')}
          >
            Generated MDX
          </button>
        </div>
        <div className="flex items-center gap-3">
          {onCancel && (
            <button 
              onClick={onCancel}
              className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-50 transition shadow-sm bg-white"
            >
              Back to Dashboard
            </button>
          )}
          <button 
            onClick={handleSaveClick}
            className="bg-black text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition shadow-sm"
          >
            Save Article
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] overflow-hidden">
        {activeTab === 'editor' ? (
          <>
            <Toolbar editor={editor} />
            <div className="editor-content-wrapper font-inter text-[18px] leading-[1.9] max-w-[760px] mx-auto">
              <style dangerouslySetInnerHTML={{__html: `
                .ProseMirror h1 { font-family: 'Source Serif 4', serif; font-size: 2.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; color: #111827; }
                .ProseMirror h2 { font-family: 'Source Serif 4', serif; font-size: 2rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.3; color: #111827; }
                .ProseMirror h3 { font-family: 'Source Serif 4', serif; font-size: 1.5rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4; color: #111827; }
                .ProseMirror p { margin-bottom: 1.5rem; color: #374151; }
                .ProseMirror a { color: #2563eb; text-decoration: underline; }
                .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                .ProseMirror ul li::marker, .ProseMirror ol li::marker { color: #374151; font-weight: bold; opacity: 1; }
                .ProseMirror blockquote { border-left: 4px solid #e5e7eb; padding-left: 1rem; color: #6b7280; font-style: italic; margin-bottom: 1.5rem; }
                .ProseMirror code { background-color: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875em; color: #ef4444; }
                .ProseMirror pre { background-color: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1.5rem; }
                .ProseMirror pre code { background-color: transparent; color: inherit; padding: 0; }
                .ProseMirror p.is-editor-empty:first-child::before,
                .ProseMirror h1.is-empty::before,
                .ProseMirror h2.is-empty::before,
                .ProseMirror h3.is-empty::before,
                .ProseMirror p.is-empty::before {
                  color: #adb5bd;
                  content: attr(data-placeholder);
                  float: left;
                  height: 0;
                  pointer-events: none;
                }
              `}} />
              <EditorContent editor={editor} />
            </div>
          </>
        ) : (
          <div className="p-8">
            <pre className="bg-gray-50 p-6 rounded-lg overflow-x-auto text-sm text-gray-800 whitespace-pre-wrap border border-gray-200">
              {mdxPreview || 'No content yet.'}
            </pre>
          </div>
        )}
      </div>

      {showMetadataForm && (
        <MetadataForm 
          initialData={initialMetadata}
          onSave={submitSave}
          onCancel={() => setShowMetadataForm(false)}
        />
      )}
    </div>
  );
}
