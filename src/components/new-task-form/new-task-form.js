import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
    static propTypes = {
        addNewTask: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.task = React.createRef();
        this.min = React.createRef();
        this.sec = React.createRef();
    }

    state = {
        taskName: '',
        taskMin: '',
        taskSec: '',
    };

    componentDidMount() {
        this.task.current.focus();
    }

    taskNameInputHandler = (event) => {
        this.setState({
            taskName: event.target.value,
        });
    };

    taskMinInputHandler = ({ target: { value } }) => {
        const parseValue = parseInt(value, 10);

        if (value.length && Number.isNaN(parseValue)) return false;

        this.setState({
            taskMin: value.length ? parseValue : '',
        });

        return true;
    };

    taskSecInputHandler = ({ target: { value } }) => {
        const parseValue = parseInt(value, 10);

        if (value.length && Number.isNaN(parseValue)) return false;

        this.setState({
            taskSec: value.length ? parseValue : '',
        });

        return true;
    };

    inputEnterPressHandler = (event) => {
        const { taskName, taskMin, taskSec } = this.state;
        const { addNewTask } = this.props;

        if (event.code !== 'Enter') return;

        if (!taskName.length) {
            this.task.current.focus();
            return;
        }

        let time = 0;

        if (taskMin > 0) {
            time += 60 * taskMin;
        }

        if (taskSec > 0) {
            time += parseInt(taskSec, 10);
        }

        addNewTask(taskName, time);

        this.setState({
            taskName: '',
            taskMin: '',
            taskSec: '',
        });
    };

    render() {
        const { taskName, taskMin, taskSec } = this.state;

        return (
            <form className="new-todo-form">
                <input
                    ref={this.task}
                    type="text"
                    className="new-todo"
                    placeholder="Task"
                    onInput={this.taskNameInputHandler}
                    onKeyPress={this.inputEnterPressHandler}
                    value={taskName}
                />
                <input
                    ref={this.min}
                    className="new-todo-form__timer"
                    placeholder="Min"
                    onInput={this.taskMinInputHandler}
                    onKeyPress={this.inputEnterPressHandler}
                    value={taskMin}
                />
                <input
                    ref={this.sec}
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    onInput={this.taskSecInputHandler}
                    onKeyPress={this.inputEnterPressHandler}
                    value={taskSec}
                    maxLength={2}
                />
            </form>
        );
    }
}
