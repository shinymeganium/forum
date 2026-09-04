import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getThread } from "../api/threadApi";
import { type Thread } from "../api/threadApi";
import Layout from "../components/layout/Layout";
import ThreadDetail from "../components/thread/ThreadDetail";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";

export default function ThreadViewPage() {
  const [thread, setThread] = useState<Thread | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const loadThread = async () => {
      if (!id) return;

      const thread = await getThread(id);
      setThread(thread);
    };

    loadThread();
  }, [id]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col gap-5">
        <ThreadDetail thread={thread} />

        <CommentForm />

        <CommentList />
      </div>
    </Layout>
  );
}