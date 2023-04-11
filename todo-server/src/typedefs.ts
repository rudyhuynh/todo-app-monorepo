export type TodoFilter = "all" | "done" | "undone";
export type CreateTodoDTO = {
  content: string;
};

export type UpdateTodoDTO = {
  id: number;
  done: boolean;
};
