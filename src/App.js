import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState("");
  const [selected, setSelected] = useState("all");

  useEffect(() => {}, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { active: true, todo: form }]);
    setForm("");
  };

  const toggleClick = (index) => {
    const updatedTodo = todos.map((todo, i) =>
      i === index ? { ...todo, active: !todo.active } : todo
    );
    setTodos(updatedTodo);
  };

  const deleteTodo = (index) => {
    const updatedTodo = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodo);
  };

  const clearTodo = () => {
    setTodos([]);
  };

  const onChangeInput = (e) => {
    setForm(e.target.value);
  };

  const filterTodos =
    selected === "all"
      ? todos
      : selected === "active"
      ? todos.filter((todo) => todo.active === true)
      : todos.filter((todo) => todo.active === false);
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={onSubmit}>
            <input
              className="new-todo"
              onChange={onChangeInput}
              value={form}
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filterTodos.map((todo, index) => (
              <li
                key={index}
                className={todo.active ? "" : "completed"}
                hidden={
                  (todo.active === false && selected === "active") ||
                  (todo.active === true && selected === "completed")
                }
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    onClick={() => toggleClick(index)}
                  />
                  <label>{todo.todo}</label>
                  <button
                    className="destroy"
                    onClick={() => deleteTodo(index)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>
              {todos.filter((todo, i) => todo.active === true).length}
            </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={selected === "all" ? "selected" : ""}
                onClick={() => {
                  setSelected("all");
                }}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={selected === "active" ? "selected" : ""}
                onClick={() => {
                  setSelected("active");
                }}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={selected === "completed" ? "selected" : ""}
                onClick={() => {
                  setSelected("completed");
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearTodo}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">{selected}</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
