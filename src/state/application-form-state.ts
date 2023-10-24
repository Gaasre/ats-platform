import { CustomFieldType } from "@/interfaces/form";
import { Job } from "@/interfaces/job";
import { Stage } from "@prisma/client";
import { atom } from "recoil";

export const customFieldsState = atom<CustomFieldType[]>({
  key: "customFieldsState",
  default: [],
});

export const jobsState = atom<Job[]>({
  key: "jobsState",
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
    applicationDeadline: "",
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
    postedAt: "",
    skillsRequired: [],
  },
});

export const stagesState = atom<(Stage & { isEditing: boolean })[]>({
  key: "stagesState",
  default: [],
});
