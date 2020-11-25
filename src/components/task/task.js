import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

const Task = (props) => {
    const {
        onDelete: deleteBtnClickHandler,
        onCompleted: labelClickHandler,
        task: { description = 'Task description', created, editing = false },
    } = props;

    const getCreatedTime = () => {
        if (!(created instanceof Date)) return '';

        return `created ${formatDistanceToNow(created)} ago`;
    };

    const EditInput = () => (editing ? <input type="text" className="edit" defaultValue={description} /> : null);

    return (
        <>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label role="presentation" onClick={labelClickHandler}>
                    <span className="description">{description}</span>
                    <span className="created">{getCreatedTime()}</span>
                </label>
                <button type="button" aria-label="Edit" className="icon icon-edit" />
                <button
                    type="button"
                    aria-label="Delete"
                    className="icon icon-destroy"
                    onClick={deleteBtnClickHandler}
                />
            </div>
            <EditInput />
        </>
    );
};

Task.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
    // eslint-disable-next-line react/require-default-props
    task: PropTypes.shape({
        description: PropTypes.string,
        created: PropTypes.instanceOf(Date),
        editing: PropTypes.bool,
    }),
};

export default Task;
