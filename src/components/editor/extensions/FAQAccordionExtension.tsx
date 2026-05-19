import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';

const FAQComponent = ({ node, updateAttributes }: any) => {
  let items = node.attrs.items;
  if (typeof items === 'string') {
    try {
      const clean = items.replace(/^\{?/, '').replace(/\}?$/, '').replace(/'/g, '"');
      items = JSON.parse(clean);
    } catch(e) { items = null; }
  }
  if (!Array.isArray(items)) items = [{ question: 'What is this?', answer: 'An explanation.' }];

  const addItem = () => {
    updateAttributes({ items: [...items, { question: 'New Question', answer: 'Answer here' }] });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateAttributes({ items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    updateAttributes({ items: newItems });
  };

  return (
    <NodeViewWrapper className="my-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200" contentEditable={false}>
        <span className="font-semibold text-gray-700">FAQ Accordion</span>
        <button onClick={addItem} className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
          + Add Item
        </button>
      </div>
      <div className="space-y-4" contentEditable={false}>
        {items.map((item: any, i: number) => (
          <div key={i} className="flex flex-col gap-2 p-3 bg-white border border-gray-100 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <input 
                className="font-medium text-gray-800 w-full outline-none border-b border-transparent focus:border-gray-300 transition"
                value={item.question}
                onChange={(e) => updateItem(i, 'question', e.target.value)}
                placeholder="Question"
              />
              <button onClick={() => removeItem(i)} className="text-red-500 text-xs ml-2 hover:underline">Remove</button>
            </div>
            <textarea 
              className="text-gray-600 text-sm w-full outline-none resize-none border border-transparent focus:border-gray-200 rounded p-1 transition"
              value={item.answer}
              onChange={(e) => updateItem(i, 'answer', e.target.value)}
              placeholder="Answer"
              rows={2}
            />
          </div>
        ))}
        {items.length === 0 && <div className="text-sm text-gray-400 text-center py-4">No items added yet.</div>}
      </div>
    </NodeViewWrapper>
  );
};

export const FAQAccordionExtension = Node.create({
  name: 'faqAccordion',
  group: 'block',
  atom: true, // It's an atom, meaning it doesn't contain normal tiptap content, just attrs
  
  addAttributes() {
    return {
      items: {
        default: [{ question: 'What is this?', answer: 'An explanation.' }],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'FAQAccordion',
        getAttrs: (element: any) => {
          const itemsStr = element.getAttribute('items');
          if (itemsStr) {
            try { return { items: JSON.parse(itemsStr) }; } catch(e) { return { items: itemsStr }; }
          }
          return {};
        }
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // We want the output to be JSX: <FAQAccordion items={...} />
    // To output valid JSX string through Tiptap's HTML serializer, we can stringify the JSON
    // Note: tiptap-markdown might escape things, but we can configure it if needed.
    return ['FAQAccordion', { items: JSON.stringify(HTMLAttributes.items) }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FAQComponent);
  },
});
