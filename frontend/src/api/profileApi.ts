import api from "./axios";

export type Profile = {
  username: string,
  joined: string,
  threads: number,
  comments: number
}

export const getProfile = async (): Promise<Profile> => {
  const res = await api.get("/api/profile");
  
  return res.data;
};