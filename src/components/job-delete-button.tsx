"use client";

import { Job } from "@/interfaces/job";
import { jobsState } from "@/state/application-form-state";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { Pause, Play, Trash } from "lucide-react";
import { useState } from "react";
import { useRecoilState } from "recoil";

type Props = {
  id: string;
};

async function deleteJob(
  id: string
): Promise<{ status: string; message: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs/${id}/delete`, {
    method: "DELETE",
  });

  const res = await req.json();
  return res;
}

async function getJobs(): Promise<Job[] & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

export default function JobDeleteButton({ id }: Props) {
  const [jobs, setJobs] = useRecoilState(jobsState);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const removeJob = async () => {
    setLoading(true);
    const data = await deleteJob(id);
    if (data.status == "success") {
      const jobsData = await getJobs();
      setJobs(jobsData);
    }
    onClose();
    setLoading(false);
  };
  return (
    <>
      <Tooltip content={"Delete Job"}>
        {loading ? (
          <Spinner size="sm" />
        ) : (
          <Link
            className="cursor-pointer"
            onClick={onOpen}
            color="danger"
            isBlock
          >
            <Trash size={14} />
          </Link>
        )}
      </Tooltip>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete job posting
              </ModalHeader>
              <ModalBody>
                <p>
                  This action is irreversible. Are you sure you want to delete
                  the job posting ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button isLoading={loading} color="danger" onPress={removeJob}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
