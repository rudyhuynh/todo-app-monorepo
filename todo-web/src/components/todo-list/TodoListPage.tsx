import "./TodoListPage.css";
import { useState, useReducer, useEffect } from "react";
import { TodoFilter } from "./TodoFilter";
import type { ActionType, TodoType, TodosType } from "../../typedefs";
import { TodoList } from "./TodoList";
import { Loader } from "../shared/Loader";
import { TodoForm } from "./TodoForm";
import * as TodoService from "../../services/TodoService";

const initialTodos: TodosType = [];
function todosReducer(todos: TodosType, action: ActionType): TodosType {
  switch (action.type) {
    case "set_todos":
      return action.todos;
    case "add_todo":
      return [
        {
          id: action.id,
          content: action.content,
          due: action.due,
        },
        ...todos,
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
        const todos = await TodoService.fetchTodos(filter);
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
    try {
      const updatedTodo = await TodoService.setDoneUndone(id, nextDone);
      dispatch({ type: "set_doneAt", id, doneAt: (updatedTodo as any).doneAt });
    } catch (e) {
      alert((e as any).message);
    }
  };

  const onClickDelete = async (id: number) => {
    await TodoService.deleteTodo(id);
    dispatch({ type: "delete_todo", id });
  };

  const onClickFilter = (filter: string) => {
    setFilter(filter);
  };

  const onClickAddTodo = () => {
    setShouldShowAddTodo(true);
  };

  const onCloseTodoForm = (addedTodo?: TodoType) => {
    if (addedTodo) {
      dispatch({
        type: "add_todo",
        id: addedTodo.id,
        content: addedTodo.content,
        due: addedTodo.due,
      });
    }

    setShouldShowAddTodo(false);
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
        <button className="btn btn-add-todo" onClick={onClickAddTodo}>
          Add Todo
        </button>
        {shouldShowAddTodo && <TodoForm onClose={onCloseTodoForm} />}
      </div>
    </>
  );
};
