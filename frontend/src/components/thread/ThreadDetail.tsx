import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ThreadDetail() {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">
            Learning React
          </h1>

          <p className="text-sm text-gray-500">
            john • 31.8.2026
          </p>
        </div>

        <p className="leading-relaxed">
          This is the content of the thread.
          Here users can read the full post.
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