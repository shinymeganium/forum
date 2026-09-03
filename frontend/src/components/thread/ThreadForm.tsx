import { useState } from "react";
import { useNavigate } from "react-router";
import { postThread } from "../../api/threadApi";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

export default function ThreadForm() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const thread = await postThread(title, post);

      navigate(`/threads/${thread._id}`);
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
       placeholder="Thread title"
       name="title"
       value={title}
       onChange={e => setTitle(e.target.value)}
      />

      <TextArea
        placeholder="Write your post..."
        name="thread"  
        value={post}
        onChange={e => setPost(e.target.value)}
      />

      <Button type="submit">
        Publish Thread
      </Button>
    </form>
  );
}