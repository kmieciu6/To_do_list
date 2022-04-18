import React, {useState} from "react";
import {createOperation} from "../API/operations";
import Operation from "./Operation";

const Operations = ({taskID, form, setForm, operations, setOperations, status}) => {
    const [operationDescription, setOperationDescription] = useState("")

    const handleAddNewOperation = e => {
        e.preventDefault();

        const operation = {
            description: operationDescription,
            timeSpent: 0
        }

        createOperation(taskID, operation, data => {
            setOperations(prevState => {
                return [
                    data,
                    ...prevState
                ]
            })
            setForm(false);
            setOperationDescription("")
        })
    }
    const handleRemoveOperation = id => {
        setOperations(prevState => {
            prevState.filter(operation => operation.id !== id)
        })
    }
    return (
        <>
            {form && (
                <div className="card-body">
                    <form onSubmit={handleAddNewOperation}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Operation description"
                                value={operationDescription}
                                onChange={e => setOperationDescription(e.target.value)}/>

                            <div className="input-group-append">
                                <button className="btn btn-info">
                                    Add
                                    <i className="fas fa-plus-circle ml-1"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <ul className="list-group list-group-flush">
                {operations.map(operation => (
                    <Operation key={operation.id} {...operation} onRemoveOperation={handleRemoveOperation}
                               status={status}/>
                ))}
            </ul>
        </>
    )
}

export default Operations;