"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// src/components/Register.tsx
const react_1 = require("react");
const api_1 = __importDefault(require("../../task-manager-frontend/src/api"));
const react_router_dom_1 = require("react-router-dom");
const Register = ({ setIsAuthenticated }) => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = async (e) => {
        var _a, _b;
        e.preventDefault();
        try {
            await api_1.default.post('/auth/register', { username, password });
            // Auto-login after registration
            const response = await api_1.default.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.access_token);
            setIsAuthenticated(true);
            navigate('/tasks');
        }
        catch (err) {
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Registration failed');
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { margin: '20px' } }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Register" }), error && (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { color: 'red' } }, { children: error })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Username: " }), (0, jsx_runtime_1.jsx)("input", { value: username, onChange: e => setUsername(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Password: " }), (0, jsx_runtime_1.jsx)("input", { type: "password", value: password, onChange: e => setPassword(e.target.value), required: true })] }), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit" }, { children: "Register" }))] }))] })));
};
exports.default = Register;
