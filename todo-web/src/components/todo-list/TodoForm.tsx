import DatePicker from "react-datepicker";
import { Modal } from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import "./TodoForm.css";
import * as TodoService from "../../services/TodoService";
import { FormEvent, useState } from "react";
import { TodoType } from "../../typedefs";

type TodoInputPropsType = {
  onClose: (addedTodo?: TodoType) => void;
};

export const TodoForm = ({ onClose }: TodoInputPropsType) => {
  const [content, setContent] = useState("");
  const [due, setDue] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const addedTodo = await TodoService.addTodo(content, due);
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
                    // className="invalid"
                    autoComplete="off"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <label htmlFor="content">Content*</label>
                </div>
                <div className="input-field col s4 due-input-field">
                  <DatePicker
                    name="due"
                    isClearable
                    autoComplete="off"
                    selected={due}
                    clearButtonClassName="btn-date-picker-clear"
                    onChange={(date) => setDue(date)}
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()}
                  />
                  <label htmlFor="due">Due</label>
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
