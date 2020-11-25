import React from 'react';
import { formatDistanceToNow } from 'date-fns'

import './task.css';

const Task = ({
    onDelete: deleteBtnClickHandler,
    onCompleted: labelClickHandler,
    task: {
        description = 'Task description',
        created,
        editing = false
    }
}) => {
    let createdString = '';
    let createdDate = created ? new Date(created) : null;

    if (createdDate && createdDate.toString() !== 'Invalid Date') {
        createdString = `created ${ formatDistanceToNow(createdDate) } ago`;
    }

    const EditInput = () => editing ? <input type="text" className="edit" defaultValue={description} /> : null;

    return (
        <>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label onClick={ labelClickHandler }>
                    <span className="description">{ description }</span>
                    <span className="created">{ createdString }</span>
                </label>
                <button className="icon icon-edit"></button>
                <button onClick={ deleteBtnClickHandler } className="icon icon-destroy"></button>
            </div>
            <EditInput />
        </>
    );
};

export default Task;