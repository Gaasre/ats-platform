import { Candidate, WorkExperience, Project } from "@prisma/client";

interface ICandidate extends Candidate {
  workExperience: IWorkExperience[];
  projects: IProject[];
  customFields: string;
}

interface IWorkExperience extends WorkExperience {}

interface IProject extends Project {}

export type { IWorkExperience, IProject, ICandidate };
