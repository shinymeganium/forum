import { useState } from "react";
import { registerRequest } from "../../api/authApi";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = registerRequest;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Username"
        label="Username"
      />

      <Input
        type="email"
        placeholder="Email"
        label="Email"
      />

      <Input
        type="password"
        placeholder="Password"
        label="Password"
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