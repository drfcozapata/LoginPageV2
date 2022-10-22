import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import SideBar from './components/Sidebar/Sidebar';
import ProtectedRoutes from './routes/ProtectedRoutes';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<SideBar />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
                <Route element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;
