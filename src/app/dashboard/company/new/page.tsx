"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { useSession } from "next-auth/react";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewCompanyPage() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const { update } = useSession();
  const router = useRouter();

  function newCompany(name: string, website: string) {
    axios
      .post("/api/company", {
        name,
        website,
      })
      .then((response) => {
        update();
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium">New Company</h1>
        <div className="flex gap-4 items-center">
          <Link color="foreground" href="/dashboard">
            Close
          </Link>
          <Button
            color="primary"
            isDisabled={name.length === 0 || website.length === 0}
            onClick={() => {
              newCompany(name, website);
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 max-w-xl">
            <Input
              value={name}
              label="Name"
              labelPlacement="outside"
              placeholder="Your company's name"
              onValueChange={setName}
            ></Input>
            <Input
              value={website}
              label="Website"
              type="url"
              labelPlacement="outside"
              placeholder="Your company's website"
              onValueChange={setWebsite}
            ></Input>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
