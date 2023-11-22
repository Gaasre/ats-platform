"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useState } from "react";

async function deleteEmailTemplate(id: string): Promise<{ status: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/email/${id}`, {
    method: "DELETE",
  });

  const res = await req.json();
  return res;
}

function TemplateItem({
  id,
  name,
  subject,
  isSelected,
  onSelect,
  onDelete,
}: {
  id: string;
  name: string;
  subject: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const deleteTemplate = async () => {
    setLoading(true);
    const data = await deleteEmailTemplate(id);
    if (data.status == "success") {
      onDelete(id);
    }
    onClose();
    setLoading(false);
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`flex py-2 px-2 gap-4 w-full cursor-pointer rounded-md ${
        isSelected ? "bg-default-100" : "bg-background"
      } transition-colors hover:bg-default-100 items-center mb-2`}
    >
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold">{name}</p>
        <p className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">
          {subject}
        </p>
      </div>
      <Button
        onClick={onOpen}
        size="sm"
        isIconOnly
        variant="light"
        color="danger"
      >
        <Trash size={16} />
      </Button>
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
                <Button
                  isLoading={loading}
                  color="danger"
                  onPress={deleteTemplate}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TemplateItem;
