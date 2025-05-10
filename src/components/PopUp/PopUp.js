import React from "react";
import "./PopUp.css";

const PopUp = ({ todo, onChange, onClose, onSave }) => {
  if (!todo) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Edit Task</h2>

        <input
          type="text"
          placeholder="Title"
          value={todo.title}
          onChange={(e) => onChange({ ...todo, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={todo.description}
          onChange={(e) => onChange({ ...todo, description: e.target.value })}
        />

        <input
          type="date"
          value={todo.dueDate?.substring(0, 10) || ""}
          onChange={(e) => onChange({ ...todo, dueDate: e.target.value })}
        />

        <select
          value={todo.status}
          onChange={(e) => onChange({ ...todo, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="popup-buttons">
          <button className="save-button" onClick={onSave}>Save</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
