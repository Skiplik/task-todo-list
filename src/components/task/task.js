import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

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
            created: PropTypes.instanceOf(Date),
            editing: PropTypes.bool,
            completed: PropTypes.bool,
        }),
    };

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        if (this.textInput.current) this.textInput.current.focus();
    }

    componentDidUpdate() {
        if (this.textInput.current) this.textInput.current.focus();
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

    render() {
        const {
            task: { editing = false, completed = false, description = 'Task description' },
            onCompleted: toggleCompleteHandler,
            onDelete: deleteBtnClickHandler,
        } = this.props;

        return (
            <>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed} onChange={toggleCompleteHandler} />
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{this.getCreatedTime()}</span>
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
