import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Components/Chat";

function App() {
  // ==========================
  // Todo State
  // ==========================

  const [todos, setTodos] =useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [task, setTask] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const [editText, setEditText] = useState("");

  // ==========================
  // Theme State
  // ==========================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ==========================
  // Save Todos
  // ==========================

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ==========================
  // Save Theme
  // ==========================

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // ==========================
  // Add Todo
  // ==========================

  const addTodo = () => {
    if (task.trim() === "") return;

    setTodos([
      ...todos,
      {
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  // ==========================
  // Delete Todo
  // ==========================

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // ==========================
  // Toggle Complete
  // ==========================

  const toggleTodo = (index) => {
    const updated = [...todos];

    updated[index].completed = !updated[index].completed;

    setTodos(updated);
  };

  // ==========================
  // Edit Todo
  // ==========================

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = (index) => {
    const updated = [...todos];

    updated[index].text = editText;

    setTodos(updated);

    setEditingIndex(null);

    setEditText("");
  };

  // ==========================
  // Theme Toggle
  // ==========================

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // ==========================
  // JSX
  // ==========================

  return (
    <>
      <div className="app">

        <button
          id="themeToggle"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* ================= Todo ================= */}

        <div className="container">

          <h2>Todo App</h2>

          <div className="input-box">

            <input
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                }
              }}
            />

            <button onClick={addTodo}>
              Add
            </button>

          </div>

          <ul>

            {todos.map((todo, index) => (

              <li
                key={index}
                className={todo.completed ? "completed" : ""}
              >

                {editingIndex === index ? (

                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) =>
                      setEditText(e.target.value)
                    }
                  />

                ) : (

                  <span>{todo.text}</span>

                )}

                <div className="actions">

                  <button
                    onClick={() => toggleTodo(index)}
                  >
                    ✔
                  </button>

                  {editingIndex === index ? (

                    <button
                      onClick={() => saveEdit(index)}
                    >
                      Save
                    </button>

                  ) : (

                    <button
                      onClick={() => startEditing(index)}
                    >
                      ✏️
                    </button>

                  )}

                  <button
                    onClick={() => deleteTodo(index)}
                  >
                    🗑️
                  </button>

                </div>

              </li>

            ))}

          </ul>

        </div>

        {/* ================= Chat ================= */}

        <Chat darkMode={darkMode} />

      </div>
    </>
  );
}

export default App;