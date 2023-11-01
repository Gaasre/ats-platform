import { Prisma } from "@prisma/client";

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobId: string;
  date: Date;
  stageId: string;
  customFields: string;
}
