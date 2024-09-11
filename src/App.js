import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Store selected task for reading

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (title && body) {
      setTasks([
        ...tasks,
        { title, body, isEditing: false, isCompleted: false },
      ]);
      setTitle("");
      setBody("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    const newTasks = tasks.map((task, idx) =>
      index === idx ? { ...task, isEditing: !task.isEditing } : task
    );
    setTasks(newTasks);
  };

  const handleEditTaskInput = (e, index, field) => {
    const newTasks = tasks.map((task, idx) =>
      index === idx ? { ...task, [field]: e.target.value } : task
    );
    setTasks(newTasks);
  };

  const handleCompleteTask = (index) => {
    const newTasks = tasks.map((task, idx) =>
      index === idx ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  };

  const handleReadTask = (index) => {
    setSelectedTask(tasks[index]); // Set the selected task for detailed viewing
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter a body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{ textDecoration: t.isCompleted ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={t.isCompleted}
              onChange={() => handleCompleteTask(index)}
            />
            {t.isEditing ? (
              <>
                <input
                  type="text"
                  value={t.title}
                  onChange={(e) => handleEditTaskInput(e, index, "title")}
                />
                <textarea
                  value={t.body}
                  onChange={(e) => handleEditTaskInput(e, index, "body")}
                />
              </>
            ) : (
              <>
                <strong className={t.isCompleted ? "completed-task" : ""}>
                  {t.title}
                </strong>
                <p>{t.body}</p>
              </>
            )}
            <button onClick={() => handleEditTask(index)}>
              {t.isEditing ? "Save" : "Edit"}
            </button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
            <button onClick={() => handleReadTask(index)}>Read</button>{" "}
            {/* Read Button */}
          </li>
        ))}
      </ul>

      {/* Display the selected task if there is one */}
      {selectedTask && (
        <div className="task-details">
          <h2>Task Details</h2>
          <h3>{selectedTask.title}</h3>
          <p>{selectedTask.body}</p>
          <button onClick={() => setSelectedTask(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
