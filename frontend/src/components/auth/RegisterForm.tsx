import React, { useState } from "react";
import { registerRequest } from "../../api/authApi";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [showRegisterError, setShowRegisterError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsUsernameEmpty(false);
      setIsEmailEmpty(false);
      setIsPasswordEmpty(false);
      setShowRegisterError(false);

      await registerRequest(username, email, password);

      navigate("/login");
    }
    catch (err) {
      if (!username) {
        setIsUsernameEmpty(true);
        return;
      }
      if (!email) {
        setIsEmailEmpty(true);
        return;
      }
      if (!password) {
        setIsPasswordEmpty(true);
        return;
      }

      setShowRegisterError(true);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        placeholder="Username"
        id="username"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      {isUsernameEmpty && <p className="text-red-500">
        Username is needed
      </p>}

      <Input
        placeholder="Email"
        label="Email"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {isEmailEmpty && <p className="text-red-500">
        Email is needed
      </p>}

      <Input
        placeholder="Password"
        label="Password"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {isPasswordEmpty && <p className="text-red-500">
        Password is needed
      </p>}

      <div className="flex justify-between">
        <Button
          type="submit"
          variant="primary"
        >
          Register
        </Button>

        <button type="button" className="cursor-pointer" onClick={() => navigate("/")}>
          Return
        </button>
      </div>

      {showRegisterError && <p className="text-red-500">
        Something went wrong. Please try again.
      </p>}
    </form>
  );
}