import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

const stickers = ["🌸", "⭐", "🌈", "🧸", "🌱", "💖", "✨", "☕"];

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filter, setFilter] = useState("all");

    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });

            const newTask = await response.json();

            setTasks((currentTasks) => [
                ...currentTasks,
                newTask
            ]);

            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const toggleTask = async (task) => {
        try {
            const response = await fetch(
                `${API_URL}/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        completed: !task.completed
                    })
                }
            );

            const updatedTask = await response.json();

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask._id === updatedTask._id
                        ? updatedTask
                        : currentTask
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            setTasks((currentTasks) =>
                currentTasks.filter(
                    (task) => task._id !== id
                )
            );
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") {
            return !task.completed;
        }

        if (filter === "completed") {
            return task.completed;
        }

        return true;
    });

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    const getSticker = (index) =>
        stickers[index % stickers.length];

    const formatDate = (task) => {
        const date =
            task.creationDate ||
            task.createdAt;

        if (!date) {
            return "Recently added";
        }

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
    };

    return (
        <div className="app">

            {/* Header */}
            <header className="header">
                <div className="brand">
                    <div className="brand-sticker">
                        📝
                    </div>

                    <div>
                        <h1>
                            TaskFlow
                            <span>♡</span>
                        </h1>

                        <p>
                            Get things done, one task at a time ✨
                        </p>
                    </div>
                </div>

                <div className="task-counter">
                    <span className="counter-icon">
                        📋
                    </span>

                    <div>
                        <strong>{tasks.length}</strong>
                        <span>Tasks</span>
                    </div>
                </div>
            </header>

            {/* Add Task */}
            <section className="add-task-board">

                <div className="board-decoration decoration-star">
                    ⭐
                </div>

                <div className="board-decoration decoration-rainbow">
                    🌈
                </div>

                <div className="board-decoration decoration-heart">
                    💜
                </div>

                <h2>
                    Add a new task <span>♡</span>
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">

                        <input
                            type="text"
                            placeholder="📝  What needs to be done?"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                        />

                        <textarea
                            placeholder="📋  Add a description (optional)"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <div className="form-actions">
                        <button
                            className="add-button"
                            type="submit"
                        >
                            ＋ Add Task
                        </button>
                    </div>
                </form>
            </section>

            {/* Tasks Header */}
            <section className="tasks-section">

                <div className="tasks-header">

                    <h2>
                        Your Tasks <span>💗</span>
                    </h2>

                    <div className="filters">

                        <button
                            className={
                                filter === "all"
                                    ? "filter active"
                                    : "filter"
                            }
                            onClick={() =>
                                setFilter("all")
                            }
                        >
                            All
                        </button>

                        <button
                            className={
                                filter === "pending"
                                    ? "filter active"
                                    : "filter"
                            }
                            onClick={() =>
                                setFilter("pending")
                            }
                        >
                            🟠 Pending
                        </button>

                        <button
                            className={
                                filter === "completed"
                                    ? "filter active"
                                    : "filter"
                            }
                            onClick={() =>
                                setFilter("completed")
                            }
                        >
                            🟢 Completed
                        </button>

                    </div>
                </div>

                {/* Task Cards */}

                {filteredTasks.length === 0 ? (
                    <div className="empty-state">
                        <div>🌷</div>
                        <h3>No tasks here!</h3>
                        <p>
                            Add something to your board and
                            let's get started.
                        </p>
                    </div>
                ) : (
                    <div className="task-grid">

                        {filteredTasks.map(
                            (task, index) => (
                                <article
                                    className={`task-card card-${index % 5} ${
                                        task.completed
                                            ? "completed"
                                            : ""
                                    }`}
                                    key={task._id}
                                >

                                    {/* Pin */}
                                    <div className="pin">
                                        📌
                                    </div>

                                    {/* Sticker */}
                                    <div className="task-sticker">
                                        {getSticker(index)}
                                    </div>

                                    <div className="task-content">

                                        <div className="task-title">
                                            <span
                                                className={
                                                    task.completed
                                                        ? "status-circle completed-circle"
                                                        : "status-circle"
                                                }
                                            >
                                                {task.completed
                                                    ? "✓"
                                                    : ""}
                                            </span>

                                            <h3>
                                                {task.title}
                                            </h3>
                                        </div>

                                        <p className="task-description">
                                            {task.description ||
                                                "No description added."}
                                        </p>

                                        <div className="task-date">
                                            📅{" "}
                                            {formatDate(task)}
                                        </div>

                                        <div className="task-actions">

                                            <button
                                                className="complete-button"
                                                onClick={() =>
                                                    toggleTask(
                                                        task
                                                    )
                                                }
                                            >
                                                {task.completed
                                                    ? "↩ Mark Pending"
                                                    : "✓ Complete"}
                                            </button>

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    deleteTask(
                                                        task._id
                                                    )
                                                }
                                            >
                                                🗑 Delete
                                            </button>

                                        </div>

                                    </div>
                                </article>
                            )
                        )}

                    </div>
                )}
            </section>

            {/* Footer encouragement */}
            <section className="motivation">
                <div className="trophy">🏆</div>

                <div>
                    <h3>Keep it up!</h3>

                    <p>
                        {completedCount === 0
                            ? "Every task completed is a step closer to your goals 🌈"
                            : `${completedCount} task${
                                  completedCount > 1
                                      ? "s"
                                      : ""
                              } completed! You're doing amazing 🌈`}
                    </p>
                </div>

                <div className="coffee">
                    ☕
                </div>
            </section>

        </div>
    );
}

export default App;