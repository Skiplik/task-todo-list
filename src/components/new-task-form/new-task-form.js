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

    inputInputHandler = (event, field) => {
        this.setState({
            [field]: event.target.value,
        });
    };

    inputEnterPressHandler = (event) => {
        const { taskName, taskMin, taskSec } = this.state;
        const { addNewTask } = this.props;

        if (event.code !== 'Enter' || !this.checkFullness()) return;

        const time = 60 * taskMin + parseInt(taskSec, 10);

        addNewTask(taskName, time);

        this.setState({
            taskName: '',
            taskMin: '',
            taskSec: '',
        });
    };

    checkFullness() {
        const { taskName, taskMin, taskSec } = this.state;

        if (!taskName.length) {
            this.task.current.focus();
            return false;
        }

        if (!taskMin.length || Number.isNaN(parseInt(taskMin, 10))) {
            this.min.current.value = '';
            this.min.current.focus();
            return false;
        }

        if (!taskSec.length || Number.isNaN(parseInt(taskSec, 10))) {
            this.sec.current.value = '';
            this.sec.current.focus();
            return false;
        }

        return true;
    }

    render() {
        const { taskName, taskMin, taskSec } = this.state;

        return (
            <form className="new-todo-form">
                <input
                    ref={this.task}
                    type="text"
                    className="new-todo"
                    placeholder="Task"
                    onInput={(event) => {
                        this.inputInputHandler(event, 'taskName');
                    }}
                    onKeyPress={this.inputEnterPressHandler}
                    value={taskName}
                />
                <input
                    ref={this.min}
                    className="new-todo-form__timer"
                    placeholder="Min"
                    onInput={(event) => {
                        this.inputInputHandler(event, 'taskMin');
                    }}
                    onKeyPress={this.inputEnterPressHandler}
                    value={taskMin}
                />
                <input
                    ref={this.sec}
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    onInput={(event) => {
                        this.inputInputHandler(event, 'taskSec');
                    }}
                    onKeyPress={this.inputEnterPressHandler}
                    value={taskSec}
                />
            </form>
        );
    }
}
