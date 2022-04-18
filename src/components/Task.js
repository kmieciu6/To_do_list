import React, {useState, useEffect} from "react";
import Operations from "./Operations";
import {removeTask, updateTask} from "../API/tasks";
import {getOperations} from "../API/operations";


function Task ({title, description, id, status: _status, onRemoveTask}) {
    const [status, setStatus] = useState(_status)
    const [operations, setOperations] = useState([])
    const [operationForm, setOperationForm] = useState(false)

    useEffect(() => {
        getOperations(id, setOperations)
    }, []);

    const handleAddOperation = () => {
        setOperationForm(prevState => !prevState)
    }

    const handleFinish = () => {
        const task = {
            title,
            description,
            status: "closed"
        }

        updateTask(id, task, () => setStatus("closed"))
    }

    const handleRemove = () => {
        removeTask(id, () => onRemoveTask(id))
    }

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{title}</h5>
                    <h6 className="card-subtitle text-muted">{description}</h6>
                </div>


                <div>
                    {status === "open" &&
                        <>
                            <button className="btn btn-info btn-sm mr-2" onClick={handleAddOperation}>
                                Add operation
                                <i className="fas fa-plus-circle ml-1"/>
                            </button>

                            <button className="btn btn-dark btn-sm" onClick={handleFinish}>
                                Finish
                                <i className="fas fa-archive ml-1"/>
                            </button>
                        </>
                    }

                    {operations.length === 0 &&
                        <button className="btn btn-outline-danger btn-sm ml-2" onClick={handleRemove}>
                            <i className="fas fa-trash false"/>
                        </button>
                    }
                </div>
            </div>

            <Operations taskID={id}
                        form={operationForm}
                        setForm={setOperationForm}
                        operations={operations}
                        setOperations={setOperations}
                        status={status}/>
        </section>
    )
}

export default Task;