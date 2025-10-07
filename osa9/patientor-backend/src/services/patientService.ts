import { Patient, noSsnPatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import { NewPatientSchema } from "../utils";

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const noSsnPatients: noSsnPatient[] = (patientData as Patient[]).map(
  ({ ssn, ...rest }) => rest
);

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const findPatientById = (id: string): Patient => {
  return patients.find((patient) => patient.id === id) as Patient;
};

const getNoSsnEntries = (): noSsnPatient[] => {
  return noSsnPatients;
};

const addPatient = (object: any): Patient => {
  const newPatientData = toNewPatient(object);
  const newPatient: Patient = {
    ...newPatientData,
    id: uuid(),
    entries: [],
  };
  patientData.push(newPatient);
  const { ssn, ...noSsn } = newPatient;
  noSsnPatients.push(noSsn);
  return newPatient;
};

export default {
  getEntries,
  getNoSsnEntries,
  addPatient,
  findPatientById,
};
