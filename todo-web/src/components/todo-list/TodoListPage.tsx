import "./TodoListApp.css";
import { useState, useEffect } from "react";
import { TodoFilter } from "./TodoFilter";
import type { TodosType } from "../../typedefs";
import { TodoList } from "./TodoList";
import { Loader } from "../shared/Loader";
import { TodoInput } from "./TodoInput";

const initialTodos: TodosType = [];

export const TodoListPage = () => {
  const [filter, setFilter] = useState("all");

  const [todos, setTodos] = useState(initialTodos);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchTodos() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/api/todos?filter=" + filter
        );
        const todos = await response.json();
        if (!ignore) setTodos(todos as TodosType);
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

  const onClickDoneUndone = (id: number) => {
    //
  };

  const onClickDelete = (id: number) => {
    //
  };

  const onClickFilter = (filter: string) => {
    setFilter(filter);
  };

  const onCreateTodo = (content: string) => {
    //
  };

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
              todos={todos}
              onClickDoneUndone={onClickDoneUndone}
              onClickDelete={onClickDelete}
            />
          ) : null}
        </div>
        <TodoInput onCreate={onCreateTodo} />
      </div>
    </>
  );
};
