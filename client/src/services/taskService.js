import apiRequest from "./api";

const TASKS_ENDPOINT = "/api/tasks";

export const getTasks = () => {
    return apiRequest(TASKS_ENDPOINT);
};

export const createTask = (task) => {
    return apiRequest(TASKS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(task)
    });
};

export const updateTask = (id, task) => {
    return apiRequest(`${TASKS_ENDPOINT}/${id}`, {
        method: "PUT",
        body: JSON.stringify(task)
    });
};

export const deleteTask = (id) => {
    return apiRequest(`${TASKS_ENDPOINT}/${id}`, {
        method: "DELETE"
    });
};