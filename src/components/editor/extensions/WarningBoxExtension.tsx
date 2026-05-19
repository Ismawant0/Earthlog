import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';

const WarningBoxComponent = ({ node, updateAttributes }: any) => {
  return (
    <NodeViewWrapper className={`my-4 p-4 border-l-4 rounded-r-md ${node.attrs.type === 'warning' ? 'bg-yellow-50 border-yellow-500' : node.attrs.type === 'error' ? 'bg-red-50 border-red-500' : node.attrs.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-500'}`}>
      <div className="flex items-center justify-between mb-2" contentEditable={false}>
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">{node.attrs.type} BOX</span>
        <select 
          className="text-xs border border-gray-200 rounded px-1 py-0.5 bg-white cursor-pointer"
          value={node.attrs.type} 
          onChange={(e) => updateAttributes({ type: e.target.value })}
        >
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="important">Important</option>
        </select>
      </div>
      <NodeViewContent className="text-gray-800" />
    </NodeViewWrapper>
  );
};

export const WarningBoxExtension = Node.create({
  name: 'warningBox',
  group: 'block',
  content: 'inline*',
  
  addAttributes() {
    return {
      type: {
        default: 'warning',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'WarningBox',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['WarningBox', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(WarningBoxComponent);
  },
});
