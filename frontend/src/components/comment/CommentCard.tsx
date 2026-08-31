import Card from "../ui/Card";
import Button from "../ui/Button";

export default function CommentCard() {
  return (
    <Card>
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          john • 31.8.2026
        </p>

        <p>
          This is an example comment.
        </p>

        <div className="flex gap-2">
          <Button variant="secondary">
            Edit
          </Button>

          <Button variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}