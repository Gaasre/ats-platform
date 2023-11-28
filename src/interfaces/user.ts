import { Invitation, User } from "@prisma/client";

interface IUser extends User {
  invitation: Invitation;
}

export type { IUser };
