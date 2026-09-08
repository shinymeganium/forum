import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

export type CommentFormData = {
  content: string;
};

type CommentFormProps = {
  comment: CommentFormData;
  submitLabel: string;
  isEmpty: boolean;
  setComment: (comment: CommentFormData) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export default function CommentForm({
  comment, submitLabel, isEmpty, setComment, onSubmit
}: CommentFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3"
    >
      <TextArea
        placeholder="Write a comment..."
        name="comment"
        value={comment.content}
        onChange={e => setComment({
          ...comment, content: e.target.value })}
      />

      {isEmpty && <p className="pb-2 font-bold text-red-500">
        Fill out a comment!
      </p>}

      <Button type="submit">
        {submitLabel}
      </Button>
    </form>
  );
}