import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';

const TechnicalTableComponent = ({ node, updateAttributes }: any) => {
  let headers = node.attrs.headers;
  if (typeof headers === 'string') {
    try {
      const clean = headers.replace(/^\{?/, '').replace(/\}?$/, '').replace(/'/g, '"');
      headers = JSON.parse(clean);
    } catch(e) { headers = null; }
  }
  if (!Array.isArray(headers)) headers = ['Header 1', 'Header 2'];

  let data = node.attrs.data;
  if (typeof data === 'string') {
    try {
      const clean = data.replace(/^\{?/, '').replace(/\}?$/, '').replace(/'/g, '"');
      data = JSON.parse(clean);
    } catch(e) { data = null; }
  }
  if (!Array.isArray(data)) data = [['Row 1 Col 1', 'Row 1 Col 2']];

  const updateHeader = (i: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[i] = value;
    updateAttributes({ headers: newHeaders });
  };

  const updateData = (rIndex: number, cIndex: number, value: string) => {
    const newData = data.map((row: any[]) => [...row]);
    newData[rIndex][cIndex] = value;
    updateAttributes({ data: newData });
  };

  const addColumn = () => {
    updateAttributes({
      headers: [...headers, `Header ${headers.length + 1}`],
      data: data.map((row: any[]) => [...row, '']),
    });
  };

  const addRow = () => {
    updateAttributes({
      data: [...data, new Array(headers.length).fill('')],
    });
  };

  return (
    <NodeViewWrapper className="my-6 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-200" contentEditable={false}>
        <span className="font-semibold text-gray-700">Technical Table</span>
        <div className="space-x-2">
          <button onClick={addColumn} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">Add Column</button>
          <button onClick={addRow} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">Add Row</button>
        </div>
      </div>
      <div className="overflow-x-auto p-4" contentEditable={false}>
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              {headers.map((h: string, i: number) => (
                <th key={i} className="border border-gray-200 p-2 bg-gray-50">
                  <input 
                    className="w-full bg-transparent font-semibold text-center outline-none"
                    value={h}
                    onChange={(e) => updateHeader(i, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row: any[], rIndex: number) => (
              <tr key={rIndex}>
                {row.map((cell: string, cIndex: number) => (
                  <td key={cIndex} className="border border-gray-200 p-2">
                    <input 
                      className="w-full bg-transparent outline-none"
                      value={cell}
                      onChange={(e) => updateData(rIndex, cIndex, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NodeViewWrapper>
  );
};

export const TechnicalTableExtension = Node.create({
  name: 'technicalTable',
  group: 'block',
  atom: true,
  
  addAttributes() {
    return {
      headers: { default: ['Parameter', 'Description'] },
      data: { default: [['', '']] },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'TechnicalTable',
        getAttrs: (element: any) => {
          const headersStr = element.getAttribute('headers');
          const dataStr = element.getAttribute('data');
          let headers = undefined;
          let data = undefined;
          
          if (headersStr) {
            try { headers = JSON.parse(headersStr); } 
            catch(e) { headers = headersStr; } // Fallback to string
          }
          if (dataStr) {
            try { data = JSON.parse(dataStr); } 
            catch(e) { data = dataStr; }
          }
          
          return { headers, data };
        }
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'TechnicalTable', 
      { 
        headers: JSON.stringify(HTMLAttributes.headers),
        data: JSON.stringify(HTMLAttributes.data)
      }
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TechnicalTableComponent);
  },
});
