import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../header/header';
import Footer from '../footer/footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { get_loader } from '../../redux/actions/action';
import "./businessRegistration.css"
import logo from '../../assets/titleLogo.png';

// Define the shape for form data
interface FormData {
    businessName: string;
    businessType: string;
    businessAddressLineOne: string;
    businessAddressLineTwo: string;
    businessAddressCity: string;
    businessAddressState: string;
    businessAddressZip: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    ssn: string;
    secoundaryFirstName: string;
    secoundaryLastName: string;
    secoundaryEmail: string;
    secoundaryPhoneNumber: string;
    secoundarySSN: string;
}

// Define the shape for errors
type FormErrors = Partial<Record<keyof FormData, string>> & {
    primaryDiversLicense?: string;
    secondaryDiversLicense?: string;
};

const BusinessRegistration = () => {

    const [showOtherInput, setShowOtherInput] = useState(false);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const authContext = useContext(AuthContext);

    // Extract user from auth context
    // const user = authContext?.user || null;

    const [formData, setFormData] = useState<FormData>({
        businessName: '',
        businessType: '',
        businessAddressLineOne: '',
        businessAddressLineTwo: '',
        businessAddressCity: '',
        businessAddressState: '',
        businessAddressZip: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        ssn: '',
        secoundaryFirstName: '',
        secoundaryLastName: '',
        secoundaryEmail: '',
        secoundaryPhoneNumber: '',
        secoundarySSN: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [files, setFiles] = useState<{ primaryDiversLicense: File | null, secondaryDiversLicense: File | null }>({
        primaryDiversLicense: null,
        secondaryDiversLicense: null,
    });
    const [fileNames, setFileNames] = useState<{ primaryDiversLicense: string, secondaryDiversLicense: string }>({
        primaryDiversLicense: '',
        secondaryDiversLicense: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBusinessTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'Others') {
            setShowOtherInput(true);
            // Clear the value so the user is forced to type a custom type
            setFormData((prev) => ({ ...prev, businessType: '' }));
        } else {
            setShowOtherInput(false);
            setFormData((prev) => ({ ...prev, businessType: value }));
            
            // Clear errors if a valid option is picked
            const newErrors = { ...errors };
            delete newErrors.businessType;
            setErrors(newErrors);
        }
    };

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

    const generateUniqueFileName = (originalFile: File): string => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const fileExtension = originalFile.name.split('.').pop();
        return `${timestamp}_${randomString}.${fileExtension}`;
    };

    const handleFileChange = (fileType: 'primaryDiversLicense' | 'secondaryDiversLicense', file: File | null) => {
        if (file) {
            const uniqueName = generateUniqueFileName(file);
            setFiles((prev) => ({ ...prev, [fileType]: file }));
            setFileNames((prev) => ({ ...prev, [fileType]: uniqueName }));

            const newErrors = { ...errors };
            delete newErrors[fileType as keyof typeof newErrors];
            setErrors(newErrors);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'primaryDiversLicense' | 'secondaryDiversLicense') => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(fileType, file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent, fileType: 'primaryDiversLicense' | 'secondaryDiversLicense') => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileChange(fileType, file);
        }
    };

    const validate = () => {
        const newErrors: FormErrors = {};

        // Required text/select fields validation
        (['businessName', 'businessType', 'businessAddressLineOne', 'businessAddressLineTwo', 'businessAddressCity', 'businessAddressState', 'businessAddressZip', 'firstName', 'lastName', 'email', 'phoneNumber', 'ssn'] as Array<keyof FormData>).forEach(key => {
            if (!formData[key] || formData[key] === '') {
                const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                newErrors[key] = `${displayKey} is required.`;
            }
        });

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (formData.secoundaryEmail && !/\S+@\S+\.\S+/.test(formData.secoundaryEmail)) {
            newErrors.secoundaryEmail = 'Email is invalid';
        }

        if (!files.primaryDiversLicense) {
            newErrors.primaryDiversLicense = 'Primary Divers License is required.';
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
                const formDataToSend = new FormData();

                // Add form fields including userId
                Object.keys(formData).forEach(key => {
                    formDataToSend.append(key, String(formData[key as keyof typeof formData]));
                });

                // Add files with unique names
                if (files.primaryDiversLicense) {
                    formDataToSend.append('primaryDiversLicense', files.primaryDiversLicense, fileNames.primaryDiversLicense);
                }
                if (files.secondaryDiversLicense) {
                    formDataToSend.append('secondaryDiversLicense', files.secondaryDiversLicense, fileNames.secondaryDiversLicense);
                }

                // Add file names to be stored in database
                formDataToSend.append('primaryDiversLicenseFileName', fileNames.primaryDiversLicense);
                formDataToSend.append('secondaryDiversLicenseFileName', fileNames.secondaryDiversLicense);

                await axios.post(serviceUrl + '/businessRegistration', formDataToSend);

                toast.success('Application submitted successfully!');

                // Reset form
                setFormData({
                    businessName: '',
                    businessType: '',
                    businessAddressLineOne: '',
                    businessAddressLineTwo: '',
                    businessAddressCity: '',
                    businessAddressState: '',
                    businessAddressZip: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    ssn: '',
                    secoundaryFirstName: '',
                    secoundaryLastName: '',
                    secoundaryEmail: '',
                    secoundaryPhoneNumber: '',
                    secoundarySSN: '',
                });
                setFiles({ primaryDiversLicense: null, secondaryDiversLicense: null });
                setFileNames({ primaryDiversLicense: '', secondaryDiversLicense: '' });
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
            <section className="businessRegistrationContainer">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1 col-xl-6 offset-xl-3'>
                            <div className="box p-4 shadow-lg">
                                <div className="text-center mb-2">
                                    <img src={logo} className='logo' />
                                </div>
                                <h2 className="mb-4 text-center">Business Registration</h2>
                                <form className="row g-3">

                                    <div className='col-12'><h5 className="mb-0">Business Details</h5></div>

                                    {/* Business Name */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="Business Name" id="businessName" value={formData.businessName}
                                            onChange={handleChange} required />
                                        {errors.businessName && (
                                            <p className="formError">
                                                {errors.businessName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Type Selection */}
                                    <div className="col-md-6 mb-2">
                                        <select 
                                            className="form-select" 
                                            id="businessTypeSelect" 
                                            value={showOtherInput ? "Others" : formData.businessType}
                                            onChange={handleBusinessTypeChange} 
                                            required
                                        >
                                            <option value="">Select Business Type</option>
                                            <option value="LLC">LLC</option>
                                            <option value="Corporation">Corporation</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {errors.businessType && !showOtherInput && (
                                            <p className="formError">{errors.businessType}</p>
                                        )}
                                    </div>

                                    {/* Conditional "Others" Text Input */}
                                    {showOtherInput && (
                                        <div className="col-md-6 mb-2">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Please specify business type" 
                                                id="businessType" 
                                                value={formData.businessType}
                                                onChange={handleChange} 
                                                required 
                                            />
                                            {errors.businessType && (
                                                <p className="formError">Specific business type is required</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Business Address Line One */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="Address Line 1" id="businessAddressLineOne" value={formData.businessAddressLineOne}
                                            onChange={handleChange} required />
                                        {errors.businessAddressLineOne && (
                                            <p className="formError">
                                                {errors.businessAddressLineOne}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Address Line Two */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="Address Line 2" id="businessAddressLineTwo" value={formData.businessAddressLineTwo}
                                            onChange={handleChange} required />
                                        {errors.businessAddressLineTwo && (
                                            <p className="formError">
                                                {errors.businessAddressLineTwo}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Address City */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="City" id="businessAddressCity" value={formData.businessAddressCity}
                                            onChange={handleChange} required />
                                        {errors.businessAddressCity && (
                                            <p className="formError">
                                                {errors.businessAddressCity}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Address State */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="State" id="businessAddressState" value={formData.businessAddressState}
                                            onChange={handleChange} required />
                                        {errors.businessAddressState && (
                                            <p className="formError">
                                                {errors.businessAddressState}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Address Zip */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="Zipcode" id="businessAddressZip" value={formData.businessAddressZip}
                                            onChange={handleChange} required />
                                        {errors.businessAddressZip && (
                                            <p className="formError">
                                                {errors.businessAddressZip}
                                            </p>
                                        )}
                                    </div>

                                    <div className='col-12'><h5 className="mb-0">Primary Owner</h5></div>
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

                                    {/* Email */}
                                    <div className="col-md-6 mb-2">
                                        <input type="string" className="form-control" id="ssn" placeholder="Social Security Number (SSN)" value={formData.ssn}
                                            onChange={handleChange} required />
                                        {errors.ssn && (
                                            <p className="formError">
                                                {errors.ssn}
                                            </p>
                                        )}
                                    </div>

                                    <div className='col-12'><h5 className="mb-0">Secoundary Owner</h5></div>
                                    {/* First Name */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="First Name" id="secoundaryFirstName" value={formData.secoundaryFirstName}
                                            onChange={handleChange} />
                                        {errors.secoundaryFirstName && (
                                            <p className="formError">
                                                {errors.secoundaryFirstName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-md-6 mb-2">
                                        <input type="text" className="form-control" placeholder="Last Name" id="secoundaryLastName" value={formData.secoundaryLastName}
                                            onChange={handleChange} />
                                        {errors.secoundaryLastName && (
                                            <p className="formError">
                                                {errors.secoundaryLastName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6 mb-2">
                                        <input type="email" className="form-control" id="secoundaryEmail" placeholder="Email" value={formData.secoundaryEmail}
                                            onChange={handleChange} />
                                        {errors.secoundaryEmail && (
                                            <p className="formError">
                                                {errors.secoundaryEmail}
                                            </p>
                                        )}
                                    </div>

                                    {/* Area Code and Phone Number */}
                                    <div className="col-md-6 mb-2">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="secoundaryPhoneNumber"
                                                placeholder="Phone Number"
                                                value={formData.secoundaryPhoneNumber}
                                                onChange={handleChange}
                                            />
                                        {errors.secoundaryPhoneNumber && (
                                            <p className="formError">{errors.secoundaryPhoneNumber}</p>
                                        )}
                                    </div>

                                    {/* SSN */}
                                    <div className="col-md-6 mb-2">
                                        <input type="string" className="form-control" id="secoundarySSN" placeholder="SSN" value={formData.secoundarySSN}
                                            onChange={handleChange}  />
                                        {errors.secoundarySSN && (
                                            <p className="formError">
                                                {errors.secoundarySSN}
                                            </p>
                                        )}
                                    </div>

                                    <div className='col-12'><h5 className="mb-0">Driver's License</h5></div>
                                    
                                    {/* Driver License File Upload */}
                                    <div className="col-md-6">
                                        <h6 className="mb-2">Primary Owner</h6>
                                        <div
                                            className="border border-dashed p-5 text-center bg-light"
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, 'primaryDiversLicense')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <input
                                                type="file"
                                                className="form-control d-none"
                                                id="primaryDiversLicenseInput"
                                                onChange={(e) => handleFileInput(e, 'primaryDiversLicense')}
                                            />
                                            <label htmlFor="primaryDiversLicenseInput" style={{ cursor: 'pointer', marginBottom: 0 }}>
                                                <p className="mb-1"><strong>Browse Files</strong></p>
                                                <small className="text-muted">Drag and drop files here</small>
                                            </label>
                                            {fileNames.primaryDiversLicense && (
                                                <p className="mt-2 text-success"><small>✓ {files.primaryDiversLicense?.name}</small></p>
                                            )}
                                        </div>
                                        {errors.primaryDiversLicense && (
                                            <p className="formError">{errors.primaryDiversLicense}</p>
                                        )}
                                    </div>

                                    {/* Business License File Upload */}
                                    <div className="col-md-6">
                                        <h6 className="mb-2">Secondary Owner</h6>
                                        <div
                                            className="border border-dashed p-5 text-center bg-light"
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, 'secondaryDiversLicense')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <input
                                                type="file"
                                                className="form-control d-none"
                                                id="secondaryDiversLicenseInput"
                                                onChange={(e) => handleFileInput(e, 'secondaryDiversLicense')}
                                            />
                                            <label htmlFor="secondaryDiversLicenseInput" style={{ cursor: 'pointer', marginBottom: 0 }}>
                                                <p className="mb-1"><strong>Browse Files</strong></p>
                                                <small className="text-muted">Drag and drop files here</small>
                                            </label>
                                            {fileNames.secondaryDiversLicense && (
                                                <p className="mt-2 text-success"><small>✓ {files.secondaryDiversLicense?.name}</small></p>
                                            )}
                                        </div>
                                        {errors.secondaryDiversLicense && (
                                            <p className="formError">{errors.secondaryDiversLicense}</p>
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
export default BusinessRegistration;