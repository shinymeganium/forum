import { type Thread } from "../../api/threadApi";
import ThreadCard from "./ThreadCard";
import { formatDate, truncateText } from "../../util/UtilityFunctions";

type ThreadListProps = {
  threads: Thread[] | null;
};

export default function ThreadList({ threads }: ThreadListProps) {
  return (
    <div className="space-y-4">
      {threads && threads.length > 0 && threads.map(thread => (
        <ThreadCard
          key={thread._id}
          _id={thread._id}
          title={thread.title}
          author={thread.author.username}
          date={formatDate(thread.createdAt)}
          preview={truncateText(thread.content, 150)}
          comments={0}
        />
      ))}
    </div>
  );
}