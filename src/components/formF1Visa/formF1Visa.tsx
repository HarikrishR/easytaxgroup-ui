import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../header/header';
import Footer from '../footer/footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { get_loader } from '../../redux/actions/action';
import "./formF1Visa.css"
import logo from '../../assets/titleLogo.png';

// Define the shape for form data
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    visaStatus: string;
    stateOfResidency: string;
    referalName: string;
    referalPhoneNumber: string;
}

// Define the shape for errors
type FormErrors = Partial<Record<keyof FormData, string>> ;

const FormF1Visa = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const authContext = useContext(AuthContext);

    // Extract user from auth context
    // const user = authContext?.user || null;

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        visaStatus: '',
        stateOfResidency: '',
        referalName: '',
        referalPhoneNumber: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Validate the input field
        const newErrors = { ...errors };
        if (!value) {
            const placeholder = (e.target as HTMLInputElement).placeholder || id;
            newErrors[id as keyof typeof newErrors] = `${placeholder} is required`;
        } else
            delete newErrors[id as keyof typeof newErrors];

        setErrors(newErrors);
    };

    const validate = () => {
        const newErrors: FormErrors = {};

        // Required text/select fields validation
        (['firstName', 'lastName', 'email', 'phoneNumber', 'visaStatus', 'stateOfResidency', 'referalName', 'referalPhoneNumber'] as Array<keyof FormData>).forEach(key => {
            if (!formData[key] || formData[key] === '') {
                const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                newErrors[key] = `${displayKey} is required.`;
            }
        });

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            dispatch(get_loader(true));
            try {
                const serviceUrl = import.meta.env.VITE_SERVICE_URL;

                await axios.post(serviceUrl + '/formf1Registration', formData);

                toast.success('Application submitted successfully!');

                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    visaStatus: '',
                    stateOfResidency: '',
                    referalName: '',
                    referalPhoneNumber: '',
                });
                setErrors({});
            } catch (error: any) {
                dispatch(get_loader(false));
                toast.error(error.response?.data?.message || 'An error occurred');
            } finally {
                dispatch(get_loader(false));
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
            <Header />
            <section className="formF1Visa">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1 col-xl-6 offset-xl-3'>
                            <div className="box p-4 shadow-lg">
                                <div className="text-center mb-2">
                                    <img src={logo} className='logo' />
                                </div>
                                <h2 className="mb-4 text-center">Form F1 Visa</h2>
                                <form className="row g-3">
                                    {/* First Name */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="First Name" id="firstName" value={formData.firstName}
                                            onChange={handleChange} required />
                                        {errors.firstName && (
                                            <p className="formError">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="Last Name" id="lastName" value={formData.lastName}
                                            onChange={handleChange} required />
                                        {errors.lastName && (
                                            <p className="formError">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6 mb-2">
                                        <input type="email" className="form-control" id="email" placeholder="Email" value={formData.email}
                                            onChange={handleChange} required />
                                        {errors.email && (
                                            <p className="formError">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Area Code and Phone Number */}
                                    <div className="col-md-6 mb-2">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="phoneNumber"
                                                placeholder="Phone Number"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        {errors.phoneNumber && (
                                            <p className="formError">{errors.phoneNumber}</p>
                                        )}
                                    </div>

                                    {/* Visa Status */}
                                    <div className="col-md-6 mb-2">
                                        <select className="form-select" id="visaStatus" value={formData.visaStatus} onChange={handleChange} required >
                                            <option value="" disabled>Select Visa Status</option>
                                            <option value="F1">F1</option>
                                            <option value="F1-OPT">F1-OPT</option>
                                            <option value="F1-STEM OPT">F1-STEM OPT</option>
                                            <option value="H1B">H1B</option>
                                            <option value="H1B">H4-EAD</option>
                                            <option value="H1B">H4-EAD</option>
                                            <option value="Green Card">Green Card</option>
                                            <option value="Citizen">Citizen</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.visaStatus && (
                                            <p className="formError">
                                                {errors.visaStatus}
                                            </p>
                                        )}
                                    </div>

                                    {/* state of Residency */}
                                    <div className="col-md-6 mb-2">
                                        <input type="string" className="form-control" id="stateOfResidency" placeholder="State Of Residency" value={formData.stateOfResidency}
                                            onChange={handleChange} required />
                                        {errors.stateOfResidency && (
                                            <p className="formError">
                                                {errors.stateOfResidency}
                                            </p>
                                        )}
                                    </div>

                                    <div className='col-12'>
                                        <h5 className="mb-2">Referal Contact</h5>
                                        <p className='mb-0 des'>Receive $10 for every successful referral. New referrals receive a $10 discount.</p>
                                    </div>

                                    {/* Referal Name*/}
                                    <div className="col-md-6 mb-2">
                                        <input type="string" className="form-control" id="referalName" placeholder="Referal Name" value={formData.referalName}
                                            onChange={handleChange} required />
                                        {errors.referalName && (
                                            <p className="formError">
                                                {errors.referalName}
                                            </p>
                                        )}
                                    </div>
                                    

                                    {/* Referal Phone Number*/}
                                    <div className="col-md-6 mb-2">
                                        <input type="string" className="form-control" id="referalPhoneNumber" placeholder="Referal Number" value={formData.referalPhoneNumber}
                                            onChange={handleChange} required />
                                        {errors.referalPhoneNumber && (
                                            <p className="formError">
                                                {errors.referalPhoneNumber}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="offset-md-6 col-md-6 mt-4">
                                        <button type="submit" className="btnPrimary w-100 mt-4" onClick={handleSubmit} disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default FormF1Visa;