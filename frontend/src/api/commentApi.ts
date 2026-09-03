export type Comment = {
  _id: string,
  content: string,
  author: {
    _id: string,
    username: string
  },
  threadId: string,
  createdAt: string,
  updatedAt: string
};