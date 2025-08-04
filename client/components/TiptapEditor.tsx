'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;
  return (
    <div className="border border-gray-300 rounded-t-lg p-2 flex space-x-2 bg-gray-100">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>Bold</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
    </div>
  );
};
export default function TiptapEditor({ content, onChange }: { content: string; onChange: (richText: string) => void; }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: { attributes: { class: 'prose max-w-none p-4 border-b border-x border-gray-300 rounded-b-lg min-h-[400px] bg-white focus:outline-none' } },
    onUpdate({ editor }) { onChange(editor.getHTML()); },
  });
  return <div><Toolbar editor={editor} /><EditorContent editor={editor} /></div>;
}