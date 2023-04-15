import "./TodoListPage.css";
import { useState, useReducer } from "react";
import { TodoFilter } from "./TodoFilter";
import type { ActionType, TodoType, TodosType } from "../../typedefs";
import { TodoList } from "./TodoList";
import { Loader } from "../shared/Loader";
import { TodoInput } from "./TodoInput";
import { useFetch } from "../../hooks/useFetch";
import { useUrlSearchParam } from "../../hooks/useUrlSearchParam";

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
          doneAt: null,
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
  // const [filter, setFilter] = useState("all");

  const [filter, setFilter] = useUrlSearchParam("filter", "all");

  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  const { isLoading, errorMessage } = useFetch(
    "/api/todos?filter=" + filter,
    (todos) => dispatch({ type: "set_todos", todos })
  );

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
              disabled={isLoading}
            />
          ) : null}
        </div>
        <TodoInput onCreate={onCreateTodo} disabled={isLoading} />
      </div>
    </>
  );
};
