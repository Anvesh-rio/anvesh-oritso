# ORITSO Todo App

**Author:** Anvesh Jarpati  
**Email:** anveshjarpati@gmail.com  

---

## 📋 Project Overview

A full-stack Todo List application built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows users to manage their daily tasks through a clean, responsive interface.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **HTTP Client:** Axios
- **Styling:** CSS

---

## 🚀 Features

- ✅ Add new tasks (with title, description, due date, status)
- ✏️ Edit tasks via popup modal
- ❌ Delete tasks
- 🔍 Search tasks with **debounced input** (500ms delay)
- 📅 Set due dates (optional)
- ✅ Mark tasks as: `pending`, `in progress`, or `completed`
- ⚡ Limit to 20 tasks display
- 🎯 Responsive UI

---

## 🧠 Debounce Implementation

To improve performance, the task search input uses a debounce of **500ms** — preventing unnecessary API calls during fast typing.

```js
useEffect(() => {
  const delay = setTimeout(() => {
    fetchTodos();
  }, 500);

  return () => clearTimeout(delay);
}, [searchQuery]);
