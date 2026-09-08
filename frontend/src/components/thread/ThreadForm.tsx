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
  isEmpty: boolean;
  setThread: (thread: ThreadFormData) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) =>
    Promise<void>;
};

export default function ThreadForm({
  thread, submitLabel, isEmpty, setThread, onSubmit
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

      {isEmpty && <p className="pb-2 font-bold text-red-500">
        Fill both title and post!
      </p>}

      <Button type="submit">
        {submitLabel}
      </Button>
    </form>
  );
}