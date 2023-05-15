import DatePicker from "react-datepicker";
import { Modal } from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import "./TodoForm.css";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../../services/TodoService";

type TodoInputPropsType = {
  onClose: () => void;
};

type FormValues = {
  content: string;
  due?: Date;
};

export const TodoForm = ({ onClose }: TodoInputPropsType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo);

  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const { content, due } = data;
    try {
      await mutation.mutateAsync({ content, due });
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    } catch (e) {
      console.log(e);
    }
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
              {mutation.error instanceof Error ? (
                <div className="error-text">
                  <span className="red-text">{mutation.error.message}</span>
                </div>
              ) : null}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    {...register("content", { required: true })}
                    className={errors.content ? "invalid" : ""}
                  />
                  <label htmlFor="content">Content*</label>
                  {errors.content?.type === "required" && (
                    <span className="red-text">Content is required</span>
                  )}
                </div>
                <div className="input-field col s4 due-input-field">
                  <Controller
                    name="due"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        name="due"
                        isClearable
                        selected={field.value}
                        clearButtonClassName="btn-date-picker-clear"
                        onChange={field.onChange}
                        dateFormat="yyyy/MM/dd"
                      />
                    )}
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
          <button className="btn" type="submit" disabled={mutation.isLoading}>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};
