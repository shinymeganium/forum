import { type Comment } from "../../api/commentApi";
import { formatDate } from "../../util/UtilityFunctions";
import CommentCard from "./CommentCard";

type CommentListProps = {
  comments: Comment[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CommentList({
  comments,
  onEdit,
  onDelete
}: CommentListProps) {
  if (!comments) return <div>Loading...</div>

  if (comments.length === 0)
    return <div>No comments yet</div>;

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentCard
          key={comment._id}
          _id={comment._id}
          content={comment.content}
          author={comment.author.username}
          date={formatDate(comment.createdAt)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}