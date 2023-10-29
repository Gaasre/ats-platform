import { Company } from "@prisma/client";
import { CustomFieldType } from "./form";
import { Stage } from "./stage";

export interface Job {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  postedAt: string;
  applicationDeadline: string;
  employmentType: string;
  salary: number;
  currency: string;
  requirements: string;
  responsibilities: string;
  experienceLevel: string;
  industry: string;
  jobType: string;
  skillsRequired: Array<string>;
  benefits: string;
  quota: number;
  companyId: string;
  active: boolean;
  company?: Company;
  form?: CustomFieldType[];
  stages?: Stage[];
  _count?: {
    candidates: number;
  };
}
