import { ICandidate } from "./candidate";

export type Stage = {
  id: string;
  title: string;
  color: string;
  order: number;
  candidates: ICandidate[];
  isEditing?: boolean;
};
