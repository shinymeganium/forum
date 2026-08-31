import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

export default function ThreadForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Thread title" />

      <TextArea placeholder="Write your post..." />

      <Button type="submit">
        Publish Thread
      </Button>
    </form>
  );
}