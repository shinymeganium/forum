import { useParams } from "react-router";
import Layout from "../components/layout/Layout";
import ThreadDetail from "../components/thread/ThreadDetail";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";

export default function ThreadViewPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col gap-5">
        <ThreadDetail />

        <CommentForm />

        <CommentList />
      </div>
    </Layout>
  );
}