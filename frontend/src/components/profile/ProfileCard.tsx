import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import Card from "../ui/Card";

export default function ProfileCard() {
  const [username] = useState(useAuthStore(state => state.username));

  useEffect(() => {
    
  }, []);

  return (
    <Card>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {username}
        </h2>

        <p className="text-gray-500">
          Joined 31.8.2026
        </p>

        <div className="pt-2">
          <p>Threads: {}</p>
          <p>Comments: 42</p>
        </div>
      </div>
    </Card>
  );
}