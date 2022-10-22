import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    return isLoggedIn ? <Outlet to="/home" /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
