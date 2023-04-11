import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { testConnection } from "./db";
import * as Todo from "./model/Todo";
import { CreateTodoDTO, TodoFilter, UpdateTodoDTO } from "./typedefs";
import { initDb } from "./initDb";

const app: Application = express();

app.use(cors);
app.use(bodyParser.json());

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
      let filter = req.query.filter;

      if (!["all", "done", "undone"].includes(filter as string)) {
        filter = "all";
      }

      const todos = await Todo.getTodos(filter as TodoFilter);
      res.json(todos);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: (e as any).message });
    }
  });

  app.get("/api/todos/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todos = await Todo.getTodoById(id);
    res.json(todos);
  });

  app.post("/api/todos", async (req: Request, res: Response) => {
    const todo = req.body as CreateTodoDTO;
    const createdTodo = await Todo.addTodo(todo.content);
    res.json(createdTodo);
  });

  app.put("/api/todos", async (req: Request, res: Response) => {
    const todo = req.body as UpdateTodoDTO;
    // only allow set done / undone for now
    if (todo.done) {
      await Todo.setDone(todo.id);
    } else {
      await Todo.setUndone(todo.id);
    }
  });

  app.delete("/api/todos/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await Todo.destroy(id);
  });

  app.listen(port, function () {
    console.log(`Server started at http://localhost:${port} !`);
  });
}

main();
