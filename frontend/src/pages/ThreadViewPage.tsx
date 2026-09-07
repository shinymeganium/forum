import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteThread, getThread, type Thread } from "../api/threadApi";
import { deleteComment, getComments, postComment, type Comment } from "../api/commentApi";
import { useAuthStore } from "../stores/authStore";
import Layout from "../components/layout/Layout";
import ThreadDetail from "../components/thread/ThreadDetail";
import CommentList from "../components/comment/CommentList";
import CommentForm, { type CommentFormData } from "../components/comment/CommentForm";

export default function ThreadViewPage() {
  const [thread, setThread] = useState<Thread | null>(null);
  const [comment, setComment] =
    useState<CommentFormData>({ content: "" });
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const userId = useAuthStore(state => state.userId);
  const canEdit = isAuthenticated && thread?.author._id === userId;
  const canEditComments = isAuthenticated;

  const loadComments = async (id: string) => {
    const comments = await getComments(id);
    setComments(comments);
  };

  const openThreadEditing = () => {
    navigate(`/editThread/${id}`);
  };
  
  const deleteCurrentThread = async () => {
    if (thread) {
      await deleteThread(thread._id);
      navigate("/profile");
    }
  }

  const openCommentEditing = (id:string) => {
    navigate(`/editComment/${id}`);
  };

  const handleCommentSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (thread && userId) {
      await postComment(comment.content, thread._id, userId);
      setComment({ ...comment, content: "" });
      
      await loadComments(thread._id);
    }
  };

  const deleteSelectedComment = async (id: string) => {
    await deleteComment(id);
    if (thread)
      await loadComments(thread._id);
  }

  useEffect(() => {
    const loadThreadAndComments = async () => {
      if (!id) return;

      const thread = await getThread(id);
      setThread(thread);

      await loadComments(id);      
    };

    loadThreadAndComments();
  }, [id]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col gap-5">
        <ThreadDetail
          thread={thread} 
          canEdit={canEdit}
          onEdit={openThreadEditing}
          onDelete={deleteCurrentThread}
        />

        <CommentForm
          comment={comment}
          setComment={setComment}
          submitLabel="Send comment"
          onSubmit={handleCommentSubmit}
        />

        <CommentList
          comments={comments}
          canEdit={canEdit}
          onEdit={openCommentEditing}
          onDelete={deleteSelectedComment}
        />
      </div>
    </Layout>
  );
}