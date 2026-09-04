import type { Thread } from "../../api/threadApi";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { formatDate } from "../../util/UtilityFunctions";

type ThreadDetailProps = {
  thread: Thread | null;
  openEditForm: () => void;
  deleteThread: () => void;
}

export default function ThreadDetail({
  thread, openEditForm, deleteThread }: ThreadDetailProps) {
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

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={openEditForm}  
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={deleteThread}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}