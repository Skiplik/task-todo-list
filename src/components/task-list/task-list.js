import React from 'react';

import './task-list.css';

import Task from "../task";

const TaskList = ({ tasks, onDeleteTask, onCompletedTask }) => {

    const items = tasks.map(task => {
        let { id, completed, editing } = task;
        let className = null;

        if (completed) {
            className = 'completed';
        } else if (editing) {
            className = 'editing';
        }

        return (
            <li key={id} className={className} >
                <Task
                    onDelete={ () => onDeleteTask(id) }
                    onCompleted={ () => onCompletedTask(id) }
                    task={task} />
            </li>
        );
    });

    return (
        <ul className="todo-list">
            { items }
        </ul>
    );
};

export default TaskList;