import Header from '../header/header';
import Footer from '../footer/footer';
import './fgtPwd.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const FgtPwd = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '' });
    const [formDataOTP, setFormDataOTP] = useState({ otp: '' });
    const [formDataChangePassword, setFormDataChangePassword] = useState({ email: '', password: '', confirmPassword: '' });
    const [showEmail, setShowEmail] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string }>({});
    const [errorsOTP, setErrorsOTP] = useState<{ otp?: string }>({});
    const [errorsChangePassword, setErrorsChangePassword] = useState<{ password?: string, confirmPassword?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, name, placeholder } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Validate the input field
        const newErrors = { ...errors };
        if (!value) {
            newErrors[name as keyof typeof newErrors] = `${placeholder} is required`;
        } else
            delete newErrors[name as keyof typeof newErrors];

        setErrors(newErrors);
    };

    const validate = () => {
        const newErrors: { email?: string } = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            await axios.post(serviceUrl + '/forgotPassword', formData)
                .then((response: { data: any; }) => {
                    console.log(response);
                    // var data = response.data.data;
                    toast.success("OTP sent to your email");
                    setShowEmail(false);
                    setShowOTP(true);
                    setShowChangePassword(false);
                })
                .catch((error: any) => {
                    console.error("Error during forgot password:", error);
                    toast.error(error.response.data.message);
                }); // Dispatch the action with form data
        }
    };

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, name, placeholder } = e.target;
        setFormDataOTP((prev) => ({ ...prev, [id]: value }));

        // Validate the input field
        const newErrorsOTP = { ...errorsOTP };
        if (!value) {
            newErrorsOTP[name as keyof typeof newErrorsOTP] = `${placeholder} is required`;
        } else
            delete newErrorsOTP[name as keyof typeof newErrorsOTP];

        setErrorsOTP(newErrorsOTP);
    };

    const validateOTP = () => {
        const newErrors: { otp?: string } = {};
        if (!formDataOTP.otp) {
            newErrors.otp = 'OTP is required';
        }
        if (formDataOTP.otp && formDataOTP.otp.length !== 4) {
            newErrors.otp = 'OTP must be 4 digits';
        }

        setErrorsOTP(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateOTP()) {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            await axios.post(serviceUrl + '/verifyOTP', formDataOTP)
                .then((response: { data: any; }) => {
                    setFormDataChangePassword((prev) => ({ ...prev, email: response.data.data }));
                    toast.success("OTP verified successfully");
                    setShowEmail(false);
                    setShowOTP(false);
                    setShowChangePassword(true);
                })
                .catch((error: any) => {
                    console.error("Error during forgot password:", error);
                    toast.error(error.response.data.message);
                }); // Dispatch the action with form data
        }
    };

    const handleChangePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, name, placeholder } = e.target;
        setFormDataChangePassword((prev) => ({ ...prev, [id]: value }));

        // Validate the input field
        const newErrorsChangePassword = { ...errorsChangePassword };
        if (!value) {
            newErrorsChangePassword[name as keyof typeof newErrorsChangePassword] = `${placeholder} is required`;
        } else
            delete newErrorsChangePassword[name as keyof typeof newErrorsChangePassword];

        setErrorsChangePassword(newErrorsChangePassword);
    };

    const validateChangePassword = () => {
        const newErrors: { password?: string, confirmPassword?: string } = {};

        if (!formDataChangePassword.password) {
            newErrors.password = 'Password is required';
        } else if (formDataChangePassword.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formDataChangePassword.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formDataChangePassword.confirmPassword !== formDataChangePassword.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrorsChangePassword(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateChangePassword()) {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            await axios.post(serviceUrl + '/changePassword', formDataChangePassword)
                .then((response: { data: any; }) => {
                    navigate('/signIn');
                    toast.success(response.data.message);
                })
                .catch((error: any) => {
                    console.error("Error during forgot password:", error);
                    toast.error(error.response.data.message);
                }); // Dispatch the action with form data
        }
    };

    return (
        <>
            <Header />
            <section className="signIn">
                <div className='container'>
                    <div className='row'>
                        {showEmail &&
                            <div className='col-md-6 offset-md-3 col-xl-4 offset-xl-4'>
                                <div id='sign-in-button'></div>
                                <div className="box p-4 shadow-lg">
                                    <h2 className="text-center mb-4">Enter Email</h2>
                                    <form>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && (
                                                <p className="formError">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <button type="submit" className="btnPrimary w-100 mt-2" onClick={handleSubmit}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        }
                        {
                            showOTP &&
                            <div className='col-md-6 offset-md-3 col-xl-4 offset-xl-4'>
                                <div className="box p-4 shadow-lg">
                                    <h2 className="text-center mb-4">Enter OTP</h2>
                                    <form>
                                        <div className="mb-4">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="otp"
                                                name="otp"
                                                placeholder="Enter OTP"
                                                value={formDataOTP.otp}
                                                onChange={handleOTPChange}
                                            />
                                            {errorsOTP.otp && (
                                                <p className="formError">
                                                    {errorsOTP.otp}
                                                </p>
                                            )}
                                        </div>
                                        <button type="submit" className="btnPrimary w-100 mt-2" onClick={handleSubmitOTP}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        }
                        {
                            showChangePassword &&
                            <div className='col-md-6 offset-md-3 col-xl-4 offset-xl-4'>
                                <div className="box p-4 shadow-lg">
                                    <h2 className="text-center mb-4">Enter New Password</h2>
                                    <form>
                                        <div className="mb-4">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                value={formDataChangePassword.password}
                                                onChange={handleChangePasswordChange}
                                            />
                                            {errorsChangePassword.password && (
                                                <p className="formError">
                                                    {errorsChangePassword.password}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                value={formDataChangePassword.confirmPassword}
                                                onChange={handleChangePasswordChange}
                                            />
                                            {errorsChangePassword.confirmPassword && (
                                                <p className="formError">
                                                    {errorsChangePassword.confirmPassword}
                                                </p>
                                            )}
                                        </div>
                                        <button type="submit" className="btnPrimary w-100 mt-2" onClick={handleSubmitChangePassword}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default FgtPwd;