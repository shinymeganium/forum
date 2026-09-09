import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { getProfile, getProfileComments, getProfileThreads, type Profile } from "../api/profileApi";
import { deleteComment, type Comment } from "../api/commentApi";
import { type Thread } from "../api/threadApi";
import Layout from "../components/layout/Layout";
import ProfileCard from "../components/profile/ProfileCard";
import ThreadList from "../components/thread/ThreadList";
import CommentList from "../components/comment/CommentList";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const userId = useAuthStore((state) => state.userId);
  const navigate = useNavigate();

  const canEditComment = (comment: Comment): boolean => {
    return comment.author._id === userId;
  };

  const openCommentEditing = (id: string) => {
    navigate(`/editComment/${id}`);
  };

  const displayProfileInfo = async () => {
    const profile = await getProfile();
    setProfile(profile);
  };

  const displayProfileThreads = async () => {
    const threads = await getProfileThreads();
    setThreads(threads);
  };

  const displayProfileComments = async () => {
    const comments = await getProfileComments();
    setComments(comments);
  };

  const deleteSelectedComment = async (id: string) => {
    await deleteComment(id);
    await displayProfileComments();
  };

  useEffect(() => {
    displayProfileInfo();
    displayProfileThreads();
    displayProfileComments();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col gap-5">
        <section>
          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          <ProfileCard profile={profile} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">My Threads</h2>

          {threads.length > 0 && (
            <p className="pb-6 text-lg">Open a thread to manage it.</p>
          )}

          <ThreadList threads={threads} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">My Comments</h2>

          <CommentList
            comments={comments}
            canEdit={canEditComment}
            onEdit={openCommentEditing}
            onDelete={deleteSelectedComment}
          />
        </section>
      </div>
    </Layout>
  );
}
