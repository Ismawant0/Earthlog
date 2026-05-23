import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';

const FigureComponent = ({ node, updateAttributes }: any) => {
  return (
    <NodeViewWrapper className="my-6 border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center gap-3" contentEditable={false}>
        <div className="flex items-center justify-between w-full border-b border-gray-200 pb-2">
          <span className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Figure Block</span>
          <span className="text-[10px] text-gray-400 font-mono truncate max-w-[250px]">
            {node.attrs.src.split('/').pop() || 'No Image'}
          </span>
        </div>
        
        {node.attrs.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={node.attrs.src} 
            alt={node.attrs.alt} 
            className="max-h-[220px] object-contain rounded border border-gray-250 bg-white" 
          />
        ) : (
          <div className="w-full h-[120px] bg-gray-200 flex items-center justify-center text-gray-400 rounded border border-dashed border-gray-300">
            No Image Selected
          </div>
        )}

        <div className="w-full space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Alt Text</label>
              <input 
                className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs text-gray-900 outline-none focus:border-gray-400 transition"
                placeholder="Alternative Text"
                value={node.attrs.alt}
                onChange={(e) => updateAttributes({ alt: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Caption</label>
              <input 
                className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs text-gray-900 outline-none focus:border-gray-400 transition"
                placeholder="Figure Caption (optional)"
                value={node.attrs.caption}
                onChange={(e) => updateAttributes({ caption: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export const FigureExtension = Node.create({
  name: 'figure',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: '' },
      caption: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
        getAttrs: (element: any) => {
          return {
            src: element.getAttribute('src') || '',
            alt: element.getAttribute('alt') || '',
            caption: element.getAttribute('caption') || '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FigureComponent);
  },
});
