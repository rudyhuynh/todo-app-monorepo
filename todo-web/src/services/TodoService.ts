import { fetch } from "../utils/fetch";
import { TodosType } from "../typedefs";

export async function fetchTodos(filter: string) {
  const [data, status] = await fetch<TodosType>("/api/todos?filter=" + filter);
  if (status === 200) {
    return data;
  } else {
    throw new Error("Fail to fetch todo");
  }
}

export async function addTodo(content: string, due: Date | null) {
  const [data, status] = await fetch("/api/todos", {
    method: "post",
    body: JSON.stringify({ content, due }),
  });
  if (status === 200) {
    return data;
  } else {
    throw new Error("Fail to add new todo");
  }
}

export async function deleteTodo(id: number) {
  const [data, status] = await fetch("/api/todos/" + id, {
    method: "delete",
  });
  if (status === 200) {
    return data;
  } else {
    throw new Error("Fail to delete todo");
  }
}

export async function setDoneUndone(id: number, done: boolean) {
  const [data, status] = await fetch("/api/todos", {
    method: "put",
    body: JSON.stringify({ id, done }),
  });
  if (status === 200) {
    return data;
  } else {
    throw new Error("Fail to update todo");
  }
}
