// src/components/TasksPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId?: number;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/tasks',
        { title: newTaskTitle, description: newTaskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      const token = localStorage.getItem('token');
      const updatedTask = { ...task, isComplete: !task.isComplete };
      const response = await api.put(`/tasks/${task.id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Your Tasks</h2>
      <form onSubmit={handleCreateTask}>
        <div>
          <input 
            type="text" 
            placeholder="Task title" 
            value={newTaskTitle} 
            onChange={e => setNewTaskTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Task description (optional)" 
            value={newTaskDescription} 
            onChange={e => setNewTaskDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '10px 0' }}>
            <strong>{task.title}</strong> {task.description && ` - ${task.description}`}
            <br />
            <span>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</span>
            <br />
            <button onClick={() => handleUpdateTask(task)}>
              Mark as {task.isComplete ? 'Incomplete' : 'Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
