import React from 'react';

import './footer.css';

import TaskFilter from '../tasks-filter';

const Footer = ({ count }) => {
    return (
        <footer className="footer">
            <span className="todo-count">{ count } items left</span>
            <TaskFilter />
            <button className="clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;