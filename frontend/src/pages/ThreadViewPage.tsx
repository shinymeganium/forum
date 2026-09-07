import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteThread, getThread } from "../api/threadApi";
import { useAuthStore } from "../stores/authStore";
import { type Thread } from "../api/threadApi";
import Layout from "../components/layout/Layout";
import ThreadDetail from "../components/thread/ThreadDetail";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";

export default function ThreadViewPage() {
  const [thread, setThread] = useState<Thread | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const userId = useAuthStore(state => state.userId);
  const canEdit = isAuthenticated && thread?.author._id === userId;

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
          canEdit={canEdit}
          onEdit={openEditing}
          onDelete={deleteCurrentThread}
        />

        <CommentForm />

        <CommentList />
      </div>
    </Layout>
  );
}