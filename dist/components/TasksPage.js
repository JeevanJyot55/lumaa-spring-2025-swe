"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// src/components/TasksPage.tsx
const react_1 = require("react");
const api_1 = __importDefault(require("../api"));
const TasksPage = () => {
    const [tasks, setTasks] = (0, react_1.useState)([]);
    const [newTaskTitle, setNewTaskTitle] = (0, react_1.useState)('');
    const [newTaskDescription, setNewTaskDescription] = (0, react_1.useState)('');
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api_1.default.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        }
        catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchTasks();
    }, []);
    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await api_1.default.post('/tasks', { title: newTaskTitle, description: newTaskDescription }, { headers: { Authorization: `Bearer ${token}` } });
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
            setNewTaskDescription('');
        }
        catch (err) {
            console.error('Error creating task:', err);
        }
    };
    const handleUpdateTask = async (task) => {
        try {
            const token = localStorage.getItem('token');
            const updatedTask = Object.assign(Object.assign({}, task), { isComplete: !task.isComplete });
            const response = await api_1.default.put(`/tasks/${task.id}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
        }
        catch (err) {
            console.error('Error updating task:', err);
        }
    };
    const handleDeleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await api_1.default.delete(`/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter(t => t.id !== taskId));
        }
        catch (err) {
            console.error('Error deleting task:', err);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { margin: '20px' } }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Your Tasks" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleCreateTask }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Task title", value: newTaskTitle, onChange: e => setNewTaskTitle(e.target.value), required: true }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Task description (optional)", value: newTaskDescription, onChange: e => setNewTaskDescription(e.target.value) }) }), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit" }, { children: "Create Task" }))] })), (0, jsx_runtime_1.jsx)("ul", { children: tasks.map(task => ((0, jsx_runtime_1.jsxs)("li", Object.assign({ style: { margin: '10px 0' } }, { children: [(0, jsx_runtime_1.jsx)("strong", { children: task.title }), " ", task.description && ` - ${task.description}`, (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: ["Status: ", task.isComplete ? 'Complete' : 'Incomplete'] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("button", Object.assign({ onClick: () => handleUpdateTask(task) }, { children: ["Mark as ", task.isComplete ? 'Incomplete' : 'Complete'] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleDeleteTask(task.id) }, { children: "Delete" }))] }), task.id))) })] })));
};
exports.default = TasksPage;
