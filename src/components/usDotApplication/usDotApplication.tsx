import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import "./usDotApplication.css"

// Import your auth context
import { AuthContext } from '../../authContext';

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
    userId?: string;
}

// Define the shape for errors
type FormErrors = Partial<Record<keyof FormData, string>> & {
    driversLicense?: string;
    businessLicense?: string;
};

const UsDotApplication = () => {
    // const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    // Extract user from auth context
    const user = authContext?.user || null;

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
        userId: user || '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [files, setFiles] = useState<{ driversLicense: File | null, businessLicense: File | null }>({
        driversLicense: null,
        businessLicense: null,
    });
    const [fileNames, setFileNames] = useState<{ driversLicense: string, businessLicense: string }>({
        driversLicense: '',
        businessLicense: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update userId when user changes
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({ ...prev, userId: user }));
        }
    }, [user]);

    // If not authenticated, don't render the form - no toast
    if (!user) {
        return (
            <div className="py-3 usDotApplicationContainer">
                <p className="text-danger">Please log in to access this form.</p>
            </div>
        );
    }

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

    const handleFileChange = (fileType: 'driversLicense' | 'businessLicense', file: File | null) => {
        if (file) {
            const uniqueName = generateUniqueFileName(file);
            setFiles((prev) => ({ ...prev, [fileType]: file }));
            setFileNames((prev) => ({ ...prev, [fileType]: uniqueName }));

            const newErrors = { ...errors };
            delete newErrors[fileType as keyof typeof newErrors];
            setErrors(newErrors);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'driversLicense' | 'businessLicense') => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(fileType, file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent, fileType: 'driversLicense' | 'businessLicense') => {
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
        if (!files.driversLicense) {
            newErrors.driversLicense = 'Driver License is required.';
        }
        if (!files.businessLicense) {
            newErrors.businessLicense = 'Business License is required.';
        }

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
                if (files.driversLicense) {
                    formDataToSend.append('driversLicense', files.driversLicense, fileNames.driversLicense);
                }
                if (files.businessLicense) {
                    formDataToSend.append('businessLicense', files.businessLicense, fileNames.businessLicense);
                }

                // Add file names to be stored in database
                formDataToSend.append('driversLicenseFileName', fileNames.driversLicense);
                formDataToSend.append('businessLicenseFileName', fileNames.businessLicense);

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
                    userId: user || '',
                });
                setFiles({ driversLicense: null, businessLicense: null });
                setFileNames({ driversLicense: '', businessLicense: '' });
                setErrors({});
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'An error occurred');
            } finally {
                setIsSubmitting(false);
            }
        }
        else {
            toast.error('Please fix the errors in the form before submitting.');
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
            <div className="py-3 usDotApplicationContainer">
                <h3 className="mb-4">US DOT Application</h3>
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
                                style={{ flex: '0 0 20%' }}
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

                    {/* Driver License File Upload */}
                    <div className="col-md-6 mt-4">
                        <h6 className="mb-2">Driver License</h6>
                        <div
                            className="border border-dashed p-5 text-center bg-light"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'driversLicense')}
                            style={{ cursor: 'pointer' }}
                        >
                            <input
                                type="file"
                                className="form-control d-none"
                                id="driversLicenseInput"
                                onChange={(e) => handleFileInput(e, 'driversLicense')}
                            />
                            <label htmlFor="driversLicenseInput" style={{ cursor: 'pointer', marginBottom: 0 }}>
                                <p className="mb-1"><strong>Browse Files</strong></p>
                                <small className="text-muted">Drag and drop files here</small>
                            </label>
                            {fileNames.driversLicense && (
                                <p className="mt-2 text-success"><small>✓ {files.driversLicense?.name}</small></p>
                            )}
                        </div>
                        {errors.driversLicense && (
                            <p className="formError">{errors.driversLicense}</p>
                        )}
                    </div>

                    {/* Business License File Upload */}
                    <div className="col-md-6 mt-4">
                        <h6 className="mb-2">Business License</h6>
                        <div
                            className="border border-dashed p-5 text-center bg-light"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'businessLicense')}
                            style={{ cursor: 'pointer' }}
                        >
                            <input
                                type="file"
                                className="form-control d-none"
                                id="businessLicenseInput"
                                onChange={(e) => handleFileInput(e, 'businessLicense')}
                            />
                            <label htmlFor="businessLicenseInput" style={{ cursor: 'pointer', marginBottom: 0 }}>
                                <p className="mb-1"><strong>Browse Files</strong></p>
                                <small className="text-muted">Drag and drop files here</small>
                            </label>
                            {fileNames.businessLicense && (
                                <p className="mt-2 text-success"><small>✓ {files.businessLicense?.name}</small></p>
                            )}
                        </div>
                        {errors.businessLicense && (
                            <p className="formError">{errors.businessLicense}</p>
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
        </>
    );
};
export default UsDotApplication;