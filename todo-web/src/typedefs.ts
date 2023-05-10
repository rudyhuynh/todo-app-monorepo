export type Route = {
  path: string;
  title: string;
  element: JSX.Element;
};

export type Routes = Route[];

export type ActionType = { type: string; [any: string]: any };
export type TodoType = {
  id: number;
  content: string;
  due?: Date;
  doneAt?: Date;
};
export type TodosType = TodoType[];

// export type NewTodo = {
//   content: string;
//   due?: Date;
// };
