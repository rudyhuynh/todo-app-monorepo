import { useState } from "react";

type TodoInputPropsType = {
  onCreate: (content: string) => void;
  disabled: boolean;
};

export const TodoInput = ({ onCreate, disabled }: TodoInputPropsType) => {
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
        disabled={disabled}
      />
    </form>
  );
};
