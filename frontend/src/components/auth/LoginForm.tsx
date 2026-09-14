import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { loginRequest } from "../../api/authApi";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsUsernameEmpty(false);
      setIsPasswordEmpty(false);
      setShowLoginError(false);

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
      if (!username) {
        setIsUsernameEmpty(true);
        return;
      }
      if (!password) {
        setIsPasswordEmpty(true);
        return;
      }

      setShowLoginError(true);
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
        label="Password"
        placeholder="Password"
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
          Login
        </Button>

        <button type="button" className="cursor-pointer" onClick={() => navigate("/")}>Return</button>
      </div>

      {showLoginError && <p className="text-red-500">
        Wrong username or password
      </p>}
    </form>
  );
}