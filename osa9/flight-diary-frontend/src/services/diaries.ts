import axios from "axios";
import type { Diary, DiaryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Diary[]> => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const create = async (diary: DiaryFormValues) => {
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/diaries`, diary);

  return data;
};

export default {
  getAll,
  create,
};
