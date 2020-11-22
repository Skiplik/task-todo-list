import React from 'react';

import './app.css';

import Header from '../header';
import Footer from "../footer";
import TaskList from "../task-list";

const App = () => {
    return (
        <>
            <Header />
            <section className="main">
                <TaskList />
                <Footer />
            </section>
        </>
    );
};

export default App;