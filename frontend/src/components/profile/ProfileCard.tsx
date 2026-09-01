import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import Card from "../ui/Card";

export default function ProfileCard() {
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        if (token) {
          const res = await axios.get("http://localhost:3000/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserId(res.data.userId)
        console.log(userId)
        }
      }
      catch (err) {
        console.log(err);
      }
    }

    const getUsername = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}`);

        setUsername(res.data.username);
      }
      catch (err) {
        console.log(err);
      }
    }
    
    const getThreads = async () => {
      try {
        const res = await axios.get("http://localhost:3000/profile/threads",
          { headers: { Authorization: `Bearer ${token}` } });

        setThreads(res.data.length);
      }
      catch (err) {
        console.log(err);
      }
    }

    getUserId();
    getUsername();
    getThreads();
  }, [userId, threads]);

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
          <p>Threads: {threads}</p>
          <p>Comments: 42</p>
        </div>
      </div>
    </Card>
  );
}