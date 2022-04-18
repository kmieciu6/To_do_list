import {API_KEY, API_URL} from "./constants";

/**
 * Fetch all tasks
 * @param {function} successCallback - Function that saves incoming data
 */
export const getTasks = (successCallback) => {
    fetch(`${API_URL}/tasks`, {
        headers: {
            "Authorization": API_KEY
        }
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data)
            }
        })
        .catch(err => console.log(err))
}

/**
 * Create new task
 * @param {Object} task
 * @param {string} task.title
 * @param {string} task.description
 * @param {string} task.status
 * @param {function} successCallback - Function that saves incoming data
 */
export const createTask = (task, successCallback) => {
    fetch(`${API_URL}/tasks`, {
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(task)
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data)
            }
        })
        .catch(err => console.log(err))
}

/**
 * Update task
 * @param {string} id
 * @param {Object} task
 * @param {string} task.title
 * @param {string} task.description
 * @param {string} task.status
 * @param {function} successCallback - Function that saves incoming data
 */
export const updateTask = (id, task, successCallback) => {
    fetch(`${API_URL}/tasks/${id}`, {
        headers: {
            "Authorization": API_KEY,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(task)
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data)
            }
        })
        .catch(err => console.log(err))
}

/**
 * Remove Task
 * @param {string} id
 * @param {function} successCallback - Function runs in success case
 */
export const removeTask = (id, successCallback) => {
    fetch(`${API_URL}/tasks/${id}`, {
        headers: {
            "Authorization": API_KEY
        },
        method: "DELETE"
    })
        .then(r => r.json())
        .then(data => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback();
            }
        })
        .catch(err => console.log(err))
}