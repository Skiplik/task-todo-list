import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';

import Task from "../task";

const TaskList = (props) => {
    const {
        tasks,
        onDeleteTask,
        onToggleCompletedTask
    } = props;

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
                    onCompleted={ () => onToggleCompletedTask(id) }
                    task={ task } />
            </li>
        );
    });

    return (
        <ul className="todo-list">
            { items }
        </ul>
    );
};

TaskList.defaultProps = {
    tasks: []
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string,
        created: PropTypes.instanceOf(Date),
        completed: PropTypes.bool,
        editing: PropTypes.bool
    })),
    onDeleteTask: PropTypes.func.isRequired,
    onToggleCompletedTask: PropTypes.func.isRequired
};

export default TaskList;