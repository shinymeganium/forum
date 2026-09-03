import api from "./axios";
import { useAuthStore } from "../stores/authStore";

export type Profile = {
  userId: string,
  username: string,
  joined: string,
  role: string,
  threads: number,
  comments: number
}

export const getProfile = async (): Promise<Profile> => {
  const res = await api.get("/api/profile");
  
  return res.data;
};

export const restoreSession = async () => {
  const token = localStorage.getItem("token");
  const setLoading = useAuthStore.getState().setLoading;

  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const profile = await getProfile();
    const login = useAuthStore.getState().login;

    login(
      token,
      profile.userId,
      profile.username,
      profile.role
    );
  }
  catch (err) {
    localStorage.removeItem("token");
    console.log(err);
  }
  finally {
    setLoading(false);
  }
};