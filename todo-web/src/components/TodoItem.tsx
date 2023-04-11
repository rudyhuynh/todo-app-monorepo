import type { TodoType } from "../typedefs";

type TodoItemPropsType = {
  todo: TodoType;
  onClickDoneUndone: Function;
  onClickDelete: Function;
};

export const TodoItem = (props: TodoItemPropsType) => {
  const { todo, onClickDoneUndone, onClickDelete } = props;
  return (
    <li className="collection-item text-center todo-item" key={todo.id}>
      <div
        style={{
          ...(todo.doneAt && { textDecoration: "line-through" }),
        }}
      >
        {todo.content}
      </div>
      <button className="btn-small" onClick={() => onClickDoneUndone(todo.id)}>
        {todo.doneAt ? "Undone" : "Done"}
      </button>
      &nbsp;
      <button className="btn-small" onClick={() => onClickDelete(todo.id)}>
        <i className="material-icons">delete</i>
      </button>
    </li>
  );
};
