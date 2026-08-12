import { useEffect, useState } from "react";
import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
    getTasks,
    updateTask,
    deleteTask
} from "./services/taskService";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

   const loadTasks = async () => {
    try {
        setLoading(true);
        setError(null);

        const data = await getTasks();

        setTasks(data);
    } catch (error) {
        console.error("Error loading tasks:", error);

        setError(
            "We couldn't load your tasks. Please try again."
        );
    } finally {
        setLoading(false);
    }
};
    const handleTaskCreated = (newTask) => {
        setTasks((currentTasks) => [
            ...currentTasks,
            newTask
        ]);
    };

    const handleToggle = async (task) => {
        try {
            const updatedTask = await updateTask(
                task._id,
                {
                    completed: !task.completed
                }
            );

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask._id === updatedTask._id
                        ? updatedTask
                        : currentTask
                )
            );
        } catch (error) {
            console.error(
                "Error updating task:",
                error
            );
        }
    };

    const handleEdit = async (id, updatedData) => {
    try {
        const updatedTask = await updateTask(
            id,
            updatedData
        );

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task._id === updatedTask._id
                    ? updatedTask
                    : task
            )
        );
    } catch (error) {
        console.error(
            "Error editing task:",
            error
        );
    }
};

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);

            setTasks((currentTasks) =>
                currentTasks.filter(
                    (task) => task._id !== id
                )
            );
        } catch (error) {
            console.error(
                "Error deleting task:",
                error
            );
        }
    };

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

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
                            Get things done,
                            one task at a time ✨
                        </p>
                    </div>

                </div>

                <div className="task-counter">

                    <span className="counter-icon">
                        📋
                    </span>

                    <div>
                        <strong>
                            {tasks.length}
                        </strong>

                        <span>
                            Tasks
                        </span>
                    </div>

                </div>

            </header>


            {/* Add Task */}

            <TaskForm
                onTaskCreated={
                    handleTaskCreated
                }
            />


            {/* Tasks */}

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


                {loading ? (
    <div className="loading-state">
        <div className="loading-sticker">
            🌸
        </div>

        <h3>
            Loading your tasks...
        </h3>

        <p>
            Getting everything ready for you ✨
        </p>
    </div>
) : error ? (
    <div className="error-state">
        <div>😿</div>

        <h3>
            Oops!
        </h3>

        <p>
            {error}
        </p>

        <button
            className="retry-button"
            onClick={loadTasks}
        >
            🔄 Try Again
        </button>
    </div>
) : (
   <TaskList
    tasks={tasks}
    filter={filter}
    onToggle={handleToggle}
    onDelete={handleDelete}
    onEdit={handleEdit}
/>
)}

            </section>


            {/* Motivation */}

            <section className="motivation">

                <div className="trophy">
                    🏆
                </div>

                <div>

                    <h3>
                        Keep it up!
                    </h3>

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