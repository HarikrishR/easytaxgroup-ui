import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home.tsx';
import SignUp from './components/signUp/signUp.tsx';
import SignIn from './components/signIn/signIn.tsx';
import AboutUs from './components/aboutUs/aboutUs.tsx';
import Services from './components/services/services.tsx';
import ContactUs from './components/contactUs/contactUs.tsx';
import Dashboard from './components/dashboard/dashboard.tsx';
import { useContext } from 'react';
import { AuthContext } from './authContext.tsx';
import ProtectedRoute from './protectedRoute.tsx';
import Toast from './components/toast/toast.tsx';

const App = () => {
    const auth = useContext(AuthContext);
    return (
        <>
            <Toast/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/signIn" element={auth?.token ? <Dashboard /> : <SignIn />} />
                <Route path="/signUp" element={auth?.token ? <Dashboard /> : <SignUp />} />
            </Routes>

        </>
    );
}
export default App;