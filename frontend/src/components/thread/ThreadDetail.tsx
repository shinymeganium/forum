import type { Thread } from "../../api/threadApi";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import api from "../../api/axios";

type ThreadDetailProps = {
  thread: Thread | null;
}

export default function ThreadDetail({
  thread }: ThreadDetailProps) {
  const [author, setAuthor] = useState();
  const date = thread?.createdAt.slice(0, 10);

  useEffect(() => {
    const getThreadDetails = async () => {
      if (!thread) return;

      const author = await api.get(`/api/users/${thread?.author}`);

      setAuthor(author.data.username);
    }

    getThreadDetails();
  }, [thread]);

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">
            {thread?.title}
          </h1>

          <p className="text-sm text-gray-500">
            {author} • {date}
          </p>
        </div>

        <p className="leading-relaxed">
          {thread?.content}
        </p>

        <div className="flex gap-2">
          <Button variant="secondary">
            Edit
          </Button>

          <Button variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}