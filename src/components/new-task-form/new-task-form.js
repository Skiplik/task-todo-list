import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {

    static propTypes = {
        addNewTask: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.textInput = React.createRef();
    }

    state = {
        todoName: ''
    };

    componentDidMount() {
        this.textInput.current.focus();
    }

    inputInputHandler = (event) => {
        this.setState({
            todoName: event.target.value
        });
    };

    inputEnterPressHandler = (event) => {
        const { todoName } = this.state;
        const { addNewTask } = this.props;

        if (event.code !== "Enter" || !todoName) return;

        addNewTask(todoName);
        this.setState({
            todoName: ''
        });
    };

    render() {
        const { todoName } = this.state;

        return <input
            ref={ this.textInput }
            className="new-todo"
            placeholder="What needs to be done?"
            onInput={ this.inputInputHandler }
            onKeyPress={ this.inputEnterPressHandler }
            value={ todoName } />;
    }
};