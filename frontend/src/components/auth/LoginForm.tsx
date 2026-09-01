import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { loginRequest } from "../../api/authApi";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await loginRequest(username, password);
      localStorage.setItem("token", res.token);

      login(
        res.token,
        res.userId,
        res.username,
        res.role
      );
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