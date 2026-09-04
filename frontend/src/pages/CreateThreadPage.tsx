import { useState } from "react";
import { useNavigate } from "react-router";
import { postThread } from "../api/threadApi";
import { type ThreadFormData } from "../components/thread/ThreadForm";
import Layout from "../components/layout/Layout";
import ThreadForm from "../components/thread/ThreadForm";

export default function CreateThreadPage() {
  const [threadInputs, setThreadInputs] =
    useState<ThreadFormData>({ title: "", content: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = await postThread(threadInputs.title, threadInputs.content);
    navigate(`/threads/${ post._id}`);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Create a new Thread
        </h1>

        <ThreadForm
          thread={threadInputs}
          submitLabel="Post"
          setThread={setThreadInputs}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}