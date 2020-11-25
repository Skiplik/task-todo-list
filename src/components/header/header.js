import React from 'react';
import PropTypes from 'prop-types';

import './header.css';

import NewTaskForm from "../new-task-form";

const Header = (props) => {
    const { addNewTask } = props;

    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm
                addNewTask={ addNewTask }/>
        </header>
    );
};

Header.propTypes = {
    addNewTask: PropTypes.func.isRequired
};

export default Header;