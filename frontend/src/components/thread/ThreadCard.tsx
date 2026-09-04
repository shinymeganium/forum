import { NavLink } from "react-router";
import Card from "../ui/Card";

type ThreadCardProps = {
  _id: string,
  title: string,
  author: string,
  date: string,
  preview: string,
  comments: number
};

export default function ThreadCard({
  _id,
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
          <NavLink
            to={`/threads/${_id}`}
            className="hover:underline"
          >
            {title}
          </NavLink>
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