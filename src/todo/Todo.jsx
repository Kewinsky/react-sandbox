import { useEffect, useState } from "react";

const LIMIT = 10;
const API_URL = "https://dummyjson.com/todos";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [skip, setSkip] = useState(0);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${LIMIT}&skip=${LIMIT * skip}`
      );
      const result = await response.json();
      setTodos((prev) => [...prev, ...result.todos]);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleReset = () => {
    setTodos((prev) => prev.map((t) => ({ ...t, completed: false })));
  };

  const sumCompleted = todos.filter((todo) => todo.completed).length;

  useEffect(() => {
    if (skip > 0) fetchTodos();
  }, [skip]);

  return (
    <div>
      {todos.length > 0 && sumCompleted === todos.length && (
        <p className="text-2xl text-green-500">All done!</p>
      )}
      <p>Completed: {sumCompleted}</p>
      <p>Left: {todos.length - sumCompleted}</p>
      <button className="btn btn-warning" onClick={handleReset}>
        Reset
      </button>
      {todos &&
        todos.map((todo) => (
          <Task key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      <button className="btn" onClick={() => setSkip((prev) => prev + 1)}>
        Generate
      </button>
    </div>
  );
};

const Task = ({ todo, setTodos }) => {
  const taskHtml = `task#${todo.id}`;

  const handleComplete = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div>
      <input
        type="checkbox"
        name={taskHtml}
        id={taskHtml}
        checked={todo.completed}
        onChange={handleComplete}
      />
      <label htmlFor={taskHtml}>{todo.todo}</label>
    </div>
  );
};

export default Todo;
