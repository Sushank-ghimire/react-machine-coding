import { useState } from "react";
import TodoForm from "./TodoForm";
import { useTodoContext } from "./TodoProvider";

const Todos = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { todos, setTodo } = useTodoContext();
  const handleDeleteTodo = (todoId: number) => {
    const deleting = confirm("Do you really want to delete the todo ?");
    if (deleting) {
      setTodo((prevTodo) => {
        const filteredTodo = prevTodo.filter((todo) => todo.id !== todoId);
        return filteredTodo;
      });
      return;
    }
  };
  return (
    <div>
      <TodoForm isEditing={isEditing} editingId={editingId} />
      {todos.length === 0
        ? "Todo is empty"
        : todos.map((todo) => (
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              key={todo.id}
            >
              <div>
                <p>Title : {todo.title}</p>
                <div>Description : {todo.description}</div>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditingId(todo.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDeleteTodo(todo.id);
                  }}
                  style={{ backgroundColor: "red" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Todos;
