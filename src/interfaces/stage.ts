import { Candidate } from "./candidate";

export type Stage = {
  id: string;
  title: string;
  color: string;
  order: number;
  candidates: Candidate[];
  isEditing?: boolean;
};
