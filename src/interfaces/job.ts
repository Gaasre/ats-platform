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
  _count?: {
    candidates: number;
  };
}
