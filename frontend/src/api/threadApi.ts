import api from "./axios";

export type Thread = {
  _id: string,
  title: string,
  content: string,
  author: {
    _id: string,
    username: string
  },
  categories: string,
  createdAt: string,
  updatedAt: string
};

export const getThreads = async (): Promise<Thread[]> => {
  const res = await api.get("/api/threads");

  return res.data;
};

export const getThread = async (id: string): Promise<Thread> => {
  const res = await api.get(`/api/threads/${id}`);

  return res.data;
};

export const postThread = async (
  title: string, content: string
): Promise<Thread> => {
  const res = await api.post("/api/threads",
    { title, content });

  return res.data;
};

export const putThread = async (
  id: string, title: string, content: string
): Promise<{ message: string }> => {
  const res = await api.put(`/api/threads/${id}`,
    { title, content });

  return res.data;
};

export const deleteThread = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete(`/api/threads/${id}`);

  return res.data;
};