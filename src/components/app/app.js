import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import Footer from "../footer";
import TaskList from "../task-list";

export default class App extends Component {

    state = {
        tasks: [
            { id: 1, description: 'First todo', created: 1606049973109, completed: false, editing: false },
            { id: 2, description: 'Second todo', created: 1606049973109, completed: false, editing: false },
            { id: 3, description: 'Third todo', created: 1606049973109, completed: false, editing: false }
        ]
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
                <Header />
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