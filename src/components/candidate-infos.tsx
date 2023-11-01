import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import moment from "moment";
import { Candidate } from "@/interfaces/candidate";

export default function CandidateInfos({
  candidate,
}: {
  candidate: Candidate;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(candidate);
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
                    <h2 className="text-xl font-semibold mb-4">Credentials</h2>
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
                    <h2 className="text-xl font-semibold mb-4">Other Infos</h2>
                    <div className="grid grid-cols-2 text-sm gap-x-12 gap-y-4 mb-8">
                      {candidate.customFields != "{}"
                        ? (
                            JSON.parse(candidate.customFields) as {
                              id: string;
                              name: string;
                              value: string;
                            }[]
                          ).map((field) => (
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non, rerum! Modi, adipisci eveniet expedita velit, nam
                        harum cumque exercitationem quidem dolore quaerat,
                        delectus corporis ipsum minima repellat id nostrum.
                        Porro.
                      </p>
                    </div>
                  </Tab>
                  <Tab key="communications" title="Communications">
                    Communications
                  </Tab>
                  <Tab key="documents" title="Documents">
                    Documents
                  </Tab>
                  <Tab key="assignments" title="Assignments">
                    Assignments
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
