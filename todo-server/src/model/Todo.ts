import { DataTypes, Model, Op } from "sequelize";
import { sequelize } from "../db";
import { TodoFilter } from "../typedefs";

class Todo extends Model {
  declare id: number;
  declare content: string;
  declare doneAt: Date | null;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
    },
    doneAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Todo",
  }
);

export async function getTodos(filter: TodoFilter): Promise<Todo[]> {
  if (filter === "all") {
    return await Todo.findAll({ order: [["createdAt", "ASC"]] });
  } else if (filter === "done") {
    return await Todo.findAll({
      where: {
        doneAt: {
          [Op.not]: null,
        },
      },
      order: [["createdAt", "ASC"]],
    });
  } else if (filter === "undone") {
    return await Todo.findAll({
      where: {
        doneAt: {
          [Op.is]: null,
        },
      },
      order: [["createdAt", "ASC"]],
    });
  }
  return [];
}

export async function forceSync() {
  await Todo.sync({ force: true });
}

export async function getTodoById(todoId: number) {
  return await Todo.findByPk(todoId);
}

export async function addTodo(content: string, doneAt?: Date) {
  const todo = await Todo.create({ content, doneAt });
  return todo.toJSON();
}

export async function setDone(todoId: number) {
  const todo = await getTodoById(todoId);
  if (todo) {
    todo.doneAt = new Date();
    await todo.save();
  } else {
    throw new Error(`Todo not found. id=${todoId}`);
  }
}

export async function setUndone(todoId: number) {
  const todo = await getTodoById(todoId);
  if (todo) {
    todo.doneAt = null;
    await todo.save();
  } else {
    throw new Error(`Todo not found. id=${todoId}`);
  }
}

export async function destroy(todoId: number) {
  await Todo.destroy({
    where: { id: todoId },
  });
}
