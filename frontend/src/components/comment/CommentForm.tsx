import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import type React from "react";

type CommentFormProps = {
  comment: string;
  submitLabel: string;
  setComment: (comment: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export default function CommentForm({
  comment, submitLabel, setComment, onSubmit
}: CommentFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3"
    >
      <TextArea
        placeholder="Write a comment..."
        name="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      <Button type="submit">
        {submitLabel}
      </Button>
    </form>
  );
}