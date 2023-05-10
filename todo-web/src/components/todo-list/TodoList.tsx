import moment from "moment";
import type { TodosType } from "../../typedefs";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";

type TodoListProps = {
  todos: TodosType;
  onClickDoneUndone: Function;
  onClickDelete: Function;
  disabled: boolean;
};

export type TodoListForwardedRefObject = {
  scrollToBottom: () => void;
};

export const TodoList = forwardRef(
  (props: TodoListProps, ref: ForwardedRef<TodoListForwardedRefObject>) => {
    const { todos, onClickDoneUndone, onClickDelete, disabled } = props;

    const scrollElementRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => {
      return {
        scrollToBottom() {
          const scrollElement = scrollElementRef.current!;
          scrollElement.scrollTop = scrollElement.scrollHeight;
        },
      };
    });

    return (
      <div className="todo-list" ref={scrollElementRef}>
        <table>
          <thead>
            <tr>
              <th>Done</th>
              <th>Content</th>
              <th>Due</th>
              <th>Done at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id} className={todo.doneAt ? "todo-done" : ""}>
                  <td>
                    <label>
                      <input
                        className="filled-in"
                        type="checkbox"
                        checked={!!todo.doneAt}
                        onChange={() => onClickDoneUndone(todo.id, todo)}
                      />
                      <span></span>
                    </label>
                  </td>
                  <td>{todo.content}</td>
                  <td>
                    {todo.due ? moment(todo.due).format("YYYY-MM-DD") : ""}
                  </td>
                  <td>
                    {todo.doneAt
                      ? moment(todo.doneAt).format("YYYY-MM-DD HH:mm")
                      : ""}
                  </td>
                  <td>
                    <button
                      disabled={disabled}
                      className="btn-small"
                      onClick={() => onClickDelete(todo.id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);
