import axios from "axios";
import type { Diary } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Diary[]> => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);

  return data;
};

/*
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};
*/

export default {
  getAll,
};
