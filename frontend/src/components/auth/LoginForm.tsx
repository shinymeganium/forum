import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();


    try {
      const res = await axios.post("http://localhost:3000/login",
        { username, password }
      );

      //console.log(res.data);

      localStorage.setItem("token", res.data.token);

      navigate("/profile");
    }
    catch (err) {
      console.log(err)
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        placeholder="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="primary"
      >
        Login
      </Button>
    </form>
  );
}