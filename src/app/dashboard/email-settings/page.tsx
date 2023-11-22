"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Company } from "@prisma/client";
import { Button } from "@nextui-org/react";

async function updateEmailSettings({
  emailHost,
  emailPort,
  emailUser,
  emailPass,
}: {
  emailHost: string;
  emailPort: number;
  emailUser: string;
  emailPass: string;
}): Promise<Company & { error?: string }> {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/settings/email`,
    {
      method: "PUT",
      body: JSON.stringify({
        emailHost,
        emailPort,
        emailUser,
        emailPass,
      }),
    }
  );

  const res = await req.json();
  return res;
}

export default function EmailSettingsPage() {
  const { data } = useSession();
  const [emailHost, setEmailHost] = useState("");
  const [emailPort, setEmailPort] = useState(465);
  const [emailUser, setEmailUser] = useState("");
  const [emailPass, setEmailPass] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmailHost(data?.user.Company?.emailHost ?? "");
    setEmailPort(data?.user.Company?.emailPort ?? 465);
    setEmailUser(data?.user.Company?.emailUser ?? "");
    setEmailPass(data?.user.Company?.emailPass ?? "");
  }, [data?.user]);

  const updateSettings = () => {
    setLoading(true);
    updateEmailSettings({
      emailHost,
      emailPort,
      emailUser,
      emailPass,
    }).then(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Email Settings</h1>
      </div>
      <Card className="p-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full max-w-xl">
            <div>
              <h2 className="text-lg font-semibold">SMTP</h2>
              <p className="text-sm text-default-600">Sending emails</p>
            </div>
            <div>
              <Button
                color="primary"
                onClick={updateSettings}
                isLoading={loading}
              >
                Update
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
            <Input
              type="text"
              label="Host"
              labelPlacement="outside"
              placeholder="Enter your host"
              description="Example: mail.domain.com"
              value={emailHost}
              onValueChange={setEmailHost}
            />
            <Input
              type="number"
              label="Port"
              labelPlacement="outside"
              placeholder="Enter your port"
              description="by default 465"
              value={emailPort?.toString()}
              onValueChange={(value) => setEmailPort(parseInt(value))}
            />
            <Input
              type="text"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              description="Example: email@domain.com"
              value={emailUser}
              onValueChange={setEmailUser}
            />
            <Input
              type="password"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              value={emailPass}
              onValueChange={setEmailPass}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
