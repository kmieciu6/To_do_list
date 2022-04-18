import React, {useState} from "react";
import {removeOperation, updateOperation} from "../API/operations";

const Operation = ({description, id, onRemoveOperation, timeSpent: _timeSpent, status}) => {
    const [timeSpent, setTimeSpent] = useState(_timeSpent);
    const [timeSpentForm, setTimeSpentForm] = useState(false);
    const [timeSpentInput, setTimeSpentInput] = useState("");

    const handleAddTime = e => {
        e.preventDefault()

        if (timeSpentInput > 0) {
            const operation = {
                description,
                timeSpent: +timeSpent + +timeSpentInput
            }
            updateOperation(id, operation, data => {
                setTimeSpent(data.timeSpent)
                setTimeSpentForm(false)
                setTimeSpentInput("")
            })
        }
    }

    const handleRemoveOperation = () => {
        removeOperation(id, () => {
            onRemoveOperation(id)
        })
    }

    const hours = Math.floor(timeSpent / 60)
    const minutes = timeSpent % 60

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {description}
                {timeSpent > 0 && (
                    <span className="badge badge-success badge-pill ml-2">{hours}h {minutes}min</span>
                )}
            </div>
            {timeSpentForm && (
                <form onSubmit={handleAddTime}>
                    <div className="input-group input-group-sm">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Spent time in minutes"
                            style={{width: "12rem"}}
                            value={timeSpentInput}
                            onChange={e => setTimeSpentInput(e.target.value)}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-success"><i className="fas fa-save"/></button>
                            <button className="btn btn-outline-dark" onClick={() => setTimeSpentForm(false)}><i
                                className="fas fa-times false"/></button>
                        </div>
                    </div>
                </form>
            )}
            {!timeSpentForm && (
                <div>
                    {status === "open" && (
                        <button className="btn btn-outline-success btn-sm mr-2" onClick={() => setTimeSpentForm(true)}>
                            Add time
                            <i className="fas fa-clock ml-1"/>
                        </button>
                    )}
                    <button className="btn btn-outline-danger btn-sm" onClick={handleRemoveOperation}><i
                        className="fas fa-trash"/></button>
                </div>
            )}
        </li>
    )
}

export default Operation;