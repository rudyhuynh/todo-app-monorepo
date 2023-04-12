import moment from "moment";
import type { TodoType } from "../../typedefs";

type TodoItemPropsType = {
  todo: TodoType;
  onClickDoneUndone: Function;
  onClickDelete: Function;
  disabled: boolean;
};

export const TodoItem = (props: TodoItemPropsType) => {
  const { todo, onClickDoneUndone, onClickDelete, disabled } = props;

  const renderDoneAt = () => {
    const doneAt = moment(todo.doneAt);
    if (doneAt.isValid()) {
      return (
        <span className="done-at">
          Done at {doneAt.format("YYYY-MM-DD HH:mm")}
        </span>
      );
    }
  };

  return (
    <li className="collection-item text-center todo-item" key={todo.id}>
      <div>
        <div
          style={{
            ...(todo.doneAt && { textDecoration: "line-through" }),
          }}
        >
          {todo.content}
        </div>
        {renderDoneAt()}
      </div>
      <button
        disabled={disabled}
        className="btn-small"
        onClick={() => onClickDoneUndone(todo.id, todo)}
      >
        {todo.doneAt ? "Undone" : "Done"}
      </button>
      &nbsp;
      <button
        disabled={disabled}
        className="btn-small"
        onClick={() => onClickDelete(todo.id)}
      >
        <i className="material-icons">delete</i>
      </button>
    </li>
  );
};
