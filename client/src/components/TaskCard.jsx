import { useState } from "react";

const stickers = ["🌸", "⭐", "🌈", "🧸", "🌱", "💖", "✨", "☕"];

function TaskCard({ task, index, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(
    task.priority || "medium"
);

const [dueDate, setDueDate] = useState(
    task.dueDate
        ? task.dueDate.split("T")[0]
        : ""
);
    const [description, setDescription] = useState(
        task.description || ""
    );

    const sticker = stickers[index % stickers.length];

    const formatDate = () => {
        const date = task.creationDate || task.createdAt;

        if (!date) {
            return "Recently added";
        }

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const handleSave = () => {
        if (!title.trim()) {
            return;
        }

       onEdit(task._id, {
    title: title.trim(),
    description: description.trim(),
    priority,
    dueDate: dueDate || null
});

        setIsEditing(false);
    };

    const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority || "medium");

    setDueDate(
        task.dueDate
            ? task.dueDate.split("T")[0]
            : ""
    );

    setIsEditing(false);
};

    const getPriorityLabel = () => {
    switch (task.priority) {
        case "high":
            return "🔴 High";

        case "low":
            return "🟢 Low";

        default:
            return "🟡 Medium";
    }
};

const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date();

    return (
        <article
            className={`task-card card-${index % 5} ${
                task.completed ? "completed" : ""
            }`}
        >
            <div className="pin">
                📌
            </div>

            <div className="task-sticker">
                {sticker}
            </div>

            {isEditing ? (
                <div className="task-edit-form">

                    <input
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        autoFocus
                    />

                    <textarea
                        value={description}
                        onChange={(event) =>
                            setDescription(
                                event.target.value
                            )
                        }
                        placeholder="Add a description"
                    />

<div className="task-options">

    <div className="form-field">

        <label htmlFor={`priority-${task._id}`}>
            🎯 Priority
        </label>

        <select
            id={`priority-${task._id}`}
            value={priority}
            onChange={(event) =>
                setPriority(event.target.value)
            }
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

        <label htmlFor={`dueDate-${task._id}`}>
            📅 Due Date
        </label>

        <input
            id={`dueDate-${task._id}`}
            type="date"
            value={dueDate}
            onChange={(event) =>
                setDueDate(event.target.value)
            }
        />

    </div>

</div>

                    <div className="task-actions">

                        <button
                            className="save-button"
                            onClick={handleSave}
                        >
                            💾 Save
                        </button>

                        <button
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            ✖ Cancel
                        </button>

                    </div>

                </div>
            ) : (
                <div className="task-content">

                    <div className="task-title">

                        <span
                            className={
                                task.completed
                                    ? "status-circle completed-circle"
                                    : "status-circle"
                            }
                        >
                            {task.completed ? "✓" : ""}
                        </span>

                        <h3>
                            {task.title}
                        </h3>

                    </div>

                    <p className="task-description">
                        {task.description ||
                            "No description added."}
                    </p>

                    <div className="task-meta">

    <span className={`priority-badge priority-${task.priority}`}>
        {getPriorityLabel()}
    </span>

    {task.dueDate && (
        <span
            className={
                isOverdue
                    ? "due-date overdue"
                    : "due-date"
            }
        >
            📅{" "}
            {isOverdue
                ? "Overdue · "
                : "Due · "}

            {new Date(task.dueDate).toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric"
                }
            )}
        </span>
    )}

</div>

                    <div className="task-date">
                        📅 {formatDate()}
                    </div>

                    <div className="task-actions">

                        <button
                            className="complete-button"
                            onClick={() =>
                                onToggle(task)
                            }
                        >
                            {task.completed
                                ? "↩ Mark Pending"
                                : "✓ Complete"}
                        </button>

                        <button
                            className="edit-button"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            ✏️ Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={() =>
                                onDelete(task._id)
                            }
                        >
                            🗑 Delete
                        </button>

                    </div>

                </div>
            )}
        </article>
    );
}

export default TaskCard;