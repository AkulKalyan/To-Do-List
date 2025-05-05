import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [reminder, setReminder] = useState('');

  // Load tasks from local storage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toISOString(),
        reminder: reminder ? new Date(reminder).toISOString() : null
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setReminder('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="App" style={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      color: '#e0e0e0',
      padding: '20px'
    }}>
      <h1 style={{ color: '#bb86fc' }}>To-Do List</h1>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={{
            backgroundColor: '#1e1e1e',
            color: '#e0e0e0',
            border: '1px solid #bb86fc',
            padding: '10px',
            marginRight: '10px',
            flex: 1
          }}
        />
        <input 
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          style={{
            backgroundColor: '#1e1e1e',
            color: '#e0e0e0',
            border: '1px solid #03dac6',
            padding: '10px',
            marginRight: '10px'
          }}
        />
        <button 
          onClick={addTask}
          style={{
            backgroundColor: '#bb86fc',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Add Task
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{ 
            backgroundColor: filter === 'all' ? '#bb86fc' : '#1e1e1e', 
            color: filter === 'all' ? '#000' : '#e0e0e0',
            margin: '0 10px',
            padding: '10px',
            border: '1px solid #bb86fc'
          }}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          style={{ 
            backgroundColor: filter === 'active' ? '#bb86fc' : '#1e1e1e', 
            color: filter === 'active' ? '#000' : '#e0e0e0',
            margin: '0 10px',
            padding: '10px',
            border: '1px solid #bb86fc'
          }}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{ 
            backgroundColor: filter === 'completed' ? '#bb86fc' : '#1e1e1e', 
            color: filter === 'completed' ? '#000' : '#e0e0e0',
            margin: '0 10px',
            padding: '10px',
            border: '1px solid #bb86fc'
          }}
        >
          Completed
        </button>
      </div>

      <div>
        {filteredTasks.map(task => (
          <div 
            key={task.id} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#1e1e1e',
              padding: '10px',
              marginBottom: '10px',
              borderLeft: task.completed 
                ? '4px solid #03dac6' 
                : task.reminder && new Date(task.reminder) < new Date() 
                  ? '4px solid #cf6679' 
                  : '4px solid #bb86fc'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#6c757d' : '#e0e0e0'
              }}>
                {task.text}
                {task.reminder && (
                  <span style={{ 
                    marginLeft: '10px', 
                    fontSize: '0.8em', 
                    color: new Date(task.reminder) < new Date() ? '#cf6679' : '#03dac6' 
                  }}>
                    Reminder: {new Date(task.reminder).toLocaleString()}
                  </span>
                )}
              </span>
            </div>
            <button 
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: '#cf6679',
                color: '#000',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
