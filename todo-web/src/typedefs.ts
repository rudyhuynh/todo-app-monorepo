export type Route = {
  path: string;
  title: string;
  element: JSX.Element;
};

export type Routes = Route[];

export type ActionType = { type: string; [any: string]: any };
export type TodoType = { id: number; content: string; doneAt: Date | null };
export type TodosType = TodoType[];
