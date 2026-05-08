export type Discipline = "logopaedie" | "ergotherapie" | "physiotherapie" | "andere";
export type TeamSize = "1" | "2-5" | "6-15" | "16+";

export interface PilotWaitlistEntry {
  name: string;
  practiceName?: string;
  email: string;
  discipline: Discipline;
  teamSize: TeamSize;
  message?: string;
}

export interface PilotWaitlistInsertResult {
  ok: boolean;
  mocked: boolean;
  errorMessage?: string;
}
