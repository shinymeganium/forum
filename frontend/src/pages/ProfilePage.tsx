import { useEffect, useState } from "react";
import { getProfile, getProfileThreads } from "../api/profileApi";
import { type Profile } from "../api/profileApi";
import { type Thread } from "../api/threadApi";
import Layout from "../components/layout/Layout";
import ProfileCard from "../components/profile/ProfileCard";
import ThreadList from "../components/thread/ThreadList";
import CommentList from "../components/comment/CommentList";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [threads, setThreads] = useState<Thread[] | null>(null);
  
  useEffect(() => {
    const displayProfileInfo = async () => {
      const res = await getProfile();
      setProfile(res);
    };

    const displayProfileThreads = async () => {
      const res = await getProfileThreads();
      setThreads(res);
    };
    
    displayProfileInfo();
    displayProfileThreads();
  }, []);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col gap-5">
        <section>
          <h2 className="text-2xl font-bold mb-4">
          Profile
          </h2>

          <ProfileCard profile={profile} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            My Threads
          </h2>

          <ThreadList threads={threads} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            My Comments
          </h2>

          <CommentList />
        </section>
      </div>
    </Layout>
  );
}