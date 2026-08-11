const stickers = ["🌸", "⭐", "🌈", "🧸", "🌱", "💖", "✨", "☕"];

function TaskCard({ task, index, onToggle, onDelete }) {
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

                <div className="task-date">
                    📅 {formatDate()}
                </div>

                <div className="task-actions">

                    <button
                        className="complete-button"
                        onClick={() => onToggle(task)}
                    >
                        {task.completed
                            ? "↩ Mark Pending"
                            : "✓ Complete"}
                    </button>

                    <button
                        className="delete-button"
                        onClick={() => onDelete(task._id)}
                    >
                        🗑 Delete
                    </button>

                </div>

            </div>
        </article>
    );
}

export default TaskCard;