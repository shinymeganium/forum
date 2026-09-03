import { useEffect, useState } from "react";
import { type Thread, getThreads } from "../../api/threadApi";
import ThreadCard from "./ThreadCard";
import { formatDate, truncateText } from "../../util/UtilityFunctions";

export default function ThreadList() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const showThreads = async () => {
      const res = await getThreads();
      setThreads(res);
    };

    showThreads();
  }, []);

  console.log(threads)

  return (
    <div className="space-y-4">
      {threads.map(thread => (
        <ThreadCard
          key={thread._id}
          title={thread.title}
          author={thread.author.username}
          date={formatDate(thread.createdAt)}
          preview={truncateText(thread.content, 50)}
          commentCount={0}
        />
      ))}
    </div>
  );
}