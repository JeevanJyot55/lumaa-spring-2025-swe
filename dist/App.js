"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Navigation_1 = __importDefault(require("./components/Navigation"));
const Login_1 = __importDefault(require("./components/Login"));
const Register_1 = __importDefault(require("./components/Register"));
const TasksPage_1 = __importDefault(require("./components/TasksPage"));
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = (0, react_1.useState)(false);
    // Check for an existing JWT in localStorage
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Navigation_1.default, { isAuthenticated: isAuthenticated, setIsAuthenticated: setIsAuthenticated }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: !isAuthenticated ? (0, jsx_runtime_1.jsx)(Login_1.default, { setIsAuthenticated: setIsAuthenticated }) : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/tasks" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: !isAuthenticated ? (0, jsx_runtime_1.jsx)(Register_1.default, { setIsAuthenticated: setIsAuthenticated }) : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/tasks" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/tasks", element: isAuthenticated ? (0, jsx_runtime_1.jsx)(TasksPage_1.default, {}) : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: isAuthenticated ? "/tasks" : "/login" }) })] })] }));
};
exports.default = App;
