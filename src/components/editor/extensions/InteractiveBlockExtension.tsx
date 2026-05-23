import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';

const BlockComponent = ({ node, updateAttributes }: any) => {
  const allowedTypes = [
    { value: 'steam-trap', label: 'Steam Trap Simulator' },
    { value: 'flare-system', label: 'Flare System Combustion' },
    { value: 'h2s-detector', label: 'H2S Gas Transmitter' },
    { value: 'boiler-chemistry', label: 'Boiler Feedwater Chemistry' },
    { value: 'pump-curve', label: 'Centrifugal Pump Performance Curve' },
    { value: 'pid-interactive', label: 'PID Tuning Simulator' },
    { value: 'quiz-block', label: 'Interactive Quiz Block' }
  ];

  return (
    <NodeViewWrapper className="my-6 border border-purple-200 rounded-lg p-5 bg-purple-50 flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 w-full" contentEditable={false}>
        <div className="bg-purple-100 text-purple-700 p-3 rounded-full shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-purple-900 text-sm mb-1">Interactive Block</h4>
          <select 
            className="w-full bg-white border border-purple-200 rounded px-2.5 py-1.5 text-xs outline-none focus:border-purple-400 font-semibold text-purple-950 transition cursor-pointer"
            value={node.attrs.type}
            onChange={(e) => updateAttributes({ type: e.target.value })}
          >
            <option value="" disabled>Choose Interactive Simulation Block...</option>
            {allowedTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export const InteractiveBlockExtension = Node.create({
  name: 'interactiveBlock',
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
        tag: 'interactiveblock',
        getAttrs: (element: any) => {
          return {
            type: element.getAttribute('type') || '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['interactiveblock', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlockComponent);
  },
});
