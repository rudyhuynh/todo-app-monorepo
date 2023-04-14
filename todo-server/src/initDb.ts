import * as Todo from "./model/Todo";
import moment from "moment";

const startOfYesterday = moment().subtract(1, "day").startOf("day");
const startOfLastWeek = moment().subtract(7, "day").startOf("week");

const todos = [
  {
    /**
     * Created a todo done today, just in case user run
     * the server over midnight
     */
    content: "Setup eslint react",
    doneAt: moment().startOf("day").add(8, "hour").toDate(),
  },
  {
    /**
     * Created a todo done this week, just in case user run
     * the server over midnight that is end of a week.
     */
    content: "Learn exhaustive deps eslint rule",
    doneAt: moment().startOf("week").add(8, "hour").toDate(),
  },
  {
    content: "Revert branch 'todo-experiment'",
    doneAt: moment(startOfYesterday).add(9, "hour").toDate(),
  },
  {
    content: "Learn React Query",
    doneAt: moment(startOfYesterday).add(11, "hour").toDate(),
  },
  {
    content: "Create useFetch hook",
  },
  {
    content: "Setup monorepo",
    doneAt: moment(startOfYesterday).add(11, "hour").toDate(),
  },
  {
    content: "Migrate to Jest",
    doneAt: moment(startOfYesterday).add(12, "hour").toDate(),
  },
  {
    content: "Fix BUG-19373",
    doneAt: moment(startOfYesterday).add(13, "hour").toDate(),
  },
  {
    content: "Remove useRef of Counter Component",
    doneAt: moment(startOfYesterday).add(15, "hour").toDate(),
  },
  {
    content: "useEffect",
    doneAt: moment(startOfLastWeek).add(1, "day").toDate(),
  },
  {
    content: "Update NodeJS",
  },
  {
    content: "Fix HTML #2 Issue",
    doneAt: moment(startOfLastWeek).add(3, "day").toDate(),
  },
  {
    content: "Fix Flexbox #1 Issue",
    doneAt: moment(startOfLastWeek).add(3, "day").toDate(),
  },
  {
    content: "useImperativeHandle",
    doneAt: moment(startOfLastWeek).add(3, "day").toDate(),
  },
  {
    content: "Upgrade Material CSS",
    doneAt: moment(startOfLastWeek).add(4, "day").toDate(),
  },
  {
    content: "Replace useState by useReducer",
    doneAt: moment(startOfLastWeek).add(4, "day").toDate(),
  },
  {
    content: "useUrlSearchParams",
    doneAt: moment(startOfLastWeek).add(4, "day").toDate(),
  },
  {
    content: "Integrate React Table",
    doneAt: moment(startOfLastWeek).add(4, "day").toDate(),
  },
  {
    content: "Checkout Zustand",
    doneAt: moment(startOfLastWeek).add(5, "day").toDate(),
  },
  {
    content: "Update Redux Actions",
    doneAt: moment(startOfLastWeek).add(5, "day").toDate(),
  },
  {
    content: "Setup Database",
    doneAt: moment(startOfLastWeek).add(5, "day").toDate(),
  },
  {
    content: "Refactor TodoApp",
    doneAt: moment(startOfLastWeek).add(6, "day").toDate(),
  },
  {
    content: "Write Unit Test",
    doneAt: moment(startOfLastWeek).add(5, "day").toDate(),
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
