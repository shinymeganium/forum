import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getThread, putThread } from "../api/threadApi";
import { type ThreadFormData } from "../components/thread/ThreadForm";
import Layout from "../components/layout/Layout";
import ThreadForm from "../components/thread/ThreadForm";

export default function EditThreadPage() {
  const [thread, setThread] = useState<ThreadFormData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (id && thread) {
      await putThread(id, thread.title, thread.content);
      navigate(`/threads/${id}`);
    }
  };

  useEffect(() => {
    const getEditedThread = async () => {
      if (!id) return;

      const res = await getThread(id);
      setThread({ title: res.title, content: res.content });
    };

    getEditedThread();
  }, [id]);

  if (!thread)
    return <div>Loading...</div>;
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Edit Thread
        </h1>

        <ThreadForm
          thread={thread}
          submitLabel="Save"
          setThread={setThread}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}