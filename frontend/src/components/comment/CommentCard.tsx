import Card from "../ui/Card";
import Button from "../ui/Button";

type CommentCardProps = {
  _id: string;
  threadTitle?: string;
  content: string;
  author: string;
  date: string;
  canEdit: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CommentCard({
  _id,
  threadTitle,
  content,
  author,
  date,
  canEdit,
  onEdit,
  onDelete
}: CommentCardProps) {
  return (
    <Card>
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          {author} • {date}
        </p>

        <p className="text-sm text-gray-500">
          {threadTitle && (
            <span>from thread • {threadTitle}</span>
          )}
        </p>

        <p>
          {content}
        </p>

        {canEdit && <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => onEdit(_id)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => onDelete(_id)}
          >
            Delete
          </Button>
        </div>}
      </div>
    </Card>
  );
}