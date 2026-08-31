import Layout from "../components/layout/Layout";
import ThreadForm from "../components/thread/ThreadForm";

export default function CreateThreadPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Create Thread
        </h1>

        <ThreadForm />
      </div>
    </Layout>
  );
}