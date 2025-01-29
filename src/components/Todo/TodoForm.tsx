import { FormEvent } from "react";
import { useTodoContext } from "./TodoProvider";

interface TodoFormProps {
  isEditing: boolean;
  editingId: number | null;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingId?: React.Dispatch<React.SetStateAction<number | null>>;
}

const TodoForm = ({
  isEditing,
  editingId,
}: TodoFormProps) => {
  const { setTodo, todos } = useTodoContext();

  const handleTodoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const todo = {
      id: Date.now(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };
    if (!editingId && !isEditing) {
      setTodo((prevTodo) => {
        return [...prevTodo, todo];
      });
      formElement.reset();
      return;
    }
    setTodo((prevTodo) => {
      const newTodo: any = prevTodo.map((storeTodo) => {
        if (storeTodo.id === editingId) {
          return todo;
        }
        return storeTodo;
      });
      return newTodo;
    });
    formElement.reset();
  };

  const editingTodo = todos.find((todo) => todo.id === editingId);

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleTodoSubmit}
    >
      <input
        style={{ padding: 7 }}
        required
        type="text"
        placeholder="Enter todo Title"
        name="title"
        defaultValue={editingTodo?.title || ""}
      />
      <textarea
        name="description"
        placeholder="Enter todo description"
        required
        aria-required
        defaultValue={editingTodo?.description || ""}
      ></textarea>
      <button type="submit">{isEditing ? "Save Edit" : "Add Todo"}</button>
    </form>
  );
};

export default TodoForm;
