"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import moment from "moment";
import ExperienceEducation from "./candidate/experience-education";
import { ICandidate } from "@/interfaces/candidate";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Candidate({ candidate }: { candidate: ICandidate }) {
  return (
    <div className="flex gap-x-4">
      <div className="w-1/3 flex items-center flex-col px-4">
        <Avatar
          name={candidate.firstName}
          className="bg-default-100 w-20 h-20 text-xl mb-2"
        />
        <h1 className="text-lg font-bold">
          {candidate.firstName} {candidate.lastName}
        </h1>
        <h2 className="text-default-500 font-medium text-xs mb-6">
          Applied {moment(candidate.date).fromNow()}
        </h2>
        <div className="px-4 py-2 rounded-lg border bg-default-100/50 w-full">
          <h3 className="font-bold mb-2 text-sm">Personal data</h3>
          <ul>
            <li className="text-xs flex font-semibold border-b py-3">
              <p className="flex gap-x-2 w-1/2 text-default-500">
                <Phone size={14} /> Phone number
              </p>
              <p className="flex-1 text-right">{candidate.phone}</p>
            </li>
            <li className="text-xs flex font-semibold border-b py-3">
              <p className="flex gap-x-2 w-1/2 text-default-500">
                <Mail size={14} /> Email
              </p>
              <p className="flex-1 text-right">{candidate.email}</p>
            </li>
            <li className="text-xs flex font-semibold border-b py-3">
              <p className="flex gap-x-2 w-1/2 text-default-500">
                <MapPin size={14} /> Location
              </p>
              <p className="flex-1 text-right">{candidate.location}</p>
            </li>
            <li className="text-xs flex font-semibold border-b py-3">
              <p className="flex gap-x-2 w-1/2 text-default-500">
                <Linkedin size={14} /> Linkedin
              </p>
              <a
                target="_blank"
                href={
                  candidate.linkedin?.includes("http")
                    ? candidate.linkedin
                    : `https://${candidate.linkedin}`
                }
                className="flex-1 text-right overflow-ellipsis overflow-hidden max-w-1/2"
              >
                {candidate.linkedin}
              </a>
            </li>
            <li className="text-xs flex font-semibold py-3">
              <p className="flex gap-x-2 w-1/2 text-default-500">
                <Github size={14} /> Github
              </p>
              <a
                target="_blank"
                href={candidate.github!}
                className="flex-1 text-right overflow-ellipsis overflow-hidden max-w-1/2"
              >
                {candidate.github}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Tabs aria-label="Options">
          <Tab key="info" title="Info">
            <div className="h-[500px] overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Other Infos</h2>
              <div className="grid grid-cols-2 text-sm gap-x-12 gap-y-4 mb-8">
                {candidate.customFields != "{}"
                  ? (
                      JSON.parse(candidate.customFields) as {
                        id: string;
                        type: "text" | "file";
                        name: string;
                        value: string;
                      }[]
                    )
                      .filter((field) => field.type == "text")
                      .map((field) => (
                        <div
                          key={field.id}
                          className="flex justify-between w-full pr-4"
                        >
                          <p className="text-foreground-400">{field.name}</p>
                          <p className="text-foreground-800 w-[150px] text-right">
                            {field.value}
                          </p>
                        </div>
                      ))
                  : "Empty"}
              </div>
              <h2 className="text-xl font-semibold mb-4">Notes</h2>
              <div>
                <div className="flex space-x-4 w-full items-center mb-2">
                  <Avatar className="bg-default-100" name="HR Lady" />
                  <div className="flex-1">
                    <p className="font-semibold">HR Lady</p>
                    <p className="text-xs text-foreground-500 mb-2">
                      2 hours ago
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                  rerum! Modi, adipisci eveniet expedita velit, nam harum cumque
                  exercitationem quidem dolore quaerat, delectus corporis ipsum
                  minima repellat id nostrum. Porro.
                </p>
              </div>
            </div>
          </Tab>
          <Tab key="communications" title="Communications">
            <div className="h-[500px] overflow-auto">Communications</div>
          </Tab>
          <Tab key="experience" title="Experience & Education">
            <div className="h-[500px] overflow-auto">
              <ExperienceEducation candidate={candidate}></ExperienceEducation>
            </div>
          </Tab>
          <Tab key="documents" title="Documents">
            <div className="h-[500px] overflow-auto">
              <h2 className="text-2xl">Resume</h2>
              <div className="pr-4">
                <Divider className="my-4" />
              </div>
              <Document file={candidate.resumeLink}>
                <Page pageNumber={1} />
              </Document>
              <h2 className="text-2xl">Other Files</h2>
              <div className="pr-4">
                <Divider className="my-4" />
              </div>
              <div className="flex flex-col gap-1">
                {candidate.customFields != "{}"
                  ? (
                      JSON.parse(candidate.customFields) as {
                        id: string;
                        type: "text" | "file";
                        name: string;
                        value: string;
                      }[]
                    )
                      .filter((field) => field.type == "file")
                      .map((field) => (
                        <div key={field.id}>
                          <Button
                            href={field.value}
                            as={Link}
                            color="primary"
                            showAnchorIcon
                            variant="light"
                            target="_blank"
                          >
                            {field.name}
                          </Button>
                        </div>
                      ))
                  : "Empty"}
              </div>
            </div>
          </Tab>
          <Tab key="assignments" title="Assignments">
            <div className="h-[500px] overflow-auto">Assignments</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
