import React from 'react';

import './task-list.css';

import Task from "../task";

const TaskList = () => {
    return (
        <ul className="todo-list">
            <li className="completed">
                <Task />
            </li>
            <li className="editing">
                <Task editable />
            </li>
            <li>
                <Task />
            </li>
        </ul>
    );
};

export default TaskList;