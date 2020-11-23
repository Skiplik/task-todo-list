import React from 'react';

import './header.css';

import NewTaskForm from "../new-task-form";

const Header = ({ addNewTask }) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm
                addNewTask={ addNewTask }/>
        </header>
    );
};

export default Header;