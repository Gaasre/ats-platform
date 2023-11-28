import { Invitation, User } from "@prisma/client";

export interface IInvitation extends Invitation {
  user: User & {
    Company: {
      name: string;
    };
  };
}
