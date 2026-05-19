import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';

const DiagramComponent = ({ node, updateAttributes }: any) => {
  return (
    <NodeViewWrapper className="my-6 border border-blue-200 rounded-lg p-6 bg-blue-50 flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 w-full" contentEditable={false}>
        <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-blue-900 mb-1">Interactive Diagram</h4>
          <input 
            className="w-full bg-white border border-blue-200 rounded px-2 py-1 text-sm outline-none focus:border-blue-400 transition"
            placeholder="Diagram Type (e.g., separator-tiga-fasa)"
            value={node.attrs.type}
            onChange={(e) => updateAttributes({ type: e.target.value })}
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export const InteractiveDiagramExtension = Node.create({
  name: 'interactiveDiagram',
  group: 'block',
  atom: true,
  
  addAttributes() {
    return {
      type: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'InteractiveDiagram',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['InteractiveDiagram', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DiagramComponent);
  },
});
