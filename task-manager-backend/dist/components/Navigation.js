"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Navigation = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ style: { margin: '10px', display: 'flex', justifyContent: 'space-between' } }, { children: isAuthenticated ? ((0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleLogout }, { children: "Logout" }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/login", style: { marginRight: '10px' } }, { children: "Login" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/register" }, { children: "Register" }))] })) })));
};
exports.default = Navigation;
