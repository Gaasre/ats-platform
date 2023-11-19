import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { EmailTemplate } from "@prisma/client";
import Editor from "./editor";

async function getEmailTemplates(): Promise<
  EmailTemplate & { error?: string }
> {
  const req = await fetch(`http://localhost:3000/api/dashboard/email`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

export default async function EmailTemplatePage() {
  const templates = await getEmailTemplates();
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Email Templates</h1>
        <Button variant="solid" color="primary">
          New Template
        </Button>
      </div>
      <Card>
        <CardBody>
          <div className="flex min-h-[calc(100vh-200px)]">
            <div className="w-[300px] overflow-y-auto border-r border-default-100 px-2">
              <div className="flex w-full">
                <div className="flex-1 p-4 overflow-hidden cursor-pointer bg-default-100 rounded-md transition-colors hover:bg-default-100">
                  <p className="font-semibold">Hired Template</p>
                  <p className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                    Subject: We have some good news for you @Candidate.name
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="flex-1 p-8">
              <Editor />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
