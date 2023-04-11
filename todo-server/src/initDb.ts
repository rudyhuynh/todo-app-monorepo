import * as Todo from "./model/Todo";
import { hourMs, dayMs } from "./utils/timeUtils";

const todos = [
  { content: "Learn React Query", doneAt: new Date(Date.now() - hourMs(2)) },
  {
    content: "Create useFetch hook",
  },
  {
    content: "Learn Learn Javascript",
    doneAt: new Date(Date.now() - hourMs(3)),
  },
  {
    content: "Remove useRef of Counter Component",
    doneAt: new Date(Date.now() - hourMs(4)),
  },
  {
    content: "useEffect",
    doneAt: new Date(Date.now() - dayMs(1) - hourMs(4.5)),
  },
  {
    content: "Update NodeJS",
  },
  {
    content: "Fix HTML #2 Issue",
    doneAt: new Date(Date.now() - dayMs(1) - hourMs(3)),
  },
  {
    content: "Fix Flexbox #1 Issue",
    doneAt: new Date(Date.now() - dayMs(2) - hourMs(1)),
  },
  {
    content: "useImperativeHandle",
    doneAt: new Date(Date.now() - dayMs(3) - hourMs(3)),
  },
  {
    content: "Upgrade Material CSS",
    doneAt: new Date(Date.now() - dayMs(3) - hourMs(6)),
  },
  {
    content: "Replace useState by useReducer",
    doneAt: new Date(Date.now() - dayMs(3) - hourMs(7)),
  },
  {
    content: "useUrlSearchParams",
    doneAt: new Date(Date.now() - dayMs(3) - hourMs(7.5)),
  },
  {
    content: "Integrate React Table",
    doneAt: new Date(Date.now() - dayMs(4) - hourMs(3)),
  },
  {
    content: "Checkout Zustand",
    doneAt: new Date(Date.now() - dayMs(4) - hourMs(4)),
  },
  {
    content: "Update Redux Actions",
    doneAt: new Date(Date.now() - dayMs(5) - hourMs(9)),
  },
  {
    content: "Setup Database",
    doneAt: new Date(Date.now() - dayMs(6) - hourMs(3)),
  },
  {
    content: "Refactor TodoApp",
    doneAt: new Date(Date.now() - dayMs(7) - hourMs(3)),
  },
  {
    content: "Write Unit Test",
    doneAt: new Date(Date.now() - dayMs(8) - hourMs(3)),
  },
];

export async function initDb() {
  await Todo.forceSync();
  for (let todo of todos) {
    await Todo.addTodo(todo.content, todo.doneAt);
  }
  console.log(
    "\x1b[32m%s\x1b[0m",
    `Finish inserted ${todos.length} todos into database!`
  );
}
