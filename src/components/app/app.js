import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import Footer from '../footer';
import TaskList from '../task-list';

export default class App extends Component {
    taskId = 0;

    state = {
        filter: 'All',
        tasks: [
            this.createTask('Write what needs to be done!'),
            this.createTask('Press enter!'),
            this.createTask('Check new task!'),
        ],
    };

    addNewTask = (description) => {
        this.setState(({ tasks }) => ({ tasks: [...tasks, this.createTask(description)] }));
    };

    updateTaskOption = (id, key, value) => {
        this.setState(({ tasks }) => {
            const newTasks = tasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        [key]: value !== undefined ? value : !task[key],
                    };
                }
                return task;
            });
            return {
                tasks: newTasks,
            };
        });
    };

    saveTaskDescription = (id, desc) => {
        this.updateTaskOption(id, 'description', desc);
    };

    toggleCompletedTask = (id) => {
        this.updateTaskOption(id, 'completed');
    };

    deleteTask = (id) => {
        this.setState(({ tasks }) => {
            const newTasks = tasks.filter((task) => task.id !== id);
            return {
                tasks: newTasks,
            };
        });
    };

    toggleEditingTask = (id) => {
        this.updateTaskOption(id, 'editing');
        this.setState(({ tasks }) => {
            const newTasks = tasks.map((task) => ({
                ...task,
                editing: task.id === id ? task.editing : false,
            }));

            return {
                tasks: newTasks,
            };
        });
    };

    setFilterTask = (filter) => {
        this.setState({ filter });
    };

    getFilteredTask = () => {
        const { tasks, filter } = this.state;

        if (filter === 'All') return tasks;

        return tasks.filter((task) => (filter === 'Completed' ? task.completed : !task.completed));
    };

    clearCompletedTasks = () => {
        this.setState(({ tasks }) => ({ tasks: tasks.filter((task) => !task.completed) }));
    };

    getTasksCount = () => {
        const { tasks } = this.state;
        return tasks.filter((task) => !task.completed).length;
    };

    createTask(description) {
        this.taskId += 1;

        return {
            id: this.taskId,
            description,
            created: new Date(),
            completed: false,
            editing: false,
        };
    }

    render() {
        const { filter } = this.state;
        const tasksCount = this.getTasksCount();
        const filterTask = this.getFilteredTask();

        return (
            <>
                <Header addNewTask={this.addNewTask} />
                <section className="main">
                    <TaskList
                        tasks={filterTask}
                        onDelete={this.deleteTask}
                        onUpdateDesc={this.saveTaskDescription}
                        onToggleEdit={this.toggleEditingTask}
                        onToggleCompleted={this.toggleCompletedTask}
                    />
                    <Footer
                        count={tasksCount}
                        filter={filter}
                        setFilterTask={this.setFilterTask}
                        clearCompletedTasks={this.clearCompletedTasks}
                    />
                </section>
            </>
        );
    }
}
