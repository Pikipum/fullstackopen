import { z } from "zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NewPatientSchema } from "./utils";

export interface Entry {}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
  entries: Entry[];
}

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type noSsnPatient = Omit<Patient, "ssn">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
