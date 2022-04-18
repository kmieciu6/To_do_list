import React, { useState, useEffect } from "react";
import { getTasks } from "./API/tasks";
import NewTask from "./components/NewTask";
import Task from "./components/Task";

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks(setTasks)
    }, [])

    const handleAddNewTask = task => {
        setTasks(prevState => {
            return [
                task,
                ...prevState
            ]
        })
    }

    const handleRemoveTask = id => {
        setTasks(prevState => {
            prevState.filter(task => task.id !== id)
        })
    }

    return (
        <>
            <NewTask onAddNewTask={handleAddNewTask}/>
            {tasks.map(task => <Task key={task.id} {...task} onRemoveTask={handleRemoveTask} />)}
        </>
    );
}

export default App;