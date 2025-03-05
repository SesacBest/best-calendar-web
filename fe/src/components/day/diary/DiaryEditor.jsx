import React from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

import PropTypes from "prop-types";

import EditorToolbar from "./EditorToolbar";
import "./styles/DiaryEditor.css"
import { editorStyles } from "./styles/editorStyles";

const EDITOR_EXTENSIONS = [
  StarterKit,
  Markdown,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    defaultAlignment: "left",
  }),
  Highlight,
];

function DiaryEditor ({ content = "", onUpdate }) {
  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    content,
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  if (!editor) return null;

  const handleButtonClick = (e, callback) => {
    e.preventDefault();
    callback();
  };

  return (
    <div className={editorStyles.editorDiv}>
      <EditorToolbar 
        editor={editor}
        onButtonClick={handleButtonClick}
      />
      <EditorContent editor={editor} />
    </div>
  );
}

DiaryEditor.propTypes = {
  content: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

export default DiaryEditor;