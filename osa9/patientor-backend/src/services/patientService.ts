import patientData from "../../data/patients";
import { noSsnPatient } from "../types";
import { Patient } from "../types";

const noSsnPatients: noSsnPatient[] = (patientData as Patient[]).map(
  ({ ssn, ...rest }) => rest
);
const getEntries = (): Omit<noSsnPatient, "ssn">[] => {
  return noSsnPatients;
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
};
