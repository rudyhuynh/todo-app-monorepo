import moment from "moment";

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
