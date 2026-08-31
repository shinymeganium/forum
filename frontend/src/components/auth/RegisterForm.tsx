import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm() {
  return (
    <form className="space-y-4">
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