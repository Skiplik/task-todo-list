import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

const TaskFilter = (props) => {
    const { setFilterTask, filter: selected } = props;
    const filters = ['All', 'Active', 'Completed'];

    const filterBtns = filters.map((filter) => {
        const className = filter === selected ? 'selected' : null;

        return (
            <li key={Math.random().toFixed(4) * 1000}>
                <button type="button" className={className} onClick={() => setFilterTask(filter)}>
                    {filter}
                </button>
            </li>
        );
    });

    return <ul className="filters">{filterBtns}</ul>;
};

TaskFilter.defaultProps = {
    filter: 'All',
};

TaskFilter.propTypes = {
    filter: PropTypes.string,
    setFilterTask: PropTypes.func.isRequired,
};

export default TaskFilter;
