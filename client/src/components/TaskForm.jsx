import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        try {
            const newTask = await createTask({
                title,
                description
            });

            onTaskCreated(newTask);

            setTitle("");
            setDescription("");
        } catch (error) {
            console.error(error);
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
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                    />

                    <textarea
                        placeholder="📋  Add a description (optional)"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
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
    );
}

export default TaskForm;