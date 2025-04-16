import Header from '../header/header';
import Footer from '../footer/footer';
import './signIn.css'
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { userData } from '../../redux/actions/action'; // Adjust the path based on your project structure
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
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
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            await axios.post(serviceUrl + '/signin', formData)
            .then((response: { data: any; }) => {
                var data = response.data.data;
                localStorage.setItem('userData', JSON.stringify(data));
                dispatch(userData(data));
                const encryptedType = btoa(data.type); // Encrypt the type
                auth?.login(data.userId, encryptedType, data.token);
                navigate('/dashboard');
                toast.success("Login successful");
            })
            .catch((error: any) => {
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
                        <div className='col-md-6 offset-md-3 col-xl-4 offset-xl-4'>
                            <div className="box p-4 shadow-lg">
                                <h2 className="text-center mb-4">Login</h2>
                                <form>
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
                                    <button type="submit" className="btnPrimary w-100 mt-2" onClick={handleSubmit}>Login</button>
                                </form>
                                <div className="text-center mt-4">
                                    <p className='mb-0'>Don't have a account? <Link to='/signUp'>Sign Up</Link></p>
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

export default SignIn;