"use client";

import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/tabs";
import SignIn from "@/components/auth/signin";
import Signup from "@/components/auth/signup";

export default function Signin() {
  const [selected, setSelected] = useState("signin");

  return (
    <div className="flex p-8 h-screen gap-4">
      <div className="h-full text-center px-36 w-1/2 py-12">
        <Tabs
          aria-label="Signin Options"
          selectedKey={selected}
          onSelectionChange={(value) => setSelected(value.toString())}
        >
          <Tab key="signin" title="Sign in">
            <SignIn goBack={() => setSelected("signup")}></SignIn>
          </Tab>
          <Tab key="signup" title="Sign up">
            <Signup goBack={() => setSelected("signin")}></Signup>
          </Tab>
        </Tabs>
      </div>
      <div className="bg-primary-50 h-full w-1/2 rounded-xl"></div>
    </div>
  );
}
