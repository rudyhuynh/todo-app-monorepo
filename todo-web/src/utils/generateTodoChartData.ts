import moment from "moment";
import { unitOfTime } from "moment";

export function hourMs(hour: number) {
  return hour * 60 * 60 * 1000;
}

export function dayMs(day: number) {
  return day * 24 * 60 * 60 * 1000;
}

export function getYesterdayRange() {
  const thisTime = moment();
  const from = moment(thisTime).subtract(1, "day").startOf("day");
  const to = moment(from).add(1, "day");
  return [from.toDate(), to.toDate()];
}

export function getLastWeekRange() {
  const thisTime = moment();
  const from = moment(thisTime).startOf("week").subtract(7, "day");
  const to = moment(from).add(7, "day");
  return [from.toDate(), to.toDate()];
}

function countTodosPerInterval(todos: any[], intervalString: string) {
  return todos
    .map((todo) => {
      const perInterval = moment(todo.doneAt)
        .startOf(intervalString as unitOfTime.StartOf)
        .valueOf();
      return [perInterval, todo];
    })
    .reduce<{ [key: string]: number }>((results, item) => {
      const [perInterval] = item;

      if (results[perInterval]) results[perInterval]++;
      else results[perInterval] = 1;

      return results;
    }, {});
}

const mapIntervalStringToMs: { [key: string]: number } = {
  day: dayMs(1),
  hour: hourMs(1),
};

export function generateTodoChartData(
  todos: any[],
  begin: Date,
  end: Date,
  intervalString: string
) {
  if (!todos || !todos.length) return [];
  let results = [];
  let current = begin;
  const intervalMs = mapIntervalStringToMs[intervalString];
  const todoCount = countTodosPerInterval(todos, intervalString);

  while (current.getTime() < end.getTime()) {
    const perInterval = moment(current)
      .startOf(intervalString as unitOfTime.StartOf)
      .valueOf();

    results.push([perInterval, todoCount[String(perInterval)] || 0]);
    current = new Date(current.getTime() + intervalMs);
  }

  return results;
}
