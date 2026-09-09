import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getComment, putComment } from "../api/commentApi";
import Layout from "../components/layout/Layout";
import CommentForm, { type CommentFormData } from "../components/comment/CommentForm";

export default function EditCommentPage() {
  const [comment, setComment] = useState<CommentFormData>({ content: "" });
  const [isEmpty, setIsEmpty] = useState(false);
  const [threadId, setThreadId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getEditedComment = async (id: string) => {
    const comment = await getComment(id);
    setComment({ content: comment.content });
    setThreadId(comment.threadId._id);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    if (!comment.content) setIsEmpty(true);
    
    await putComment(id, comment.content);
    setIsEmpty(false);
    navigate(`/threads/${threadId}`);
  };

  useEffect(() => {
    if (id)
      getEditedComment(id);
  }, []);

  if (!comment) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Comment</h1>

        <CommentForm
          comment={comment}
          submitLabel="Save comment"
          isEmpty={isEmpty}
          setComment={setComment}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}
