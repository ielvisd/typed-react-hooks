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
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  // Add a new Todo item
  // Checks the current max id and adds a new todo with an id one higher
  function addTodo(title: string) {
    let maxId = 0;
    for (let todo of todos) {
      maxId = Math.max(maxId, todo.id);
    }
    const newTodo: Todo = { id: maxId + 1, title: title, completed: false };
    setTodos([...todos, newTodo]);
  }

  function removeTodo(id: number) {
    // The .filter function returns a new array with only the elements that pass the test
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function setTodosCompleted(id: number, completed: boolean) {
    setTodos(
      // The .map function allows us to iterate over the array and return a new array with the same length but different values
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: completed };
        } else {
          return todo;
        }
      })
    );
  }

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
      <h1 className="text-2xl font-bold">Todo List</h1>
      {/* Form to add a new todo, using the addTodo function */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(todoTitle);
          setTodoTitle("");
        }}
      >
        <input
          className="text-black"
          type="text"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>

      {/* A list of todos, using .map to iterate over the list */}
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
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(event) =>
                  setTodosCompleted(todo.id, event.target.checked)
                }
              />
              {todo.completed ? "DONE:" : "TODO:"}
              {todo.title}
            </span>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => removeTodo(todo.id)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}
export default App;
