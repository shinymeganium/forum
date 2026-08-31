import Layout from "../components/layout/Layout";
import ThreadList from "../components/thread/ThreadList";

export default function FrontPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Latest Threads
        </h2>

        <ThreadList />
      </div>
    </Layout>
  );
}