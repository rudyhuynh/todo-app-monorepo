import { DataTypes, Model, Op, Order } from "sequelize";
import { sequelize } from "../db";
import { TodoFilter } from "../typedefs";
import { dayMs } from "../utils/timeUtils";

class Todo extends Model {
  declare id: number;
  declare content: string;
  declare doneAt: Date | null;
  declare due: Date | null;
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
    due: {
      type: DataTypes.DATE,
      allowNull: true,
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

export async function getTodosByDoneTimeRange(
  from: Date,
  to: Date
): Promise<Todo[]> {
  return await Todo.findAll({
    order: [["doneAt", "ASC"]],
    where: {
      doneAt: {
        [Op.and]: [{ [Op.gte]: from }, { [Op.lt]: to }],
      },
    },
  });
}

export async function getTodosByFilter(filter: TodoFilter): Promise<Todo[]> {
  const order: Order = [["createdAt", "DESC"]];
  if (filter === "all") {
    return await Todo.findAll({ order });
  } else if (filter === "done") {
    return await Todo.findAll({
      where: {
        doneAt: {
          [Op.not]: null,
        },
      },
      order,
    });
  } else if (filter === "undone") {
    return await Todo.findAll({
      where: {
        doneAt: {
          [Op.is]: null,
        },
      },
      order,
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

export async function addTodo(content: string, doneAt?: Date, due?: Date) {
  const todo = await Todo.create({ content, doneAt, due });
  return todo.toJSON();
}

export async function setDoneAt(todoId: number, doneAt: Date | null) {
  const todo = await getTodoById(todoId);
  if (todo) {
    todo.doneAt = doneAt;
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
