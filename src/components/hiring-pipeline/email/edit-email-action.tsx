"use client";

import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";
import { Action, ActionType, EmailTemplate, Note } from "@prisma/client";
import { useEffect, useState } from "react";

async function getEmailTemplates(): Promise<EmailTemplate[]> {
  const req = await fetch(`http://localhost:3000/api/dashboard/email`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

async function updateEmailAction(
  id: string,
  emailTemplateId: string
): Promise<
  Action & { error?: string; emailTemplate: EmailTemplate; note: Note }
> {
  const req = await fetch(`http://localhost:3000/api/dashboard/action/${id}`, {
    method: "PUT",
    body: JSON.stringify({ emailTemplateId, type: ActionType.EMAIL }),
  });

  const res = await req.json();
  return res;
}

function EditEmailAction({
  action,
  onClose,
  onEdit,
}: {
  action: Action;
  onEdit: () => void;
  onClose: () => void;
}) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [loading, setLoading] = useState(false);

  const updateAction = async () => {
    setLoading(true);
    if (selectedTemplateId) {
      const data = await updateEmailAction(action.id, selectedTemplateId);
      if (!data.error) {
        onEdit();
        onClose();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getEmailTemplates().then((x) => {
      setTemplates(x);
      setSelectedTemplateId(action.emailTemplateId ?? "");
    });
  }, []);

  return (
    <div className="my-4">
      <h3 className="mb-4 font-semibold">Edit email action</h3>
      <div className="px-4 flex gap-4">
        <Select
          description="The email will be sent to the candidate once moved into this stage."
          label="Email Template"
          placeholder="Select an Email Template"
          className="max-w-md"
          selectedKeys={selectedTemplateId ? [selectedTemplateId] : []}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
        >
          {templates.map((template) => (
            <SelectItem
              description={template.subject}
              key={template.id}
              value={template.id}
            >
              {template.name}
            </SelectItem>
          ))}
        </Select>
        <Button
          isDisabled={selectedTemplateId ? false : true}
          className="mt-2"
          color="primary"
          variant="light"
          isLoading={loading}
          onClick={updateAction}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          className="mt-2"
          color="danger"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default EditEmailAction;
