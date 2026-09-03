import api from "./axios";

export type User = {
  _id: string;
  username: string;
  role: string;
}

export const getUser = async (id: string) => {
  const res = await api.get(`/api/users/${id}`);

  return res.data;
};