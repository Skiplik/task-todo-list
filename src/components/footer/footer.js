import React from 'react';

import './footer.css';

import TaskFilter from '../tasks-filter';

const Footer = ({
    count,
    filters,
    setFilterTask,
    clearCompletedTasks
}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{ count } items left</span>
            <TaskFilter
                filters={ filters }
                setFilterTask={ setFilterTask } />
            <button
                className="clear-completed"
                onClick={ clearCompletedTasks } >
                Clear completed
            </button>
        </footer>
    );
}

export default Footer;