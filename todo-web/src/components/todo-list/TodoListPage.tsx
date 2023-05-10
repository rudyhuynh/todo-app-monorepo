import "./TodoListPage.css";
import { useState, useEffect, useReducer, useRef } from "react";
import { TodoFilter } from "./TodoFilter";
import type { ActionType, TodoType, TodosType } from "../../typedefs";
import { TodoList, TodoListForwardedRefObject } from "./TodoList";
import { Loader } from "../shared/Loader";
import { TodoForm } from "./TodoForm";
import { fetch } from "../../utils/fetch";

const initialTodos: TodosType = [];
function todosReducer(todos: TodosType, action: ActionType): TodosType {
  switch (action.type) {
    case "set_todos":
      return action.todos;
    case "add_todo":
      return [
        ...todos,
        {
          id: action.id,
          content: action.content,
          due: action.due,
        },
      ];
    case "set_doneAt": {
      const { id, doneAt } = action;
      return todos.map((todo) => ({
        ...todo,
        doneAt: todo.id === id ? doneAt : todo.doneAt,
      }));
    }
    case "delete_todo":
      return todos.filter((todo) => todo.id !== action.id);
  }
  return todos;
}

export const TodoListPage = () => {
  const [filter, setFilter] = useState("all");
  const [shouldShowAddTodo, setShouldShowAddTodo] = useState(false);

  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchTodos() {
      setIsLoading(true);
      try {
        const todos = await fetch("/api/todos?filter=" + filter);
        if (!ignore) dispatch({ type: "set_todos", todos });
        setErrorMessage("");
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
        console.error(e);
      }

      setIsLoading(false);
    }

    fetchTodos();
    return () => {
      ignore = true;
    };
  }, [filter]);

  const onClickDoneUndone = async (id: number, todo: TodoType) => {
    const nextDone = todo.doneAt ? false : true;
    const response = await fetch("http://localhost:3001/api/todos", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        done: nextDone,
      }),
    });
    if (response.status === 200) {
      const { id, doneAt } = await response.json();
      dispatch({ type: "set_doneAt", id, doneAt: doneAt });
    } else {
      alert("Fail to update todo. Please refresh the page.");
    }
  };

  const onClickDelete = (id: number) => {
    //
  };

  const onClickFilter = (filter: string) => {
    setFilter(filter);
  };

  const onClickAddTodo = () => {
    setShouldShowAddTodo(true);
  };

  const shouldScrollToBottomRef = useRef(false);
  const onCloseTodoForm = (addTodoSuccess: boolean) => {
    if (addTodoSuccess) {
      shouldScrollToBottomRef.current = true;
    }

    setShouldShowAddTodo(false);
  };

  const todoListRef = useRef<TodoListForwardedRefObject>(null);
  useEffect(() => {
    if (shouldScrollToBottomRef.current) {
      todoListRef.current!.scrollToBottom();
      shouldScrollToBottomRef.current = false;
    }
  });

  return (
    <>
      <Loader loading={isLoading} />
      <div className="todo-list-app">
        <div className="toolbox">
          <TodoFilter filter={filter} onClickFilter={onClickFilter} />
        </div>

        <div className="card-panel todo-card-panel">
          {errorMessage ? (
            <div className="todo-list-error">
              <span className="red-text ">{errorMessage}</span>
            </div>
          ) : null}
          {!errorMessage ? (
            <TodoList
              ref={todoListRef}
              todos={todos}
              onClickDoneUndone={onClickDoneUndone}
              onClickDelete={onClickDelete}
              disabled={isLoading}
            />
          ) : null}
        </div>
        <button className="btn btn-add-todo" onClick={onClickAddTodo}>
          Add Todo
        </button>
        {shouldShowAddTodo && (
          <TodoForm dispatch={dispatch} onClose={onCloseTodoForm} />
        )}
      </div>
    </>
  );
};
