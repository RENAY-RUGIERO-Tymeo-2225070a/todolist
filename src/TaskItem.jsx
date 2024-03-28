import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCalendar } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TaskItem({ task, deleteTask, toggleEditing, editTask, toggleTask }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    return (
        <li key={task.id} className="TaskItem">
            <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => toggleTask(task.id)}
            />
            {task.isEditing ? (
                <input
                    type="text"
                    defaultValue={task.text}
                    onBlur={(e) => editTask(task.id, e.target.value)}
                />
            ) : (
                <span>{task.text}</span>
            )}
            <div className="IconsContainer">
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTask(task.id)} />
                <FontAwesomeIcon icon={faEdit} onClick={() => toggleEditing(task.id)} />
                <FontAwesomeIcon icon={faCalendar} onClick={handleCalendarClick} />
            </div>
            {showCalendar && (
                <div className="CalendarContainer">
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
            )}
            {selectedDate && (
                <div>Date: {selectedDate.toLocaleDateString()}</div>
            )}
        </li>
    );
}

export default TaskItem;
