import Header from '../header/header';
import Footer from '../footer/footer';
import './signUp.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signUp } from '../../redux/actions/action'; // Adjust the path based on your project structure
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', gender: '', type: 'CLIENT' });
    const [errors, setErrors] = useState<{ name?: string; phoneNumber?: string; email?: string; password?: string; gender?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validate = () => {
        const newErrors: { name?: string; phoneNumber?: string; email?: string; password?: string; gender?: string } = {};
        if (!formData.name) {
            newErrors.name = 'User Name is required';
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

        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
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
                dispatch(signUp(formData));
                console.log('Form submitted successfully', response.data);
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
                                            id="name"
                                            placeholder="User Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <p className="formError">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
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
                                    <div className="mb-4">
                                        <select
                                            className="form-select"
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value=''>Gender</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                            <option value='Others'>Others</option>
                                        </select>
                                        {errors.gender && (
                                            <p className="formError">
                                                {errors.gender}
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