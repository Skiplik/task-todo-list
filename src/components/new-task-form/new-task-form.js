import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {

    static propTypes = {
        addNewTask: PropTypes.func.isRequired
    };

    state = {
        todoName: ''
    };

    inputInputHandler = (event) => {
        this.setState({
            todoName: event.target.value
        });
    };

    inputEnterPressHandler = (event) => {
        if (event.code !== "Enter" || !this.state.todoName) return;

        this.props.addNewTask(this.state.todoName);
        this.setState({
            todoName: ''
        });
    };

    render() {
        const { todoName } = this.state;

        return <input
            className="new-todo"
            placeholder="What needs to be done?"
            onInput={ this.inputInputHandler }
            onKeyPress={ this.inputEnterPressHandler }
            value={ todoName }
            autoFocus />;
    }
};