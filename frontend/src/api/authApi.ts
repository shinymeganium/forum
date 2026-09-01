import api from "./axios";

export const loginRequest = async (
  username: string, password: string
) => {
  const res = await api.post("/login",
    { username, password });

  return res.data;
};

export const registerRequest = async (
  username: string, email: string, password: string
) => {
  const res = await api.post("/register",
    { username, email, password });

  return res.data;
}