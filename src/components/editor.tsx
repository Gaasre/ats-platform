"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  onChange?: (blocks: string) => void;
  initialContent: string;
  isEditor: boolean;
};

// Our <Editor> component we can reuse later
export default function Editor(props: Props) {
  const [markdown, setMarkdown] = useState<string>("");
  let newSlashMenuItems = getDefaultReactSlashMenuItems().filter(
    (item) => item.name != "Image"
  );

  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: props.initialContent
      ? JSON.parse(props.initialContent)
      : [],
    slashMenuItems: newSlashMenuItems,
  });

  editor.onEditorContentChange(async () => {
    if (!props.isEditor) {
      const md = await editor.blocksToMarkdown(editor.topLevelBlocks);
      setMarkdown(md);
    }

    if (props.onChange) {
      props.onChange(JSON.stringify(editor.topLevelBlocks));
    }
  });

  // Renders the editor instance using a React component.

  if (props.isEditor) {
    return <BlockNoteView editor={editor} />;
  } else {
    return (
      <div className="prose max-w-4xl mx-auto">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    );
  }
}
