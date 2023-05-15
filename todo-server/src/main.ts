import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import moment from "moment";
import { testConnection } from "./db";
import * as Todo from "./model/Todo";
import {
  CreateTodoDTO,
  TodoFilter,
  TodoQuery,
  UpdateTodoDTO,
} from "./typedefs";
import { initDb } from "./initDb";
import { getLastWeekRange, getYesterdayRange } from "./utils/timeUtils";

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

const port: number = 3001;

async function main() {
  await testConnection();

  /**
   * Comment or remove this initDb if you don't want to reset the data
   * inside database on next run.
   */
  await initDb();

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
  });

  app.get("/api/todos", async (req: Request, res: Response) => {
    try {
      let { filter, done_time_range } = req.query as TodoQuery;

      if (filter) {
        if (!["all", "done", "undone"].includes(filter)) {
          filter = "all";
        }
        const todos = await Todo.getTodosByFilter(filter as TodoFilter);
        res.json(todos);
      } else if (done_time_range === "yesterday") {
        const [from, to] = getYesterdayRange();
        const todos = await Todo.getTodosByDoneTimeRange(from, to);
        res.json(todos);
      } else if (done_time_range === "last_week") {
        const [from, to] = getLastWeekRange();
        const todos = await Todo.getTodosByDoneTimeRange(from, to);
        res.json(todos);
      } else {
        const todos = await Todo.getTodosByFilter("all");
        res.json(todos);
      }

      if (!["all", "done", "undone"].includes(filter)) {
        filter = "all";
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: (e as any).message });
    }
  });

  app.get("/api/todos/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const todos = await Todo.getTodoById(id);
      res.json(todos);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: (e as any).message });
    }
  });

  /**
   * Add a new todo
   */
  app.post("/api/todos", async (req: Request, res: Response) => {
    try {
      const { content, due } = req.body as CreateTodoDTO;
      const createdTodo = await Todo.addTodo(
        content,
        undefined,
        due ? moment(due).toDate() : undefined
      );
      res.json(createdTodo);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: (e as any).message });
    }
  });

  /**
   * Update a todo.
   */
  app.put("/api/todos", async (req: Request, res: Response) => {
    try {
      const todo = req.body as UpdateTodoDTO;
      console.log("req body", req.body);

      const { id, done } = todo;
      let doneAt = done ? new Date() : null;
      await Todo.setDoneAt(id, doneAt);
      res.json({ id, doneAt });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Fail to update todo" });
    }
  });

  app.delete("/api/todos/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await Todo.destroy(id);
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Fail to update todo" });
    }
  });

  app.listen(port, function () {
    console.log(`Server started at http://localhost:${port} !`);
  });
}

main();
