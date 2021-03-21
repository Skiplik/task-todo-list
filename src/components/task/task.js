import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow, format } from 'date-fns';

import './task.css';

export default class Task extends Component {
    static propTypes = {
        onDelete: PropTypes.func.isRequired,
        onCompleted: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onUpdateDesc: PropTypes.func.isRequired,
        // eslint-disable-next-line react/require-default-props
        task: PropTypes.shape({
            description: PropTypes.string,
            time: PropTypes.number,
            created: PropTypes.instanceOf(Date),
            editing: PropTypes.bool,
            completed: PropTypes.bool,
        }),
    };

    constructor(props) {
        super(props);

        this.textInput = React.createRef();

        const {
            task: { time = 0 },
        } = this.props;

        this.state = {
            created: this.getCreatedTime(),
            timer: time,
        };
    }

    componentDidMount() {
        this.creationTimer = setInterval(() => {
            this.setState({
                created: this.getCreatedTime(),
            });
        }, 60 * 1000);

        if (this.textInput.current) this.textInput.current.focus();
    }

    componentDidUpdate() {
        if (this.textInput.current) this.textInput.current.focus();
    }

    componentWillUnmount() {
        clearInterval(this.creationTimer);
        this.pauseTask();
    }

    editBtnClickHandler = () => {
        const {
            task: { completed = false },
            onEdit,
        } = this.props;

        if (completed) return;

        onEdit();
    };

    editInputUpKeyHandler = (event) => {
        const { onEdit, onUpdateDesc } = this.props;

        if (!['Enter', 'Escape'].includes(event.code)) return;

        if (event.code === 'Enter') onUpdateDesc(event.target.value);

        onEdit();
    };

    getCreatedTime = () => {
        const {
            task: { created },
        } = this.props;

        if (!(created instanceof Date)) return '';

        return `created ${formatDistanceToNow(created)} ago`;
    };

    getRunTime = (time) => {
        return format(new Date(time * 1000), 'mm:ss');
    };

    playTask = () => {
        this.setState(({ timer }) => ({ timer: timer - 1 }));

        this.runTimer = setInterval(() => {
            this.setState(({ timer }) => {
                const newTime = timer - 1;

                if (!newTime) {
                    clearInterval(this.runTimer);
                }

                return { timer: timer - 1 };
            });
        }, 1000);
    };

    pauseTask = () => {
        clearInterval(this.runTimer);
    };

    render() {
        const {
            task: { editing = false, completed = false, description = 'Task description' },
            onCompleted: toggleCompleteHandler,
            onDelete: deleteBtnClickHandler,
        } = this.props;

        const { created, timer } = this.state;

        const runTime = this.getRunTime(timer);

        return (
            <>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed} onChange={toggleCompleteHandler} />
                    <label>
                        <span className="title">{description}</span>
                        <span className="description">
                            <button
                                type="button"
                                aria-label="Play"
                                className="icon icon-play"
                                onClick={this.playTask}
                            />
                            <button
                                type="button"
                                aria-label="Pause"
                                className="icon icon-pause"
                                onClick={this.pauseTask}
                            />
                            {runTime}
                        </span>
                        <span className="description">{created}</span>
                    </label>
                    <button
                        type="button"
                        aria-label="Edit"
                        className="icon icon-edit"
                        onClick={this.editBtnClickHandler}
                    />
                    <button
                        type="button"
                        aria-label="Delete"
                        className="icon icon-destroy"
                        onClick={deleteBtnClickHandler}
                    />
                </div>
                {editing && (
                    <input
                        ref={this.textInput}
                        type="text"
                        className="edit"
                        defaultValue={description}
                        onKeyUp={this.editInputUpKeyHandler}
                    />
                )}
            </>
        );
    }
}
