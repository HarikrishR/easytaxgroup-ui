import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home.tsx';
import SignUp from './components/signUp/signUp.tsx';
import SignIn from './components/signIn/signIn.tsx';
import AboutUs from './components/aboutUs/aboutUs.tsx';
import Services from './components/services/services.tsx';
import ContactUs from './components/contactUs/contactUs.tsx';
import Dashboard from './components/dashboard/dashboard.tsx';
import PDFGenerate from './components/pdfGeneration/pdfGenerate.tsx';
import FgtPwd from './components/forgotPassword/fgtPwd.tsx';
import { useContext } from 'react';
import { AuthContext } from './authContext.tsx';
import ProtectedRoute from './protectedRoute.tsx';
import Toast from './components/toast/toast.tsx';
import Loader from './components/loader/loader.tsx';
import { useSelector } from 'react-redux';
import StripeCheckoutForm from './components/payment/stripElement.tsx';
import UsDotApplication from './components/usDotApplication/usDotApplication.tsx';
import BusinessRegistration from './components/businessRegistration/businessRegistration.tsx';
import FormF1Visa from './components/formF1Visa/formF1Visa.tsx';

const App = () => {
    const loader = useSelector((state: any) => state.loader);
    const { loading } = useSelector((state: any) => state.clientSecretSettings);
    const auth = useContext(AuthContext);
    return (
        <>
            <Toast/>
            { loading ? '' : <StripeCheckoutForm/> }
            { loader ? <Loader/> : ''}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/fmcsacompliance" element={<UsDotApplication />} />
                <Route path="/businessRegService" element={<BusinessRegistration />} />
                <Route path="/formf1visa" element={<FormF1Visa />} />
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
                <Route path="/fgtPwd" element={auth?.token ? <Dashboard /> : <FgtPwd />} />
            </Routes>
            <PDFGenerate/>
        </>
    );
}
export default App;