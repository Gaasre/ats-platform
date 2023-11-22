"use client";

import { Input } from "@nextui-org/input";
import "./style.css";
import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Divider, Skeleton } from "@nextui-org/react";
import { Bold, Italic, Save, Strikethrough } from "lucide-react";
import Mention from "@tiptap/extension-mention";

import suggestion from "./suggestion.ts";
import { EmailTemplate } from "@prisma/client";
import { useEffect, useState } from "react";

async function updateEmailTemplate(
  id: string,
  {
    name,
    subject,
    body,
  }: {
    name: string;
    subject: string;
    body: string;
  }
): Promise<EmailTemplate & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/email/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      subject,
      body,
    }),
  });

  const res = await req.json();
  return res;
}

const Editor = ({
  template,
  loading,
  onEdit,
}: {
  template: EmailTemplate | undefined;
  loading: boolean;
  onEdit: (template: EmailTemplate) => void;
}) => {
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
    content: template && template.body ? template.body : "",
  });

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    if (template) {
      setSubject(template.subject);
      setName(template.name);
      if (editor) {
        editor.commands.setContent(template.body ? template.body : "");
        console.log(template.body);
      }
    }
  }, [template]);

  const updateTemplate = async () => {
    setLoadingEdit(true);
    if (template && editor) {
      const data = await updateEmailTemplate(template?.id, {
        name,
        subject,
        body: editor.getHTML(),
      });
      if (!data.error) {
        onEdit(data);
      }
    }
    setLoadingEdit(false);
  };

  if (loading) {
    return (
      <div>
        <div className="flex flex-row-reverse mb-4">
          <Skeleton className="rounded-lg mb-4">
            <div className="h-8 w-20 rounded-lg bg-default-100"></div>
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg mb-4">
          <div className="h-12 rounded-lg bg-default-100"></div>
        </Skeleton>
        <Divider className="my-4"></Divider>
        <Skeleton className="rounded-lg mb-4">
          <div className="h-12 rounded-lg bg-default-100"></div>
        </Skeleton>
        <Skeleton className="rounded-lg mb-2">
          <div className="h-4 rounded-lg bg-default-100"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-[400px] rounded-lg bg-default-100"></div>
        </Skeleton>
      </div>
    );
  } else {
    if (template) {
      return (
        <div>
          <div className="flex flex-row-reverse mb-4">
            <Button
              startContent={<Save size={16} />}
              size="sm"
              color="primary"
              variant="flat"
              isLoading={loadingEdit}
              onClick={updateTemplate}
            >
              Save
            </Button>
          </div>
          <Input
            onValueChange={setName}
            label="Name"
            size="sm"
            value={name}
          ></Input>
          <Divider className="my-4"></Divider>
          <Input
            label="Subject"
            size="sm"
            onValueChange={setSubject}
            value={subject}
            className="mb-4"
          ></Input>
          <p className="text-xs mb-2">
            <b>Available placeholders:</b> @Candidate.Firstname
            @Candidate.Lastname
          </p>
          {editor && (
            <div>
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
            </div>
          )}
          {editor && <EditorContent editor={editor} />}
        </div>
      );
    }
  }

  return "";
};

export default Editor;
