export type TodoFilter = "all" | "done" | "undone";

export type CreateTodoDTO = {
  content: string;
};

export type UpdateTodoDTO = {
  id: number;
  done: boolean;
};

export type TodoQuery = {
  filter: string;
  done_time_range: string;
};
