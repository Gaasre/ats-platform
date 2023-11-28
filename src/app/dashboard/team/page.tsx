"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IUser } from "@/interfaces/user";
import { Spinner } from "@nextui-org/spinner";
import { Button, Chip, Input } from "@nextui-org/react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AlertCircle, Trash } from "lucide-react";

async function getTeam(): Promise<IUser[] & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/team`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

async function submitForm(
  form: FieldValues
): Promise<IUser & { status?: string; message?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/team`, {
    method: "POST",
    body: JSON.stringify(form),
  });

  const res = await req.json();
  return res;
}

async function deleteUser(
  id: string
): Promise<{ error?: string; success?: boolean }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/team/${id}`, {
    method: "DELETE",
  });

  const res = await req.json();
  return res;
}

export default function TeamPage() {
  const [team, setTeam] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const removeUser = async (id: string) => {
    setLoadingDelete(true);
    const data = await deleteUser(id);
    if (data.success) {
      setSelectedId("");
      onCloseDelete();
      setTeam(team.filter((u) => u.id != id));
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    setLoading(true);
    getTeam().then((data) => {
      if (!data.error) {
        setTeam(data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Team</h1>
        <Button color="primary" onPress={onOpen}>
          + Invite
        </Button>
        <Modal
          backdrop="blur"
          isOpen={isOpenDelete && selectedId != ""}
          onClose={onCloseDelete}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Remove user from team
                </ModalHeader>
                <ModalBody>
                  <p>
                    This action is irreversible. Are you sure you want to remove
                    the user from your team ?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isLoading={loadingDelete}
                    color="danger"
                    onPress={() => removeUser(selectedId)}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    setFormLoading(true);
                    const res = await submitForm(data);
                    if (res.status != "error") {
                      setTeam([...team, res]);
                      onClose();
                      setError("");
                    } else {
                      setError(res.message ? res.message : "");
                    }
                    setFormLoading(false);
                  })}
                >
                  <ModalHeader className="flex flex-col gap-1">
                    Invite Member
                  </ModalHeader>
                  <ModalBody>
                    {error ? (
                      <div className="text-danger bg-danger-50 py-2 px-4 rounded-md text-sm flex items-center gap-2">
                        <AlertCircle size={14} />
                        <p>{error}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <Input
                      {...register("email", {
                        required: "Email is required",
                        validate: {
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address",
                        },
                      })}
                      type="email"
                      label="Email"
                      labelPlacement="outside"
                      isRequired
                      placeholder="Email address"
                      color={errors.email?.message ? "danger" : "default"}
                      errorMessage={errors.email?.message as string}
                    />
                    <Input
                      {...register("name", {
                        required: "Name is required",
                      })}
                      type="text"
                      label="Name"
                      labelPlacement="outside"
                      isRequired
                      placeholder="Team member's name"
                      color={errors.name?.message ? "danger" : "default"}
                      errorMessage={errors.name?.message as string}
                    />
                    <Input
                      {...register("role", {
                        required: "Role is required",
                      })}
                      type="text"
                      label="Role"
                      labelPlacement="outside"
                      isRequired
                      placeholder="Team member's role"
                      color={errors.role?.message ? "danger" : "default"}
                      errorMessage={errors.role?.message as string}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      isLoading={formLoading}
                      type="submit"
                    >
                      Send Invitation
                    </Button>
                  </ModalFooter>
                </form>
              </FormProvider>
            )}
          </ModalContent>
        </Modal>
      </div>
      <Table
        aria-label="Team Members"
        disabledKeys={
          team
            ? team
                .filter(
                  (user) =>
                    user.id == session?.user.id ||
                    user.id == session?.user.Company?.headId
                )
                .map((user) => user.id)
            : []
        }
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Invitation Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          loadingContent={<Spinner label="Loading..." />}
          isLoading={loading}
        >
          {team.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip
                  color={
                    user.invitation?.status == "PENDING" ? "warning" : "success"
                  }
                  variant="flat"
                  size="sm"
                >
                  <p className="text-xs font-medium">
                    {user.invitation?.status
                      ? user.invitation?.status
                      : "ACCEPTED"}
                  </p>
                </Chip>
              </TableCell>
              <TableCell>
                {session?.user.Company?.headId != user.id &&
                session?.user.Company?.headId == session?.user.id ? (
                  <Button
                    onClick={() => {
                      setSelectedId(user.id);
                      onOpenDelete();
                    }}
                    size="sm"
                    isIconOnly
                    color="danger"
                    variant="light"
                  >
                    <Trash size={14} />
                  </Button>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
