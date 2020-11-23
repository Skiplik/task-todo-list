import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import Footer from "../footer";
import TaskList from "../task-list";

export default class App extends Component {

    taskId = 0;

    state = {
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

    completedTask = (id) => {
        this.setState(({ tasks }) => {
            let newTasks = tasks.map(task => {
                if (task.id === id) {
                    let newTask = { ...task };
                    newTask.completed = !newTask.completed;
                    return newTask;
                }
                return task;
            });
            return {
                tasks: newTasks
            };
        });
    };

    render() {

        let { tasks } = this.state;
        let itemsCount = tasks.filter(task => !task.completed).length;

        return (
            <>
                <Header addNewTask={ this.addNewTask } />
                <section className="main">
                    <TaskList
                        tasks={tasks}
                        onDeleteTask={ this.deleteTask }
                        onCompletedTask={ this.completedTask } />
                    <Footer count={ itemsCount } />
                </section>
            </>
        );
    };
};