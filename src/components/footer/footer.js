import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';

import TaskFilter from '../tasks-filter';

const Footer = (props) => {
    const {
        count,
        filters,
        setFilterTask,
        clearCompletedTasks
    } = props;

    return (
        <footer className="footer">
            <span className="todo-count">{ count } items left</span>
            <TaskFilter
                filters={ filters }
                setFilterTask={ setFilterTask } />
            <button
                type="button"
                className="clear-completed"
                onClick={ clearCompletedTasks } >
                Clear completed
            </button>
        </footer>
    );
}

Footer.defaultProps = {
    filters: []
};

Footer.propTypes = {
    count: PropTypes.number.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })),
    setFilterTask: PropTypes.func.isRequired,
    clearCompletedTasks: PropTypes.func.isRequired
};

export default Footer;