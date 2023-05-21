import "react-datepicker/dist/react-datepicker.css";
import "./TodoForm.css";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { Modal } from "./Modal";
import * as TodoService from "../../services/TodoService";
import { TodoType } from "../../typedefs";

type TodoInputPropsType = {
  onClose: (addedTodo?: TodoType) => void;
};

export const TodoForm = ({ onClose }: TodoInputPropsType) => {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const addedTodo = await TodoService.addTodo(content, dueDate);
      onClose(addedTodo);
    } catch (e) {
      setErrorMessage((e as any).message);
    }
  };

  return (
    <Modal className="todo-form">
      <form className="modal modal-fixed-footer" onSubmit={onSubmit}>
        <div className="modal-content">
          <h4>Add Todo</h4>
          <div className="row">
            <div className="col s12">
              {errorMessage ? (
                <div className="error-text">
                  <span className="red-text">{errorMessage}</span>
                </div>
              ) : null}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <label htmlFor="content">Content*</label>
                </div>
                <div className="input-field col s4 due-input-field">
                  <DatePicker
                    name="dueDate"
                    isClearable
                    selected={dueDate}
                    clearButtonClassName="btn-date-picker-clear"
                    onChange={(date) => setDueDate(date)}
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()}
                  />
                  <label htmlFor="due">Due Date</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-close btn-flat" onClick={() => onClose()}>
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
