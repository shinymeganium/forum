import { type Thread } from "../../api/threadApi";
import { formatDate } from "../../util/UtilityFunctions";
import Card from "../ui/Card";
import Button from "../ui/Button";

type ThreadDetailProps = {
  thread: Thread | null;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ThreadDetail({
  thread, canEdit, onEdit, onDelete }: ThreadDetailProps) {
  if (!thread)
    return <div>Loading...</div>
  
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">
            {thread.title}
          </h1>

          <p className="text-sm text-gray-500">
            {thread.author.username} • {formatDate(thread.createdAt)}
          </p>
        </div>

        <p className="leading-relaxed">
          {thread.content}
        </p>

        {canEdit && <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={onEdit}  
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>}
      </div>
    </Card>
  );
}