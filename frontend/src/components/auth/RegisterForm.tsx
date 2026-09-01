import React, { useState } from "react";
import { registerRequest } from "../../api/authApi";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await registerRequest(username, email, password);

      navigate("/login");
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        placeholder="Username"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <Input
        placeholder="Email"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <Input
        placeholder="Password"
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="primary"
      >
        Register
      </Button>
    </form>
  );
}