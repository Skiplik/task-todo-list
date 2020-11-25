import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

const TaskFilter = (props) => {
    const {
        filters,
        setFilterTask
    } = props;

    const filterBtns = filters.map(filter => {
        let className = filter.active ? 'selected' : null;

        return (
            <li key={ filter.id } >
                <button
                    className={ className }
                    onClick={ () => setFilterTask(filter.id) }>
                    { filter.name }
                </button>
            </li>
        );
    });

    return (
        <ul className="filters">
            { filterBtns }
        </ul>
    );
};

TaskFilter.defaultProps = {
    filters: []
};

TaskFilter.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })),
    setFilterTask: PropTypes.func.isRequired
};

export default TaskFilter;