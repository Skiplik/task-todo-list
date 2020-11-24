import React from 'react';

import './task-filter.css';

const TaskFilter = ({ filters, setFilterTask }) => {

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

export default TaskFilter;