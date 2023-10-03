import { CustomFieldType } from "@/interfaces/form";
import { Job, Stage } from "@prisma/client";
import { atom } from "recoil";

export const customFieldsState = atom<CustomFieldType[]>({
  key: "customFieldsState",
  default: [],
});

export const jobDetailsState = atom<Job>({
  key: "jobDetailsState",
  default: {
    id: "",
    title: "",
    description: "",
    country: "",
    city: "",
    applicationDeadline: new Date(),
    employmentType: "Full-time",
    salary: 0,
    currency: "EUR",
    requirements: "",
    responsibilities: "",
    experienceLevel: "Senior",
    jobType: "Hybrid",
    benefits: "",
    quota: 0,
    companyId: "",
    active: false,
    industry: "",
    postedAt: new Date(),
    skillsRequired: [],
  },
});

export const stagesState = atom<(Stage & { isEditing: boolean })[]>({
  key: "stagesState",
  default: [],
});
