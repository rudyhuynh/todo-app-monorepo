import "react-datepicker/dist/react-datepicker.css";
import "./TodoForm.css";
import DatePicker from "react-datepicker";
import { Modal } from "./Modal";
import * as TodoService from "../../services/TodoService";
import { TodoType } from "../../typedefs";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type TodoInputPropsType = {
  onClose: (addedTodo?: TodoType) => void;
};

type TodoFormInputs = {
  content: string;
  dueDate: Date | null;
};

export const TodoForm = ({ onClose }: TodoInputPropsType) => {
  const { register, handleSubmit, formState, control } =
    useForm<TodoFormInputs>();
  const { errors } = formState;

  // const queryClient = useQueryClient()
  // const allTodos = queryClient.getQueryData(['todos', 'all'])

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: (data: TodoFormInputs) =>
      TodoService.addTodo(data.content, data.dueDate),
    // async or return promise
  });
  const errorMessage = (error as Error)?.message;

  const onSubmit = async (data: TodoFormInputs) => {
    const addedTodo = await mutateAsync(data);
    onClose(addedTodo);
    // try {
    //   const addedTodo = await TodoService.addTodo(data.content, data.dueDate);
    //   onClose(addedTodo);
    // } catch (e) {
    //   setErrorMessage((e as any).message);
    // }
  };

  return (
    <Modal className="todo-form">
      <form
        className="modal modal-fixed-footer"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                    {...register("content", { required: true })}
                    className={
                      errors.content?.type === "required" ? "invalid" : ""
                    }
                  />
                  <label htmlFor="content">Content*</label>
                  {errors.content?.type === "required" && (
                    <span className="red-text">Content is required</span>
                  )}
                </div>
                <div className="input-field col s4 due-input-field">
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        name={field.name}
                        isClearable
                        selected={field.value}
                        clearButtonClassName="btn-date-picker-clear"
                        onChange={field.onChange}
                        dateFormat="yyyy/MM/dd"
                        minDate={new Date()}
                      />
                    )}
                  />

                  <label htmlFor="dueDate">Due Date</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-close btn-flat" onClick={() => onClose()}>
            Cancel
          </button>{" "}
          <button className="btn" type="submit" disabled={isLoading}>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};
