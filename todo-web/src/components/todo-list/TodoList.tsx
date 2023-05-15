import moment from "moment";
import type { TodoType, TodosType } from "../../typedefs";
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  RowData,
} from "@tanstack/react-table";

type TodoListProps = {
  todos: TodosType;
  onClickDoneUndone: Function;
  onClickDelete: Function;
  disabled: boolean;
};

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    disabled: boolean;
    onClickDoneUndone: Function;
    onClickDelete: Function;
  }
}

const columnHelper = createColumnHelper<TodoType>();

const columns = [
  columnHelper.display({
    header: "Done",
    id: "done",
    cell: (props) => {
      const todo = props.row.original;
      const meta = props.table.options.meta!;
      return (
        <label>
          <input
            className="filled-in"
            type="checkbox"
            checked={!!todo.doneAt}
            onChange={() => meta.onClickDoneUndone(todo.id, todo)}
          />
          <span></span>
        </label>
      );
    },
  }),
  columnHelper.accessor("content", {
    header: "Content",
  }),
  columnHelper.accessor("due", {
    header: "Due",
    cell: (props) => {
      const value = props.getValue();
      return value ? moment(value).format("YYYY-MM-DD") : "";
    },
  }),
  columnHelper.accessor("doneAt", {
    header: "Done At",
    cell: (props) => {
      const value = props.getValue();
      return value ? moment(value).format("YYYY-MM-DD HH:mm") : "";
    },
  }),
  columnHelper.display({
    id: "action",
    cell: (props) => {
      const todo = props.row.original;
      const meta = props.table.options.meta!;
      return (
        <button
          disabled={meta.disabled}
          className="btn-small"
          onClick={() => meta.onClickDelete(todo.id)}
        >
          <i className="material-icons">delete</i>
        </button>
      );
    },
  }),
];

export const TodoList = (props: TodoListProps) => {
  const { todos, onClickDoneUndone, onClickDelete, disabled } = props;

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: todos,
    columns,
    state: {
      sorting,
    },
    meta: {
      disabled,
      onClickDoneUndone,
      onClickDelete,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="todo-list">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
