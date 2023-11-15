// The following line is needed to make this a client component
"use client";

// Import useState hook, only available in client components
import { useState, useEffect, useRef } from "react";
import { Todo } from "./types";
interface User {
  id: number;
  username: string;
}

function App() {
  // Set initial state of todos using the type Todo
  const [todos, setTodos] = useState<Array<Todo>>([
    { id: 1, title: "Buy milk", completed: false },
    { id: 2, title: "Buy eggs", completed: true },
    { id: 3, title: "Buy bread", completed: false },
  ]);
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  // useEffect is used to run code when the dependencies change
  // This logs to the console when the component is mounted
  // In strict mode, it mounts, unmounts, and mounts again
  useEffect(() => {
    console.log("mounted");
    console.log("Users: ", users);

    return () => {
      console.log("unmounted");
    };
  }, [users]);

  return (
    <div className="max-w-600px mx-auto">
      {/* A list of todos */}
      <ul className="list-none m-0 p-0 text-black">
        {todos.map((todo) => (
          <li
            className={
              todo.completed
                ? "p-2 m-2 border border-gray-200 bg-gray-200"
                : "p-2 m-2 border border-gray-200 bg-blue-200"
            }
            key={todo.id}
          >
            <span>
              <input type="checkbox" checked={todo.completed} />
              {todo.completed ? "DONE:" : "TODO:"}
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}
export default App;
