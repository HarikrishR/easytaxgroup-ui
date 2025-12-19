import { useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./businessRegistration.css"

// Define the shape for form data
interface FormData {
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    areaCode: string;
    phoneNumber: string;
    serviceOffered: string;
    typeOfProperty: string[];
    numberOfVehicles: number | string;
    typeOfVehicle: string;
    ownershipOfVehicle: string;
    interstateIntrastate: string;
}

// Define the shape for errors
type FormErrors = Partial<Record<keyof FormData, string>> & {
    primaryDiversLicense?: string;
    secondaryDiversLicense?: string;
};

const BusinessRegistration = () => {
    // const navigate = useNavigate();
    // const authContext = useContext(AuthContext);

    // Extract user from auth context
    // const user = authContext?.user || null;

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        areaCode: '',
        phoneNumber: '',
        serviceOffered: '',
        typeOfProperty: [] as string[],
        numberOfVehicles: '',
        typeOfVehicle: '',
        ownershipOfVehicle: '',
        interstateIntrastate: '',
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

    // Update userId when user changes
    // useEffect(() => {
    //     if (user) {
    //         setFormData((prev) => ({ ...prev, userId: user }));
    //     }
    // }, [user]);

    // If not authenticated, don't render the form - no toast
    // if (!user) {
    //     return (
    //         <div className="py-3 usDotApplicationContainer">
    //             <p className="text-danger">Please log in to access this form.</p>
    //         </div>
    //     );
    // }

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
        (['firstName', 'lastName', 'businessName', 'email', 'areaCode', 'phoneNumber', 'serviceOffered', 'numberOfVehicles', 'typeOfVehicle', 'ownershipOfVehicle', 'interstateIntrastate'] as Array<keyof FormData>).forEach(key => {
            if (!formData[key] || formData[key] === '') {
                const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                newErrors[key] = `${displayKey} is required.`;
            }
        });

        // Check both areaCode and phoneNumber together
        if (!formData.areaCode || !formData.phoneNumber) {
            newErrors.areaCode = 'Area Code and Phone Number are required.';
            newErrors.phoneNumber = 'Area Code and Phone Number are required.';
        }

        // Check if at least one type of property is selected
        if (formData.typeOfProperty.length === 0) {
            newErrors.typeOfProperty = 'Please select at least one type of property.';
        }

        // Validate files
        if (!files.primaryDiversLicense) {
            newErrors.primaryDiversLicense = 'Primary Divers License is required.';
        }
        // if (!files.secondaryDiversLicense) {
        //     newErrors.secondaryDiversLicense = 'Secondary Divers License is required.';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                const serviceUrl = import.meta.env.VITE_SERVICE_URL;
                const formDataToSend = new FormData();

                // Add form fields including userId
                Object.keys(formData).forEach(key => {
                    if (key === 'typeOfProperty') {
                        formDataToSend.append(key, JSON.stringify(formData[key as keyof typeof formData]));
                    } else {
                        formDataToSend.append(key, String(formData[key as keyof typeof formData]));
                    }
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

                await axios.post(serviceUrl + '/usdotapplication', formDataToSend);

                toast.success('Application submitted successfully!');

                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    businessName: '',
                    email: '',
                    areaCode: '',
                    phoneNumber: '',
                    serviceOffered: '',
                    typeOfProperty: [],
                    numberOfVehicles: '',
                    typeOfVehicle: '',
                    ownershipOfVehicle: '',
                    interstateIntrastate: '',
                });
                setFiles({ primaryDiversLicense: null, secondaryDiversLicense: null });
                setFileNames({ primaryDiversLicense: '', secondaryDiversLicense: '' });
                setErrors({});
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'An error occurred');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleCheckboxChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            typeOfProperty: prev.typeOfProperty.includes(value)
                ? prev.typeOfProperty.filter((v) => v !== value)
                : [...prev.typeOfProperty, value],
        }));
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.typeOfProperty;
            return newErrors;
        });
    };

    return (
        <>
            <Header />
            <section className="businessRegistrationContainer">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1 col-xl-6 offset-xl-3'>
                            <div className="box p-4 shadow-lg">
                                <h2 className="mb-4 text-center">Business Registration</h2>
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
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control me-3"
                                                id="areaCode"
                                                placeholder="Area Code"
                                                style={{ flex: '0 0 30%' }}
                                                value={formData.areaCode}
                                                onChange={handleChange}
                                                required
                                            />
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="phoneNumber"
                                                placeholder="Phone Number"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        {(errors.areaCode || errors.phoneNumber) && (
                                            <p className="formError">Area Code and Phone Number are required</p>
                                        )}
                                    </div>

                                    {/* Service Offered */}
                                    <div className="col-md-6 mb-2">
                                        <select id="serviceOffered" className="form-select" value={formData.serviceOffered}
                                            onChange={handleChange} required>
                                            <option>Select Services</option>
                                            <option value="General Feright Truck">General Feright Truck</option>
                                            <option value="Car Hauling">Car Hauling</option>
                                            <option value="Feight Forward">Feight Forward</option>
                                            <option value="Intermodal Equipment Provider">Intermodal Equipment Provider</option>
                                        </select>
                                        {errors.serviceOffered && (
                                            <p className="formError">{errors.serviceOffered}</p>
                                        )}
                                    </div>

                                    {/* Type of Property Checkboxes */}
                                    <div className="col-12 mb-2">
                                        <h6 className="mb-2">Type of Property</h6>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="hazardousMaterials"
                                                checked={formData.typeOfProperty.includes("Hazardous Materials")}
                                                onChange={() => handleCheckboxChange("Hazardous Materials")}
                                            />
                                            <label className="form-check-label" htmlFor="hazardousMaterials">Hazardous Materials</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="householdGoods"
                                                checked={formData.typeOfProperty.includes("Household Goods")}
                                                onChange={() => handleCheckboxChange("Household Goods")}
                                            />
                                            <label className="form-check-label" htmlFor="householdGoods">Household Goods</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="exemptCommodities"
                                                checked={formData.typeOfProperty.includes("Exempt Commodities")}
                                                onChange={() => handleCheckboxChange("Exempt Commodities")}
                                            />
                                            <label className="form-check-label" htmlFor="exemptCommodities">Exempt Commodities</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="otherNonHazardous"
                                                checked={formData.typeOfProperty.includes("Other Non-Hazardous Freight")}
                                                onChange={() => handleCheckboxChange("Other Non-Hazardous Freight")}
                                            />
                                            <label className="form-check-label" htmlFor="otherNonHazardous">Other Non-Hazardous Freight</label>
                                        </div>
                                        {errors.typeOfProperty && (
                                            <p className="formError">{errors.typeOfProperty}</p>
                                        )}
                                    </div>

                                    {/* Number of Vehicles */}
                                    <div className="col-md-6 mb-2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="numberOfVehicles"
                                            placeholder="Number of Vehicles"
                                            value={formData.numberOfVehicles}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.numberOfVehicles && (
                                            <p className="formError">{errors.numberOfVehicles}</p>
                                        )}
                                    </div>

                                    {/* Type of Vehicle */}
                                    <div className="col-md-6 mb-2">
                                        <select
                                            id="typeOfVehicle"
                                            className="form-select"
                                            value={formData.typeOfVehicle}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Type of Vehicle</option>
                                            <option value="Truck">Truck</option>
                                            <option value="Trailer">Trailer</option>
                                            <option value="Bus">Bus</option>
                                        </select>
                                        {errors.typeOfVehicle && (
                                            <p className="formError">{errors.typeOfVehicle}</p>
                                        )}
                                    </div>

                                    {/* Ownership of Vehicle */}
                                    <div className="col-md-6 mb-2">
                                        <select
                                            id="ownershipOfVehicle"
                                            className="form-select"
                                            value={formData.ownershipOfVehicle}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Ownership of Vehicle</option>
                                            <option value="Owned">Owned</option>
                                            <option value="Leased/Rental">Leased/Rental</option>
                                        </select>
                                        {errors.ownershipOfVehicle && (
                                            <p className="formError">{errors.ownershipOfVehicle}</p>
                                        )}
                                    </div>

                                    {/* Interstate/Intrastate */}
                                    <div className="col-md-6 mb-2">
                                        <select id="interstateIntrastate" className="form-select" value={formData.interstateIntrastate}
                                            onChange={handleChange} required>
                                            <option>Interstate or Intrastate?</option>
                                            <option value="Interstate(1 state to another state)">Interstate(1 state to another state)</option>
                                            <option value="Intrastate (Within 1 state)">Intrastate (Within 1 state)</option>
                                            <option value="Both">Both</option>
                                        </select>
                                        {errors.interstateIntrastate && (
                                            <p className="formError">{errors.interstateIntrastate}</p>
                                        )}
                                    </div>
                                    <div className='col-12'><h6 className="mb-0">Driver's License</h6></div>
                                    
                                    {/* Driver License File Upload */}
                                    <div className="col-md-6">
                                        <h6 className="mb-2">Primary Owner Driver's License</h6>
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
                                        <h6 className="mb-2">Secondary Owner Driver's License</h6>
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
                                    <div className="col-md-6 mt-4">
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