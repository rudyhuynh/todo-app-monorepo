import "./TodoListPage.css";
import { useState, useCallback } from "react";
import { TodoFilter } from "./TodoFilter";
import type { ActionType, TodoType, TodosType } from "../../typedefs";
import { TodoList } from "./TodoList";
import { Loader } from "../shared/Loader";
import { TodoForm } from "./TodoForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTodo,
  fetchTodos,
  setDoneUndone,
} from "../../services/TodoService";

// const initialTodos: TodosType = [];
// function todosReducer(todos: TodosType, action: ActionType): TodosType {
//   switch (action.type) {
//     case "set_todos":
//       return action.todos;
//     case "add_todo":
//       return [
//         ...todos,
//         {
//           id: action.id,
//           content: action.content,
//           due: action.due,
//         },
//       ];
//     case "set_doneAt": {
//       const { id, doneAt } = action;
//       return todos.map((todo) => ({
//         ...todo,
//         doneAt: todo.id === id ? doneAt : todo.doneAt,
//       }));
//     }
//     case "delete_todo":
//       return todos.filter((todo) => todo.id !== action.id);
//   }
//   return todos;
// }

export const TodoListPage = () => {
  const [filter, setFilter] = useState("all");
  const [shouldShowAddTodo, setShouldShowAddTodo] = useState(false);

  // const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => fetchTodos(filter),
    initialData: [],
  });

  const errorMessage = error instanceof Error ? error.message : "";

  const deleteTodoMutation = useMutation(deleteTodo);

  const onClickDoneUndone = async (id: number, todo: TodoType) => {
    const nextDone = todo.doneAt ? false : true;
    try {
      await setDoneUndone(id, nextDone);
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      // dispatch({ type: "set_doneAt", id, doneAt: doneAt });
    } catch (e) {
      alert((e as any).message);
    }
  };

  const onClickDelete = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
    await queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const onClickFilter = (filter: string) => {
    setFilter(filter);
  };

  const onClickAddTodo = () => {
    setShouldShowAddTodo(true);
  };

  const onCloseTodoForm = () => {
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
              disabled={isLoading || deleteTodoMutation.isLoading}
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
