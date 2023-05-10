import { useState, FormEvent, Dispatch } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Modal } from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import "./TodoForm.css";
import { fetch } from "../../utils/fetch";
import { ActionType } from "../../typedefs";

type TodoInputPropsType = {
  dispatch: Dispatch<ActionType>;
  onClose: (addTodoSuccess: boolean) => void;
};

export const TodoForm = ({ dispatch, onClose }: TodoInputPropsType) => {
  const [content, setContent] = useState("");
  const [due, setDue] = useState<Date | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/todos", {
      method: "post",
      body: JSON.stringify({
        content,
        due,
      }),
    });

    if (response instanceof Response && response.status !== 200) {
      alert("Fail to add new todo.");
    } else {
      const { id, content, due } = response as any;
      dispatch({
        type: "add_todo",
        id: id,
        content: content,
        due: due,
      });
      onClose(true);
    }
  };

  const formatDue = () => {
    return due ? moment(due).format("DD/MM/YYYY") : "";
  };

  return (
    <Modal className="todo-form">
      <form className="modal modal-fixed-footer" onSubmit={onSubmit}>
        <div className="modal-content">
          <h4>Add Todo</h4>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    // className="invalid"
                    autoComplete="off"
                    name="content"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <label htmlFor="content">Content</label>
                </div>
                <div className="input-field col s4">
                  <DatePicker
                    name="due"
                    isClearable
                    selected={due}
                    clearButtonClassName="btn-date-picker-clear"
                    onChange={(date) => setDue(date)}
                    dateFormat="yyyy/MM/dd"
                  />
                  <label htmlFor="due">Due</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-close btn-flat" onClick={onClose}>
            Cancel
          </button>{" "}
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};
