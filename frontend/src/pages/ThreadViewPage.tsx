import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteThread, getThread } from "../api/threadApi";
import { type Thread } from "../api/threadApi";
import Layout from "../components/layout/Layout";
import ThreadDetail from "../components/thread/ThreadDetail";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";

export default function ThreadViewPage() {
  const [thread, setThread] = useState<Thread | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const openEditing = () => {
    navigate(`/edit/${id}`);
  };

  const deleteCurrentThread = async () => {
    if (thread) {
      await deleteThread(thread._id);
      navigate("/profile");
    }
  }

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
        <ThreadDetail
          thread={thread} 
          openEditForm={openEditing}
          deleteThread={deleteCurrentThread}
        />

        <CommentForm />

        <CommentList />
      </div>
    </Layout>
  );
}