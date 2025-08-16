import Header from '../header/header';
import Footer from '../footer/footer';
import './signUp.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ firstName: '', lastName : '', phoneNumber: '', email: '', password: '', type: 'CLIENT' });
    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; phoneNumber?: string; email?: string; password?: string; }>({});

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
        const newErrors: { firstName?: string; lastName?: string; phoneNumber?: string; email?: string; password?: string; } = {};
        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last Name is required';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Dispatch form values to action signIn
            console.log("Form submitted successfully:", formData);

            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            await axios.post(serviceUrl + '/signup', formData)
            .then((response: { data: any; }) => {
                navigate('/signIn');
                toast.success(response.data.message);
            })
            .catch((error: any) => {
                toast.error(error.response.data.message);
                console.error('Error submitting form', error);
            });
             // Dispatch the action with form data
        }
    };

    return (
        <>
            <Header />
            <section className="signIn">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xl-4 offset-xl-4'>
                            <div className="box p-4 shadow-lg">
                                <h2 className="text-center mb-4">Create a account</h2>
                                <form>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        {errors.firstName && (
                                            <p className="formError">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        {errors.lastName && (
                                            <p className="formError">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="Phone Number"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                        {errors.phoneNumber && (
                                            <p className="formError">
                                                {errors.phoneNumber}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <p className="formError">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && (
                                            <p className="formError">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <button type="submit" className="btnPrimary w-100 mt-2" onClick={handleSubmit}>Sign Up</button>
                                </form>
                                <div className="text-center mt-4">
                                    <p className='mb-0'>Alreay having an account? <Link to='/signIn'>Sign In</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SignUp;