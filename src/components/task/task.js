import React from 'react';
import { formatDistance, subMinutes } from 'date-fns'

import './task.css';

const Task = ({
    editable = false,
    description = 'Task description'
}) => {
    let created = `created ${ formatDistance(subMinutes(new Date(), 5), new Date()) } ago`;

    const editInput = () => {
        return <input type="text" className="edit" defaultValue={description} />;
    };

    return (
        <>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{ description }</span>
                    <span className="created">{ created }</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
            { editable && editInput() }
        </>
    );
};

export default Task;