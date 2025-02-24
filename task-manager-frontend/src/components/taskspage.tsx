import React, { useEffect, useState } from 'react';
import api from '../api';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>('/tasks', {
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
      const response = await api.post<Task>(
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
      const updatedTask = { ...task, isComplete: !task.isComplete };
      const response = await api.put<Task>(
        `/tasks/${task.id}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
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
      <form
        onSubmit={handleCreateTask}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}
      >
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          required
          style={{
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="Task description (optional)"
          value={newTaskDescription}
          onChange={e => setNewTaskDescription(e.target.value)}
          style={{
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
          }}
        >
          Create Task
        </button>
      </form>
      <hr />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              margin: '10px 0',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            <strong>{task.title}</strong>
            {task.description && ` - ${task.description}`}
            <br />
            <span>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</span>
            <br />
            <button
              onClick={() => handleUpdateTask(task)}
              style={{ marginRight: '10px' }}
            >
              {task.isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
