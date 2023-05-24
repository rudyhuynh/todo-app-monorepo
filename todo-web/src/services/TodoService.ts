import { fetch } from "../utils/fetch";
import { TodoType, TodosType } from "../typedefs";
import moment from "moment";

type FetchTodoResponse = Array<{
  id: number;
  content: string;
  doneAt: string | null;
  due: string | null;
}>;
export async function fetchTodos(filter: string): Promise<TodosType> {
  const [data, status] = await fetch<FetchTodoResponse>(
    "/api/todos?filter=" + filter
  );
  if (status === 200) {
    return data.map<TodoType>((item) => ({
      id: item.id,
      content: item.content,
      ...(item.due && { due: moment(item.due).toDate() }),
      ...(item.doneAt && { doneAt: moment(item.doneAt).toDate() }),
    }));
  } else {
    throw new Error("Fail to fetch todo");
  }
}

export async function addTodo(content: string, due?: Date | null) {
  const [data, status] = await fetch("/api/todos", {
    method: "post",
    body: JSON.stringify({ content, ...(due && { due }) }),
  });
  if (status === 200) {
    const { id, content, due } = (data as any) || {};
    const todo: TodoType = {
      id: id,
      content: content,
      ...(due && { due: moment(due).toDate() }),
    };
    return todo;
  } else {
    throw new Error("Fail to add new todo");
  }
}

type PutTodoResponse = {
  id: number;
  doneAt: string | null;
};
export async function setDoneUndone(id: number, done: boolean) {
  const [data, status] = await fetch<PutTodoResponse>("/api/todos", {
    method: "put",
    body: JSON.stringify({ id, done }),
  });
  if (status === 200) {
    return data.doneAt;
  } else {
    throw new Error("Fail to update todo");
  }
}

export async function deleteTodo(id: number) {
  const [, status] = await fetch("/api/todos/" + id, {
    method: "delete",
  });
  if (status === 200) {
    return true;
  } else {
    throw new Error("Fail to delete todo");
  }
}
