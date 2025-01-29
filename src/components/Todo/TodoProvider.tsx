import { createContext, useContext, useEffect, useState } from "react";

interface Todos {
  id: number;
  title: string;
  description: string;
}

interface TodoContextType {
  todos: Todos[];
  setTodo: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodo] = useState<Todos[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export { useTodoContext, TodoProvider };
