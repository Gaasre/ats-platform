"use client"

import { Input } from "@nextui-org/react";

export default function Filters({ jobId }: { jobId: string }) {
    return (
      <div className="p-4">
        <h1 className="text-xl mb-8">Customize Candidate Filters</h1>
        <div className="flex gap-4 w-4/5">
        <Input placeholder="Select field"></Input>
        <Input placeholder="Select modifier"></Input>
        <Input placeholder="Value"></Input>
        </div>
      </div>
    );
  }