import ThreadCard from "./ThreadCard";

const threads = [
  {
    id: 1,
    title: "Learning React",
    author: "john",
    date: "31.8.2026",
    preview: "I'm learning React and wondering how hooks work...",
    commentCount: 4,
  },
  {
    id: 2,
    title: "MongoDB Question",
    author: "emma",
    date: "30.8.2026",
    preview: "What is the best way to structure my collections?",
    commentCount: 7,
  },
];

export default function ThreadList() {
  return (
    <div className="space-y-4">
      {threads.map(thread => (
        <ThreadCard
          key={thread.id}
          title={thread.author}
          author={thread.author}
          date={thread.date}
          preview={thread.preview}
          commentCount={thread.commentCount}
        />
      ))}
    </div>
  );
}