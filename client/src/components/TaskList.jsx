import TaskCard from "./TaskCard";

function TaskList({
    tasks,
    filter,
    onToggle,
    onDelete
}) {
    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") {
            return !task.completed;
        }

        if (filter === "completed") {
            return task.completed;
        }

        return true;
    });

    if (filteredTasks.length === 0) {
        return (
            <div className="empty-state">
                <div>🌷</div>

                <h3>
                    No tasks here!
                </h3>

                <p>
                    Add something to your board
                    and let's get started.
                </p>
            </div>
        );
    }

    return (
        <div className="task-grid">
            {filteredTasks.map((task, index) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    index={index}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;