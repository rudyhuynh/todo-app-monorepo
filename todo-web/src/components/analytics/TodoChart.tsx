import { useRef, useEffect } from "react";
import { TodosType } from "../../typedefs";
import HighCharts, { Options } from "highcharts";
import {
  generateTodoChartData,
  getLastWeekRange,
  getYesterdayRange,
} from "../../utils/generateTodoChartData";

const mapTimeRangeToGran = {
  yesterday: "hour",
  last_week: "day",
};

const timezoneOffset = new Date().getTimezoneOffset();

function generateChart(
  chartElement: HTMLElement,
  todos: any[],
  doneTimeRange: string
) {
  let begin, end, intervalString;
  if (doneTimeRange === "yesterday") {
    [begin, end] = getYesterdayRange();
    intervalString = "hour";
  } else if (doneTimeRange === "last_week") {
    [begin, end] = getLastWeekRange();
    intervalString = "day";
  } else {
    return;
  }
  const seriesData = generateTodoChartData(todos, begin, end, intervalString);
  const tickPositions = seriesData.map((item) => item[0]);

  HighCharts.chart(chartElement, {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    time: {
      timezoneOffset: timezoneOffset,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format:
          doneTimeRange === "last_week"
            ? "{value:%Y-%m-%d}"
            : "{value:%Y-%m-%d %H:00}",
        rotation: -45,
      },
      crosshair: true,
      showFirstLabel: true,
      tickPositions,
    },
    yAxis: {
      min: 0,
      tickInterval: 1,
      title: {
        text: "Done Todos",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} done</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        pointWidth: 10,
      },
    },
    series: [
      {
        name: "Todo",
        data: seriesData,
      },
    ],
  } as Options);
}

type TodoChartPropsType = {
  todos: TodosType;
  doneTimeRange: string;
};
export const TodoChart = ({ todos, doneTimeRange }: TodoChartPropsType) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateChart(chartRef.current!, todos, doneTimeRange);
  }, [todos, doneTimeRange]);

  return <div ref={chartRef}></div>;
};
