import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

export type ThreadFormData = {
  title: string;
  content: string;
};

type ThreadFormProps = {
  thread: ThreadFormData;
  submitLabel: string;
  setThread: (thread: ThreadFormData) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) =>
    Promise<void>;
};

export default function ThreadForm({
  thread, submitLabel, setThread, onSubmit
}: ThreadFormProps) {
  
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <Input
       placeholder="Thread title"
       name="title"
       value={thread.title}
       onChange={e => setThread({
        ...thread, title: e.target.value })}
      />

      <TextArea
        placeholder="Write your post..."
        name="thread"  
        value={thread.content}
        onChange={e => setThread({
          ...thread, content: e.target.value })}
      />

      <Button type="submit">
        {submitLabel}
      </Button>
    </form>
  );
}