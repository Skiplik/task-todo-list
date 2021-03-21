import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';

import Task from '../task';

const TaskList = (props) => {
    const { tasks, onDelete, onUpdateDesc, onUpdateTime, onToggleEdit, onToggleCompleted } = props;

    const items = tasks.map((task) => {
        const { id, completed, editing } = task;
        let className = null;

        if (completed) {
            className = 'completed';
        } else if (editing) {
            className = 'editing';
        }

        return (
            <li key={id} className={className}>
                <Task
                    onDelete={() => onDelete(id)}
                    onEdit={() => onToggleEdit(id)}
                    onCompleted={() => onToggleCompleted(id)}
                    onUpdateDesc={(desc) => onUpdateDesc(id, desc)}
                    onUpdateTime={(time) => onUpdateTime(id, time)}
                    task={task}
                />
            </li>
        );
    });

    return <ul className="todo-list">{items}</ul>;
};

TaskList.defaultProps = {
    tasks: [],
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string,
            time: PropTypes.number,
            created: PropTypes.instanceOf(Date),
            completed: PropTypes.bool,
            editing: PropTypes.bool,
        })
    ),
    onDelete: PropTypes.func.isRequired,
    onUpdateDesc: PropTypes.func.isRequired,
    onUpdateTime: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
};

export default TaskList;
