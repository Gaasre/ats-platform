"use client";

import { Button } from "@nextui-org/button";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { ICandidate } from "@/interfaces/candidate";
import Candidate from "./candidate";

export default function CandidateInfos({
  candidate,
}: {
  candidate: ICandidate;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex flex-row-reverse">
      <Button onPress={onOpen} size="sm" variant="flat">
        View Profile
      </Button>
      <Modal isDismissable={false} size="5xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {/* <div className="flex space-x-4 w-full items-center">
                  <Avatar
                    name={candidate.firstName}
                    size="lg"
                    className="bg-default-100"
                  />
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
                </div> */}
              </ModalHeader>
              <ModalBody>
                <Candidate candidate={candidate}></Candidate>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
