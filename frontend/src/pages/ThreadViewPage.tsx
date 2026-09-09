import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { deleteThread, getThread, type Thread } from "../api/threadApi";
import { deleteComment, getComments, postComment, type Comment } from "../api/commentApi";
import Layout from "../components/layout/Layout";
import ThreadDetail from "../components/thread/ThreadDetail";
import CommentList from "../components/comment/CommentList";
import CommentForm, { type CommentFormData } from "../components/comment/CommentForm";

export default function ThreadViewPage() {
  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<CommentFormData>({ content: "" });
  const [isNewCommentEmpty, setIsNewCommentEmpty] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.userId);
  const canEdit = isAuthenticated && thread?.author._id === userId;
  const { id } = useParams();
  const navigate = useNavigate();

  const canEditComment = (comment: Comment): boolean => {
    return isAuthenticated && comment.author._id === userId;
  };

  const loadThread = async (id: string) => {
    const thread = await getThread(id);
    setThread(thread);
  };

  const loadComments = async (id: string) => {
    const comments = await getComments(id);
    setComments(comments);
  };

  const openThreadEditing = () => {
    navigate(`/editThread/${id}`);
  };

  const openCommentEditing = (id: string) => {
    navigate(`/editComment/${id}`);
  };

  const deleteCurrentThread = async () => {
    if (thread) {
      await deleteThread(thread._id);
      navigate("/profile");
    }
  };

  const deleteSelectedComment = async (id: string) => {
    await deleteComment(id);
    if (thread) await loadComments(thread._id);
  };

  const handleCommentSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!thread) return;

    if (!userId) return;

    if (!newComment.content) setIsNewCommentEmpty(true);

    await postComment(newComment.content, thread._id, userId);
    setNewComment({ ...newComment, content: "" });
    setIsNewCommentEmpty(false);

    await loadComments(thread._id);
  };

  useEffect(() => {
    if (!id) return;

    loadThread(id);
    loadComments(id);
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
          comment={newComment}
          setComment={setNewComment}
          submitLabel="Send comment"
          isEmpty={isNewCommentEmpty}
          onSubmit={handleCommentSubmit}
        />

        <CommentList
          comments={comments}
          canEdit={canEditComment}
          onEdit={openCommentEditing}
          onDelete={deleteSelectedComment}
        />
      </div>
    </Layout>
  );
}
