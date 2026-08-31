import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

export default function CommentForm() {
  return (
    <form className="space-y-3">
      <TextArea placeholder="Write a comment..." />

      <Button type="submit">
        Send Comment
      </Button>
    </form>
  );
}