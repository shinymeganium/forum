import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getThread, putThread } from "../api/threadApi";
import Layout from "../components/layout/Layout";
import ThreadForm, { type ThreadFormData } from "../components/thread/ThreadForm";

export default function EditThreadPage() {
  const [thread, setThread] = useState<ThreadFormData>({
    title: "",
    content: ""
  });
  const [isEmpty, setIsEmpty] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getEditedThread = async (id: string) => {
    const thread = await getThread(id);
    setThread({ title: thread.title, content: thread.content });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    if (thread.title || thread.content) setIsEmpty(true);

    await putThread(id, thread.title, thread.content);
    setIsEmpty(false);
    navigate(`/threads/${id}`);
  };

  useEffect(() => {
    if (id)
      getEditedThread(id);
  }, [id]);

  if (!thread) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Thread</h1>

        <ThreadForm
          thread={thread}
          submitLabel="Save"
          isEmpty={isEmpty}
          setThread={setThread}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}
