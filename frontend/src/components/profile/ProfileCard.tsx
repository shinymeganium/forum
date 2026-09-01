import { useEffect, useState } from "react";
import { type Profile, getProfile } from "../../api/profileApi";
import Card from "../ui/Card";

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const displayInfo = async () => {
      const res = await getProfile();
      setProfile(res);
    }
    
    displayInfo();
  }, []);

  return (
    <Card>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {profile?.username}
        </h2>

        <p className="text-gray-500">
          Joined {profile?.joined.slice(0, 10)}
        </p>

        <div className="pt-2">
          <p>Threads: {profile?.threads ? profile?.threads : 0}</p>
          <p>Comments: {profile?.comments ? profile?.comments : 0}</p>
        </div>
      </div>
    </Card>
  );
}