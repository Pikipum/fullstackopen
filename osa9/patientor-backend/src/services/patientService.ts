import { Patient, Gender, noSsnPatient } from "../types";
import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";

const toNewPatient = (object: any): Patient => {
  if (
    !object.name ||
    !object.dateOfBirth ||
    !object.ssn ||
    !object.gender ||
    !object.occupation
  ) {
    throw new Error("Missing required patient fields");
  }

  if (!Object.values(Gender).includes(object.gender as Gender)) {
    throw new Error("Invalid gender value");
  }

  return {
    id: uuid(),
    name: String(object.name),
    dateOfBirth: String(object.dateOfBirth),
    ssn: String(object.ssn),
    gender: object.gender as Gender,
    occupation: String(object.occupation),
  };
};
const noSsnPatients: noSsnPatient[] = (patientData as Patient[]).map(
  ({ ssn, ...rest }) => rest
);

const getEntries = (): noSsnPatient[] => {
  return noSsnPatients;
};

const addPatient = (object: any): noSsnPatient => {
  const newPatient = toNewPatient(object);
  patientData.push(newPatient);
  const { ssn, ...noSsn } = newPatient;
  noSsnPatients.push(noSsn);
  return noSsn;
};

export default {
  getEntries,
  addPatient,
};
