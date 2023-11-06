"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import { Candidate } from "@/interfaces/candidate";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function CandidateInfos({
  candidate,
}: {
  candidate: Candidate;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex flex-row-reverse">
      <Button onPress={onOpen} color="default" size="sm" variant="flat">
        View Profile
      </Button>
      <Modal isDismissable={false} size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex space-x-4 w-full items-center">
                  <Avatar name={candidate.firstName} size="lg" />
                  <div className="flex-1">
                    <p className="font-semibold">
                      {candidate.firstName} {candidate.lastName}
                    </p>
                    <p className="text-sm text-foreground-500 font-medium mb-1">
                      {candidate.email}
                    </p>
                    <p className="text-xs text-foreground-400 font-medium mb-2">
                      {candidate.phone}
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <Tabs aria-label="Options">
                  <Tab key="info" title="Info">
                    <div className="h-[500px] overflow-auto">
                      <h2 className="text-xl font-semibold mb-4">
                        Credentials
                      </h2>
                      <div className="grid grid-cols-2 text-sm gap-x-12 gap-y-4 mb-8">
                        <div className="flex justify-between w-full pr-4">
                          <p className="text-foreground-400">Location</p>
                          <p className="text-foreground-800 w-[150px] text-right">
                            Toronto, Canada
                          </p>
                        </div>
                        <div className="flex justify-between w-full pr-4">
                          <p className="text-foreground-400">Education</p>
                          <p className="text-foreground-800 w-[150px] text-right">
                            University of Suckers
                          </p>
                        </div>
                        <div className="flex justify-between w-full pr-4">
                          <p className="text-foreground-400">Skills</p>
                          <p className="text-foreground-800 w-[150px] text-right">
                            Project Management, Strategy, Unit sucking
                          </p>
                        </div>
                        <div className="flex justify-between w-full pr-4">
                          <p className="text-foreground-400">Languages</p>
                          <p className="text-foreground-800 w-[150px] text-right">
                            English, French
                          </p>
                        </div>
                        <div className="flex justify-between w-full pr-4">
                          <p className="text-foreground-400">
                            Years of experience
                          </p>
                          <p className="text-foreground-800 w-[150px] text-right">
                            12
                          </p>
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-4">
                        Other Infos
                      </h2>
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
                                  <p className="text-foreground-400">
                                    {field.name}
                                  </p>
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
                          <Avatar name="HR Lady" />
                          <div className="flex-1">
                            <p className="font-semibold">HR Lady</p>
                            <p className="text-xs text-foreground-500 mb-2">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Non, rerum! Modi, adipisci eveniet expedita
                          velit, nam harum cumque exercitationem quidem dolore
                          quaerat, delectus corporis ipsum minima repellat id
                          nostrum. Porro.
                        </p>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="communications" title="Communications">
                    <div className="h-[500px] overflow-auto">
                      Communications
                    </div>
                  </Tab>
                  <Tab key="experience" title="Experience & Education">
                    <div className="h-[500px] overflow-auto">
                      Experience & Education
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
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
