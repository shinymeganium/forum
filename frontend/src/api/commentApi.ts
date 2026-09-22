import api from "./axios";

export type Comment = {
  _id: string,
  content: string,
  author: {
    _id: string,
    username: string
  },
  threadId: {
    _id: string,
    title: string
  },
  createdAt: string,
  updatedAt: string
};

export const getComments = async (id: string)
: Promise<Comment[]> => {
  const res = await api.get(`/api/threads/${id}/comments`);

  return res.data;
};

export const getComment = async (id: string)
: Promise<Comment> => {
  const res = await api.get(`/api/comments/${id}`);

  return res.data;
};

export const postComment = async (
content: string, threadId: string, userId: string
): Promise<Comment> => {
  const res = await api.post("/api/comments",
    { content, threadId, userId });

  return res.data;
};

export const putComment = async (
  id: string, content: string
): Promise<{ message: string }> => {
  const res = await api.put(`/api/comments/${id}`, { content });

  return res.data;
};

export const deleteComment = async (id: string)
: Promise<{ message: string }> => {
  const res = await api.delete(`/api/comments/${id}`);

  return res.data;
};