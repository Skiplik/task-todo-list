import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';

import TaskFilter from '../tasks-filter';

const Footer = (props) => {
    const { count, filter, setFilterTask, clearCompletedTasks } = props;

    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <TaskFilter filter={filter} setFilterTask={setFilterTask} />
            <button type="button" className="clear-completed" onClick={clearCompletedTasks}>
                Clear completed
            </button>
        </footer>
    );
};

Footer.defaultProps = {
    filter: 'All',
};

Footer.propTypes = {
    count: PropTypes.number.isRequired,
    filter: PropTypes.string,
    setFilterTask: PropTypes.func.isRequired,
    clearCompletedTasks: PropTypes.func.isRequired,
};

export default Footer;
