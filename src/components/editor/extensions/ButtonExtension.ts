import { Node, mergeAttributes } from '@tiptap/core';

export interface ButtonOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ctaButton: {
      insertCtaButton: (attrs: { label: string; href: string; color: string }) => ReturnType;
    };
  }
}

export const ButtonExtension = Node.create<ButtonOptions>({
  name: 'ctaButton',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return { HTMLAttributes: {} };
  },

  addAttributes() {
    return {
      label: { default: 'Click Here' },
      href: { default: '#' },
      color: { default: '#111827' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ctabutton',
        getAttrs: (el) => {
          const node = el as HTMLElement;
          return {
            label: node.getAttribute('label') || 'Click Here',
            href: node.getAttribute('href') || '#',
            color: node.getAttribute('color') || '#111827',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { label, href, color } = HTMLAttributes;
    return [
      'div',
      { class: 'cta-button-wrapper', style: 'margin: 1.5rem 0;' },
      [
        'a',
        mergeAttributes({
          href,
          target: '_blank',
          rel: 'noopener noreferrer sponsored',
          style: `display:inline-block;padding:0.65rem 1.6rem;background-color:${color};color:#fff;border-radius:0.5rem;font-weight:700;font-size:0.95rem;text-decoration:none;`,
        }),
        label as string,
      ],
    ];
  },

  addCommands() {
    return {
      insertCtaButton:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },

  // Serialise back to MDX as a self-closing JSX element
  // tiptap-markdown uses renderText for block nodes; we use addStorage as workaround
  // Instead we implement a custom toMarkdown via the markdown storage
  addStorage() {
    return {};
  },
});
