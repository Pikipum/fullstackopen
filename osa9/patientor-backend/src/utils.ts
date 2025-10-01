import { NewPatient, Gender } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  gender: z.enum(Gender),
  name: z.string(),
  occupation: z.string(),
  ssn: z.string(),
  dateOfBirth: z.iso.date(),
});

export const toNewPatientEntry = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};
