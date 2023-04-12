import "./AnalyticsPage.css";
import { useEffect, useState } from "react";
import { TodosType } from "../../typedefs";
import { TodoChart } from "./TodoChart";

type TimeRangeOption = {
  value: string;
  label: string;
};

const timeRangeOptions: TimeRangeOption[] = [
  {
    value: "yesterday",
    label: "Yesterday",
  },
  {
    value: "last_week",
    label: "Last Week (Sun - Sat)",
  },
];

export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("yesterday");

  const [todos, setTodos] = useState<TodosType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchTodos() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/api/todos?done_time_range=" + timeRange
        );
        const todos = await response.json();
        if (!ignore) {
          setTodos(todos as TodosType);
        }
        setErrorMessage("");
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
        console.error(e);
      }
      setIsLoading(false);
    }

    fetchTodos();
    return () => {
      ignore = true;
    };
  }, [timeRange]);

  const onChangeTimeRange = (value: string) => {
    setTimeRange(value);
  };

  return (
    <div className="analytics-page row">
      <div className="analytics-option-wrapper">
        <div className="label">Show done todos of</div>
        <div>
          <select
            value={timeRange}
            onChange={(e) => onChangeTimeRange(e.target.value)}
            disabled={isLoading}
          >
            {timeRangeOptions.map(({ value, label }) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="analytics-chart-wrapper">
        {!errorMessage ? (
          <TodoChart todos={todos} doneTimeRange={timeRange} />
        ) : null}
        {errorMessage ? <span className="red-text">errorMessage</span> : null}
      </div>
    </div>
  );
};
