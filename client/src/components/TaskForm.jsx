import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        try {
            setIsSubmitting(true);

            const newTask = await createTask({
    title: title.trim(),
    description: description.trim(),
    priority,
    dueDate: dueDate || null
});
            onTaskCreated(newTask);

            setTitle("");
setDescription("");
setPriority("medium");
setDueDate("");
        } catch (error) {
            console.error(
                "Error creating task:",
                error
            );

            setError(
                "Couldn't create the task. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                        onChange={(event) => {
                            setTitle(event.target.value);
                            setError("");
                        }}
                        disabled={isSubmitting}
                    />

                    <textarea
                        placeholder="📋  Add a description (optional)"
                        value={description}
                        onChange={(event) => {
                            setDescription(
                                event.target.value
                            );
                            setError("");
                        }}
                        disabled={isSubmitting}
                    />

<div className="task-options">

    <div className="form-field">

        <label htmlFor="priority">
            🎯 Priority
        </label>

        <select
            id="priority"
            value={priority}
            onChange={(event) =>
                setPriority(event.target.value)
            }
            disabled={isSubmitting}
        >
            <option value="low">
                🟢 Low
            </option>

            <option value="medium">
                🟡 Medium
            </option>

            <option value="high">
                🔴 High
            </option>
        </select>

    </div>

    <div className="form-field">

        <label htmlFor="dueDate">
            📅 Due Date
        </label>

        <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) =>
                setDueDate(event.target.value)
            }
            disabled={isSubmitting}
        />

    </div>

</div>

                </div>

                {error && (
                    <div className="form-error">
                        ⚠️ {error}
                    </div>
                )}

                <div className="form-actions">

                    <button
                        className="add-button"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "⏳ Adding..."
                            : "＋ Add Task"}
                    </button>

                </div>

            </form>

        </section>
    );
}

export default TaskForm;