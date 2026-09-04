import { useEffect, useState } from "react";
import { getThreads, type Thread } from "../api/threadApi";
import Layout from "../components/layout/Layout";
import ThreadList from "../components/thread/ThreadList";

export default function FrontPage() {
  const [threads, setThreads] = useState<Thread[] | null>(null);

  useEffect(() => {
    const showThreadsFrontpage = async () => {
      const res = await getThreads();
      setThreads(res);
    };

    showThreadsFrontpage();
  }, []);
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Latest Threads
        </h2>

        <ThreadList threads={threads} />
      </div>
    </Layout>
  );
}