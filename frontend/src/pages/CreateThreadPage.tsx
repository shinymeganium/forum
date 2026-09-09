import { useState } from "react";
import { useNavigate } from "react-router";
import { postThread } from "../api/threadApi";
import { type ThreadFormData } from "../components/thread/ThreadForm";
import Layout from "../components/layout/Layout";
import ThreadForm from "../components/thread/ThreadForm";

export default function CreateThreadPage() {
  const [threadInputs, setThreadInputs] = useState<ThreadFormData>({
    title: "",
    content: "",
  });
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!threadInputs.title || !threadInputs.content)
      setIsEmpty(true);

    const thread = await postThread(threadInputs.title, threadInputs.content);
    setIsEmpty(false);
    navigate(`/threads/${thread._id}`);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a new Thread</h1>

        <ThreadForm
          thread={threadInputs}
          submitLabel="Post"
          isEmpty={isEmpty}
          setThread={setThreadInputs}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}
