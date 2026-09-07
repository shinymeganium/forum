import Layout from "../components/layout/Layout";
import CommentForm, { type CommentFormData } from "../components/comment/CommentForm";
import { useEffect, useState } from "react";
import { getComment, putComment } from "../api/commentApi";
import { useNavigate, useParams } from "react-router";

export default function EditCommentPage() {
  const [comment, setComment] =
    useState<CommentFormData | null>(null);
  const [threadId, setThreadId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    if (!id || !comment) return;

    e.preventDefault();

    await putComment(id, comment.content);
    navigate(`/threads/${threadId}`);
  };

  useEffect(() => {
    const getEditedComment = async () => {
      if (!id) return;

      const comment = await getComment(id);
      setComment({ content: comment.content });
      setThreadId(comment.threadId);
    };

    getEditedComment();
  }, []);

  if (!comment) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Edit Comment
        </h1>

        
        <CommentForm
          comment={comment}
          submitLabel="Save comment"
          setComment={setComment}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}