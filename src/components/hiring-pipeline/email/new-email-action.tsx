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

async function newEmailAction(
  jobId: string,
  stageId: string,
  emailTemplateId: string
): Promise<
  Action & { error?: string; emailTemplate: EmailTemplate; note: Note }
> {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/jobs/${jobId}/stage/${stageId}/action`,
    {
      method: "POST",
      body: JSON.stringify({ emailTemplateId, type: ActionType.EMAIL }),
    }
  );

  const res = await req.json();
  return res;
}

function NewEmailAction({
  onClose,
  onNew,
  jobId,
  stageId,
}: {
  onNew: (
    action: Action & { emailTemplate: EmailTemplate; note: Note }
  ) => void;
  onClose: () => void;
  jobId: string;
  stageId: string;
}) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [loading, setLoading] = useState(false);

  const newAction = async () => {
    setLoading(true);
    const data = await newEmailAction(jobId, stageId, selectedTemplateId);
    if (!data.error) {
      onNew(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEmailTemplates().then((x) => setTemplates(x));
  }, []);

  return (
    <div className="my-4">
      <h3 className="mb-4 font-semibold">New email action</h3>
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
          onClick={newAction}
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

export default NewEmailAction;
