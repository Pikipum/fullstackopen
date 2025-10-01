import { Patient, Gender, noSsnPatient } from "../types";
import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const toNewPatient = (object: any): Patient => {
  if (
    !object ||
    !isString(object.name) ||
    !isString(object.dateOfBirth) ||
    !isString(object.ssn) ||
    !isString(object.occupation) ||
    !isGender(object.gender)
  ) {
    throw new Error("Incorrect or missing patient data");
  }

  return {
    id: uuid(),
    name: object.name,
    dateOfBirth: object.dateOfBirth,
    ssn: object.ssn,
    gender: object.gender,
    occupation: object.occupation,
  };
};
const noSsnPatients: noSsnPatient[] = (patientData as Patient[]).map(
  ({ ssn, ...rest }) => rest
);

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getNoSsnEntries = (): noSsnPatient[] => {
  return noSsnPatients;
};

const addPatient = (object: any): Patient => {
  const newPatient = toNewPatient(object);
  patientData.push(newPatient);
  const { ssn, ...noSsn } = newPatient;
  noSsnPatients.push(noSsn);
  return newPatient;
};

export default {
  getEntries,
  getNoSsnEntries,
  addPatient,
};
