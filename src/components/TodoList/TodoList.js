import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css";
import config from "../config";
import PopUp from "../PopUp/PopUp";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchTodos();
  }, [debouncedQuery]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/api/tasks/task/search?q=${debouncedQuery}`
      );
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(`${config.BASE_URL}/api/tasks/task`, {
        title: newTodo,
        description,
        dueDate: dueDate || null,
        status,
      });
      setTodos((prev) => [response.data.data, ...prev]);
      setNewTodo("");
      setDescription("");
      setDueDate("");
      setStatus("pending");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/tasks/task/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const openModal = (todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTodo(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${config.BASE_URL}/api/tasks/task/${editingTodo._id}`,
        editingTodo
      );
      const updatedTodo = response.data.data;
      setTodos((prev) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
      closeModal();
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  return (
    <div className="todo-container">
      <h1>{"ORITSO Todo"}</h1>
      <div className="input-limit">
        <div className="search-container">
          <input
            type="text"
            className="searchInput"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <h1 className="limit">20 limit only</h1>
      </div>

      <form
        className="todo-input-section"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due Date (optional)"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={todo.status === "completed" ? "completed" : ""}
          >
            <div className="todo-text">
              <span className="todo-title">{todo.title}</span>
              {todo.description && <small>{todo.description}</small>}
              {todo.dueDate && (
                <small>Due: {new Date(todo.dueDate).toLocaleDateString()}</small>
              )}
              {todo.status === "completed" && (
                <span className="badge">Completed</span>
              )}
            </div>
            <div className="todo-actions">
              <button onClick={() => openModal(todo)}>Update</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <h1 className="heading-anvesh">{"thank you - anveshjarpati@gmail.com"}</h1>

      {modalOpen && (
        <PopUp
          todo={editingTodo}
          onChange={setEditingTodo}
          onClose={closeModal}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default TodoList;
