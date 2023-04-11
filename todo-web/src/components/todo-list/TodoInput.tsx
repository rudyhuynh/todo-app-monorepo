import { useState } from "react";

type TodoInputPropsType = {
  onCreate: (content: string) => void;
};

export const TodoInput = ({ onCreate }: TodoInputPropsType) => {
  const [content, setContent] = useState("");

  return (
    <form
      className="todo-add"
      onSubmit={(e) => {
        e.preventDefault();
        onCreate(content);
        setContent("");
      }}
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type to add new todo"
      />
    </form>
  );
};
