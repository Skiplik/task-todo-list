import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import Footer from "../footer";
import TaskList from "../task-list";

export default class App extends Component {

    taskId = 0;

    state = {
        filterList: [
            { id: 1, name: 'All', active: true },
            { id: 2, name: 'Active', active: false },
            { id: 3, name: 'Completed', active: false }
        ],
        tasks: [
            this.createTask('Write what needs to be done!'),
            this.createTask('Press enter!'),
            this.createTask('Check new task!')
        ]
    };

    createTask(description) {
        return {
            id: this.taskId++,
            description,
            created: new Date(),
            completed: false,
            editing: false
        }
    };

    addNewTask = (description) => {
        this.setState(({ tasks }) => ({ tasks: [...tasks, this.createTask(description)] }));
    };

    deleteTask = (id) => {
        this.setState(({ tasks }) => {
            let newTasks = tasks.filter(task => task.id !== id);
            return {
                tasks: newTasks
            };
        });
    };

    toggleCompletedTask = (id) => {
        this.setState(({ tasks }) => {
            let newTasks = tasks.map(task => ({
                ...task,
                completed: task.id === id ? !task.completed : task.completed
            }));

            return {
                tasks: newTasks
            };
        });
    };

    setFilterTask = (id) => {
        this.setState(({ filterList }) => {
            let newFilterList = filterList.map(filter => ({
                ...filter,
                active: filter.id === id
            }));

            return {
                filterList: newFilterList
            }
        });
    };

    clearCompletedTasks = () => {
        this.setState(({ tasks }) => ({ tasks: tasks.filter(task => !task.completed) }));
    };

    getFilteredTask = () => {
        const { tasks, filterList } = this.state;
        const filter = filterList.filter(filter => filter.active)[0].name;

        if (filter === 'All') return tasks;

        return tasks.filter(task => filter === 'Completed' ? task.completed : !task.completed );
    };

    getItemCount = () => this.state.tasks.filter(task => !task.completed).length;

    render() {
        const { filterList } = this.state;
        const itemsCount = this.getItemCount();
        const filterTask = this.getFilteredTask();

        return (
            <>
                <Header addNewTask={ this.addNewTask } />
                <section className="main">
                    <TaskList
                        tasks={ filterTask }
                        onDeleteTask={ this.deleteTask }
                        onToggleCompletedTask={ this.toggleCompletedTask } />
                    <Footer
                        count={ itemsCount }
                        filters={ filterList }
                        setFilterTask={ this.setFilterTask }
                        clearCompletedTasks={ this.clearCompletedTasks } />
                </section>
            </>
        );
    };
};