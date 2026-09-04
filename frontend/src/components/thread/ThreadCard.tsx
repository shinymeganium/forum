import Card from "../ui/Card";

type ThreadCardProps = {
  title: string,
  author: string,
  date: string,
  preview: string,
  comments: number
};

export default function ThreadCard({
  title,
  author,
  date,
  preview,
  comments
}: ThreadCardProps) {
  return (
    <Card>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          by {author} • {date}
        </p>

        <p className="text-gray-700">
          {preview}
        </p>

        <p className="text-sm text-muted-lavender">
          {comments} comments
        </p>
      </div>
    </Card>
  );
}