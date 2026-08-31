import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <Input
        label="Username"
        placeholder="Username"
      />

      <Input
        type="password"
        label="Password"
        placeholder="Password"
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