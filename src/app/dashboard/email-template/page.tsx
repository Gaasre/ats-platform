"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { EmailTemplate } from "@prisma/client";
import Editor from "./editor";
import { MailPlus, Trash } from "lucide-react";
import TemplateItem from "./templateItem";
import { useEffect, useState } from "react";

async function getEmailTemplates(): Promise<EmailTemplate[]> {
  const req = await fetch(`http://localhost:3000/api/dashboard/email`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

async function getEmailTemplate(
  id: string
): Promise<EmailTemplate & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/email/${id}`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

async function newEmailTemplate(): Promise<EmailTemplate & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/email`, {
    method: "POST",
  });

  const res = await req.json();
  return res;
}

export default function EmailTemplatePage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>();
  const [templateLoading, setTemplateLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    getEmailTemplates().then((data) => setTemplates(data));
  }, []);

  const onDelete = (id: string) => {
    setTemplates(templates.filter((x) => x.id != id));
    setSelectedTemplate(undefined);
  };

  const onCreate = async () => {
    setCreateLoading(true);
    const newTemplate = await newEmailTemplate();
    if (!newTemplate.error) {
      setTemplates([...templates, newTemplate]);
      await selectTemplate(newTemplate.id);
    }
    setCreateLoading(false);
  };

  const selectTemplate = async (id: string) => {
    setTemplateLoading(true);
    const template = await getEmailTemplate(id);
    if (!template.error) {
      setSelectedTemplate(template);
    }
    setTemplateLoading(false);
  };

  const onEdit = (email: EmailTemplate) => {
    setTemplates(
      templates.map((template) => {
        if (template.id == email.id) {
          return email;
        }
        return template;
      })
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Email Templates</h1>
      </div>
      <Card>
        <CardBody>
          <div className="flex min-h-[calc(100vh-200px)]">
            <div className="w-[300px] overflow-y-auto border-r border-default-100 pr-2">
              <div className="flex mb-2 flex-row-reverse">
                <Button
                  size="sm"
                  startContent={<MailPlus size={16} />}
                  variant="light"
                  color="primary"
                  isLoading={createLoading}
                  onClick={onCreate}
                >
                  New Template
                </Button>
              </div>
              {templates.map((template) => (
                <TemplateItem
                  isSelected={template.id == selectedTemplate?.id}
                  key={template.id}
                  {...template}
                  onSelect={selectTemplate}
                  onDelete={onDelete}
                />
              ))}
            </div>
            <div className="flex-1 p-8">
              <Editor
                onEdit={onEdit}
                loading={templateLoading}
                template={selectedTemplate}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
