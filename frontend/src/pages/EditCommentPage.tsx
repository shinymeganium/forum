import Layout from "../components/layout/Layout";
import CommentForm from "../components/comment/CommentForm";
import { useEffect, useState } from "react";
import { getComment, putComment, type Comment } from "../api/commentApi";
import { useParams } from "react-router";

export default function EditCommentPage() {
  const [comment, setComment] = useState<Comment | null>(null);
  const { id } = useParams();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (comment)
    //   const editedComment = await putComment(comment?._id, comment?.content);
  };

  useEffect(() => {
    const loadComment = async () => {
      if (!id) return;

      const openComment = await getComment(id);
      if (openComment)
        setComment(openComment);
    }

    loadComment();
  }, []);

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