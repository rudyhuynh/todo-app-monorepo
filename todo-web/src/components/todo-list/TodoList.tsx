import type { TodosType } from "../../typedefs";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: TodosType;
  onClickDoneUndone: Function;
  onClickDelete: Function;
  disabled: boolean;
};

export const TodoList = (props: TodoListProps) => {
  const { todos, onClickDoneUndone, onClickDelete, disabled } = props;
  return (
    <ul className="collection todo-list">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClickDoneUndone={onClickDoneUndone}
            onClickDelete={onClickDelete}
            disabled={disabled}
          />
        );
      })}
    </ul>
  );
};
