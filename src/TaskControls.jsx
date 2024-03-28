// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function TaskControls({ newTask, setNewTask, addTask }) {
    return (
        <div>
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Ajoutez une nouvelle tâche..."
            />
            <button onClick={addTask}>Ajouter</button>
        </div>
    );
}

export default TaskControls;
