import React, { useRef } from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Underline, Strikethrough, Code, 
  Heading1, Heading2, Heading3, List, ListOrdered, 
  CheckSquare, Quote, Minus, Table as TableIcon, 
  Link as LinkIcon, Image as ImageIcon, AlertCircle, 
  HelpCircle, Database, BarChart
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
  onUploadImage?: (file: File) => Promise<void>;
}

const ToolbarButton = ({ 
  onClick, isActive = false, disabled = false, children, title 
}: { 
  onClick: () => void, isActive?: boolean, disabled?: boolean, children: React.ReactNode, title: string 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-md transition ${
        isActive 
          ? 'bg-gray-200 text-gray-900' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export function Toolbar({ editor, onUploadImage }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      onUploadImage(file);
    }
    e.target.value = ''; // Reset
  };

  return (
    <div className="
      flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-white sticky top-0 z-10 w-full rounded-t-xl
      xl:fixed xl:right-6 xl:top-24 xl:z-40 xl:w-14 xl:flex-col xl:items-center xl:p-3 xl:border xl:border-gray-200 xl:shadow-xl xl:rounded-2xl xl:max-h-[75vh] xl:overflow-y-auto xl:bg-white xl:rounded-t-2xl xl:gap-3 xl:border-b-0
    ">
      {/* Hidden file input for uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/gif" 
        className="hidden" 
      />

      <div className="flex xl:flex-col items-center gap-1 pr-2 xl:pr-0 xl:pb-2 border-r xl:border-r-0 xl:border-b border-gray-200 xl:w-full">
        <ToolbarButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
          <Heading3 size={18} />
        </ToolbarButton>
        <ToolbarButton title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive('paragraph')}>
          <span className="font-serif font-bold px-1 text-[15px]">P</span>
        </ToolbarButton>
      </div>

      <div className="flex xl:flex-col items-center gap-1 px-2 xl:px-0 xl:py-2 border-r xl:border-r-0 xl:border-b border-gray-200 xl:w-full">
        <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
          <Underline size={18} />
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
          <Strikethrough size={18} />
        </ToolbarButton>
        <ToolbarButton title="Inline Code" onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')}>
          <Code size={18} />
        </ToolbarButton>
      </div>

      <div className="flex xl:flex-col items-center gap-1 px-2 xl:px-0 xl:py-2 border-r xl:border-r-0 xl:border-b border-gray-200 xl:w-full">
        <ToolbarButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton title="Task List" onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')}>
          <CheckSquare size={18} />
        </ToolbarButton>
        <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
          <Quote size={18} />
        </ToolbarButton>
        <ToolbarButton title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={18} />
        </ToolbarButton>
      </div>

      <div className="flex xl:flex-col items-center gap-1 px-2 xl:px-0 xl:py-2 border-r xl:border-r-0 xl:border-b border-gray-200 xl:w-full">
        <ToolbarButton title="Insert Link" onClick={addLink} isActive={editor.isActive('link')}>
          <LinkIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Insert Image from Local" onClick={handleImageClick}>
          <ImageIcon size={18} />
        </ToolbarButton>
        <ToolbarButton title="Insert Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon size={18} />
        </ToolbarButton>
      </div>

      {editor.isActive('table') && (
        <div className="flex xl:flex-col items-center gap-1 px-2 xl:px-0 xl:py-2 border-r xl:border-r-0 xl:border-b border-gray-200 xl:w-full bg-amber-50/50 xl:rounded-lg">
          <ToolbarButton title="Add Column Before" onClick={() => editor.chain().focus().addColumnBefore().run()}>
            <span className="text-[9px] font-bold text-gray-700">+C L</span>
          </ToolbarButton>
          <ToolbarButton title="Add Column After" onClick={() => editor.chain().focus().addColumnAfter().run()}>
            <span className="text-[9px] font-bold text-gray-700">+C R</span>
          </ToolbarButton>
          <ToolbarButton title="Delete Column" onClick={() => editor.chain().focus().deleteColumn().run()}>
            <span className="text-[9px] font-bold text-red-600">-C</span>
          </ToolbarButton>
          <ToolbarButton title="Add Row Before" onClick={() => editor.chain().focus().addRowBefore().run()}>
            <span className="text-[9px] font-bold text-gray-700">+R U</span>
          </ToolbarButton>
          <ToolbarButton title="Add Row After" onClick={() => editor.chain().focus().addRowAfter().run()}>
            <span className="text-[9px] font-bold text-gray-700">+R D</span>
          </ToolbarButton>
          <ToolbarButton title="Delete Row" onClick={() => editor.chain().focus().deleteRow().run()}>
            <span className="text-[9px] font-bold text-red-600">-R</span>
          </ToolbarButton>
          <ToolbarButton title="Delete Table" onClick={() => editor.chain().focus().deleteTable().run()}>
            <span className="text-[9px] font-bold text-red-600">DEL</span>
          </ToolbarButton>
        </div>
      )}

      <div className="flex xl:flex-col items-center gap-1 px-2 xl:px-0 xl:pt-2 xl:w-full">
        <ToolbarButton title="Warning Box" onClick={() => editor.chain().focus().insertContent('<WarningBox type="warning">Important warning here</WarningBox>').run()}>
          <AlertCircle size={18} />
        </ToolbarButton>
        <ToolbarButton title="FAQ Accordion" onClick={() => editor.chain().focus().insertContent('<FAQAccordion items="[]"></FAQAccordion>').run()}>
          <HelpCircle size={18} />
        </ToolbarButton>
        <ToolbarButton title="Technical Table" onClick={() => editor.chain().focus().insertContent('<TechnicalTable headers="[]" data="[]"></TechnicalTable>').run()}>
          <Database size={18} />
        </ToolbarButton>
        <ToolbarButton title="Interactive Diagram" onClick={() => editor.chain().focus().insertContent('<InteractiveDiagram type=""></InteractiveDiagram>').run()}>
          <BarChart size={18} />
        </ToolbarButton>
        
        {/* Dropdown for Interactive Block */}
        <div className="relative" title="Insert Interactive Block">
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                editor.chain().focus().insertContent(`<InteractiveBlock type="${val}"></InteractiveBlock>`).run();
                e.target.value = '';
              }
            }}
            className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none cursor-pointer border border-transparent appearance-none w-[30px] h-[30px] flex items-center justify-center"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg>")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '16px 16px',
            }}
            value=""
          >
            <option value="" disabled></option>
            <option value="steam-trap">Steam Trap</option>
            <option value="flare-system">Flare System</option>
            <option value="h2s-detector">H2S Detector</option>
            <option value="boiler-chemistry">Boiler Chemistry</option>
            <option value="pump-curve">Pump Curve</option>
            <option value="pid-interactive">PID Interactive</option>
            <option value="quiz-block">Quiz Block</option>
          </select>
        </div>
      </div>
    </div>
  );
}
