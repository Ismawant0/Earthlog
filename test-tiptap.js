const { Editor } = require('@tiptap/core');
const StarterKit = require('@tiptap/starter-kit');
const { Markdown } = require('tiptap-markdown');

const editor = new Editor({
  extensions: [StarterKit, Markdown],
  content: '<p>Initial content</p>',
});

console.log("Initial Markdown:", editor.storage.markdown.getMarkdown());

editor.commands.setContent('<p>New content replaced</p>');
console.log("After setContent:", editor.storage.markdown.getMarkdown());

editor.commands.insertContent(' Added text');
console.log("After insertContent:", editor.storage.markdown.getMarkdown());
