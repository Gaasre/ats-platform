"use client";

import { useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/tabs";
import SignIn from "@/components/auth/signin";
import Signup from "@/components/auth/signup";
import { useSearchParams } from "next/navigation";
import { getInvitation } from "@/lib/api";
import { CalendarX } from "lucide-react";
import { Button, Link } from "@nextui-org/react";

export default function Signin() {
  const [selected, setSelected] = useState("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [invitationId, setInvitationId] = useState("");
  const [invalid, setInvalid] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    const i = params.get("i");
    if (i) {
      setSelected("signup");
      getInvitation(i as string).then((data) => {
        if (data) {
          setInvitationId(data.id);
          setEmail(data.user.email ?? "");
          setName(data.user.name ?? "");
          setCompany(data.user.Company.name);
        } else {
          setInvalid(true);
        }
      });
    }
  }, [params]);

  return (
    <div className="flex p-8 h-screen gap-4">
      <div className="h-full text-center px-36 w-1/2 py-12">
        {invalid ? (
          <div className="flex flex-col items-center h-full justify-center">
            <CalendarX size={80} className="text-primary mb-10" />
            <h1 className="text-2xl font-bold mb-4">
              Your invitation has expired
            </h1>
            <p className="mb-8">
              Please refresh the page so you can signin/signup with your account.
            </p>
            <Button as={Link} color="primary" href="/signin">
              Refresh
            </Button>
          </div>
        ) : (
          <Tabs
            aria-label="Signin Options"
            selectedKey={selected}
            onSelectionChange={(value) => setSelected(value.toString())}
          >
            <Tab key="signin" title="Sign in">
              <SignIn goBack={() => setSelected("signup")}></SignIn>
            </Tab>
            <Tab key="signup" title="Sign up">
              <Signup
                invitationId={invitationId}
                email={email}
                name={name}
                company={company}
                goBack={() => setSelected("signin")}
              ></Signup>
            </Tab>
          </Tabs>
        )}
      </div>
      <div className="bg-primary-50 h-full w-1/2 rounded-xl"></div>
    </div>
  );
}
