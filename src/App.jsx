import React, { useState, useEffect } from 'react';
import './App.css';
import TaskItem from './TaskItem';
import TaskControls from './TaskControls';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        console.log('Tâches chargées depuis le localStorage :', storedTasks);
        if (storedTasks && Array.isArray(storedTasks)) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.trim()) return;
        const newTaskObj = { id: Date.now(), text: newTask, isEditing: false, isChecked: false };
        setTasks(prevTasks => [...prevTasks, newTaskObj]);
        setNewTask('');
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const toggleEditing = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, isEditing: !task.isEditing } : task
            )
        );
    };

    const editTask = (id, newText) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, text: newText, isEditing: false } : task
            )
        );
    };

    const toggleTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    };

    return (
        <div className="App">
            <h1>TO DO LIST</h1>
            <TaskControls
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
            />
            <ul>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleEditing={toggleEditing}
                        editTask={editTask}
                        toggleTask={toggleTask}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
