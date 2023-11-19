"use client";

import { Input } from "@nextui-org/input";
import "./style.css";
import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@nextui-org/react";
import { Bold, Italic, Strikethrough } from "lucide-react";
import Mention from "@tiptap/extension-mention";

import suggestion from "./suggestion.ts";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div>
      <Input label="Subject" size="sm" className="mb-4"></Input>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex gap-1 bg-background rounded-medium p-1 shadow">
            <Button
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              isIconOnly
              variant={editor.isActive("bold") ? "solid" : "light"}
            >
              <Bold size={16} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              variant={editor.isActive("italic") ? "solid" : "light"}
            >
              <Italic size={16} />
            </Button>
            <Button
              size="sm"
              isIconOnly
              onClick={() => editor.chain().focus().toggleStrike().run()}
              variant={editor.isActive("strike") ? "solid" : "light"}
            >
              <Strikethrough size={16} />
            </Button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
