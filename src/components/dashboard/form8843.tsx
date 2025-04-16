import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import "./dashboard.css"

const sections = ["User Info", "General Information", "University Details", "Review & Submit"];

const FormEEFT = () => {
    const [step, setStep] = useState(0);
    const [allow, setAllow] = useState(false);
    const [formData, setFormData] = useState(
        JSON.parse(localStorage.getItem("formData") || JSON.stringify({
            visaType: "F1",
            citizen: "India"
        })) ||
        {
            address: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            visaType: "F2",
            citizen: "India",
            passportNumber: "",
            firstEntry: "",
            days2021: "",
            days2022: "",
            days2023: "",
            days2024: "",
            universityName: "",
            universityAdvisorName: "",
            universityStreet: "",
            universityCity: "",
            universityState: "",
            universityZipcode: "",
            universityAddress: ""
        }
    );
    const [errors, setErrors] = useState<
        {
            address?: string;
            street?: string;
            city?: string;
            state?: string;
            zipcode?: string;
            visaType?: string;
            citizen?: string;
            passportNumber?: string;
            firstEntry?: string;
            days2021?: string;
            days2022?: string;
            days2023?: string;
            days2024?: string;
            universityName?: string;
            universityAdvisorName?: string;
            universityStreet?: string;
            universityCity?: string;
            universityState?: string;
            universityZipcode?: string;
            universityAddress?: string;
        }>({});

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = async () => {
        if (step === 0) {
            if (validateUserInfo()) {
                if (!errors.street && !errors.city && !errors.state && !errors.zipcode && !errors.address)
                    setStep((prev) => Math.min(prev + 1, sections.length - 1));
            }
        }
        else if (step === 1) {
            if (validateGeneralInfo()) {
                if (!errors.visaType && !errors.citizen && !errors.passportNumber && !errors.firstEntry && !errors.days2021 && !errors.days2022 && !errors.days2023 && !errors.days2024)
                    setStep((prev) => Math.min(prev + 1, sections.length - 1));
            }
        }
        else if (step === 2) {
            if (validateUniverCityInfo()) {
                if (!errors.universityName && !errors.universityAdvisorName && !errors.universityStreet && !errors.universityCity && !errors.universityState && !errors.universityZipcode && !errors.universityAddress)
                    setStep((prev) => Math.min(prev + 1, sections.length - 1));
            }
        }
        // setStep((prev) => Math.min(prev + 1, sections.length - 1))
    };
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = () => {
        alert("Form submitted successfully!");
        localStorage.removeItem("formData");
    };

    const validateUserInfo = () => {
        const newErrors: {
            address?: string;
            street?: string;
            city?: string;
            state?: string;
            zipcode?: string;
        } = {};
        if (!formData.street) {
            newErrors.street = 'Street is required';
        }
        if (!formData.city) {
            newErrors.city = 'City is required';
        }
        if (!formData.state) {
            newErrors.state = 'State is required';
        }
        if (!formData.zipcode) {
            newErrors.zipcode = 'Zipcode is required';
        }
        if (!formData.address) {
            newErrors.address = 'Address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateGeneralInfo = () => {
        const newErrors: {
            visaType?: string;
            citizen?: string;
            passportNumber?: string;
            firstEntry?: string;
            days2021?: string;
            days2022?: string;
            days2023?: string;
            days2024?: string;
        } = {};

        if (!formData.visaType) {
            newErrors.visaType = 'Visa Type is required';
        }
        if (!formData.citizen) {
            newErrors.citizen = 'Country of Citizen is required';
        }
        if (!formData.passportNumber) {
            newErrors.passportNumber = 'Passport Number is required';
        }
        if (!formData.firstEntry) {
            newErrors.firstEntry = 'Date of First Entry to USA is required';
        }
        if (!formData.days2021) {
            newErrors.days2021 = 'Days of 2021 is required';
        }
        if (!formData.days2022) {
            newErrors.days2022 = 'Days of 2022 is required';
        }
        if (!formData.days2023) {
            newErrors.days2023 = 'Days of 2023 is required';
        }
        if (!formData.days2024) {
            newErrors.days2024 = 'Days of 2024 is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateUniverCityInfo = () => {
        const newErrors: {
            universityName?: string;
            universityAdvisorName?: string;
            universityStreet?: string;
            universityCity?: string;
            universityState?: string;
            universityZipcode?: string;
            universityAddress?: string;
        } = {};

        if (!formData.universityName) {
            newErrors.universityName = 'University Name is required';
        }
        if (!formData.universityAdvisorName) {
            newErrors.universityAdvisorName = 'University Advisor Name is required';
        }
        if (!formData.universityStreet) {
            newErrors.universityStreet = 'University Street is required';
        }
        if (!formData.universityCity) {
            newErrors.universityCity = 'University City is required';
        }
        if (!formData.universityState) {
            newErrors.universityState = 'University State is required';
        }
        if (!formData.universityZipcode) {
            newErrors.universityZipcode = 'University Zipcode is required';
        }
        if (!formData.universityAddress) {
            newErrors.universityAddress = 'University Address is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [formQuesData, setFormQuesData] = useState({ q1: 'no', q2: 'no', q3: 'no', q4: 'no' });
    const [errorsQues, setErrorsQues] = useState<{ q1?: string; q2?: string; q3?: string; q4?: string }>({});

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormQuesData((prev) => ({ ...prev, [id]: value }));
    };

    const handleQuesSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateQues()) {
            if (formQuesData.q1 === 'yes' && formQuesData.q2 === 'yes' && formQuesData.q3 === 'yes' && formQuesData.q4 === 'yes') {
                setAllow(true);
            } else setAllow
        }
    };

    const validateQues = () => {
        const newErrors: {
            q1?: string;
            q2?: string;
            q3?: string;
            q4?: string;
        } = {};

        if (!formQuesData.q1) {
            newErrors.q1 = 'Question 1 is required';
        }
        if (!formQuesData.q2) {
            newErrors.q2 = 'Question 2 is required';
        }
        if (!formQuesData.q3) {
            newErrors.q3 = 'Question 3 is required';
        }
        if (!formQuesData.q4) {
            newErrors.q4 = 'Question 4 is required';
        }
        setErrorsQues(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            {
                !allow
                    ?
                    <div className='form8843'>
                        <h4 className='mb-4'>Welcome to the Form 8843</h4>
                        <p className='form8843Des'>Before you start, please make sure you have the following documents ready:</p>
                        <form>
                            <div className='row mb-4 align-items-center'>
                                <div className='col-sm-8'>
                                    <p>Can we create a billing tab within our website?</p>
                                </div>
                                <div className='col-sm-4'>
                                    <select
                                        className="form-select"
                                        id="q1"
                                        name="q1"
                                        value={formQuesData.q1}
                                        onChange={handleQuestionChange}
                                    >
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </select>
                                    {errorsQues.q1 && (<p className="formError">{errorsQues.q1}</p>)}
                                </div>
                            </div>
                            <div className='row mb-4 align-items-center'>
                                <div className='col-sm-8'>
                                    <p>Once I click on Bill, Can we send automatic Email to the Client? And with the option of followup emailing?</p>
                                </div>
                                <div className='col-sm-4'>
                                    <select
                                        className="form-select"
                                        id="q2"
                                        name="q2"
                                        value={formQuesData.q2}
                                        onChange={handleQuestionChange}
                                    >
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </select>
                                    {errorsQues.q2 && (<p className="formError">{errorsQues.q2}</p>)}
                                </div>
                            </div>
                            <div className='row mb-4 align-items-center'>
                                <div className='col-sm-8'>
                                    <p>Automatic emails</p>
                                </div>
                                <div className='col-sm-4'>
                                    <select
                                        className="form-select"
                                        id="q3"
                                        name="q3"
                                        value={formQuesData.q3}
                                        onChange={handleQuestionChange}
                                    >
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </select>
                                    {errorsQues.q3 && (<p className="formError">{errorsQues.q3}</p>)}
                                </div>
                            </div>
                            <div className='row mb-4 align-items-center'>
                                <div className='col-sm-8'>
                                    <p>Question 4?</p>
                                </div>
                                <div className='col-sm-4'>
                                    <select
                                        className="form-select"
                                        id="q4"
                                        name="q4"
                                        value={formQuesData.q4}
                                        onChange={handleQuestionChange}
                                    >
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </select>
                                    {errorsQues.q4 && (<p className="formError">{errorsQues.q4}</p>)}
                                </div>
                            </div>
                            <button type="submit" className="btnPrimary float-end mt-2" onClick={handleQuesSubmit}>Start Form 8843</button>
                        </form>
                    </div>
                    :
                    <div>
                        <h4 className='mb-4'>{sections[step]}</h4>

                        {step === 0 && (
                            <>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            disabled
                                            value={localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}").firstName || "" : ""}
                                            className='form-control'
                                        />
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Last Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            disabled
                                            value={localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}").lastName || "" : ""}
                                            className='form-control'
                                        />
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Street</label>
                                        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} className='form-control' />
                                        {errors.street && (<p className="formError">{errors.street}</p>)}
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>City</label>
                                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className='form-control' />
                                        {errors.city && (<p className="formError">{errors.city}</p>)}
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>State</label>
                                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className='form-control' />
                                        {errors.state && (<p className="formError">{errors.state}</p>)}
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Zipcode</label>
                                        <input type="text" name="zipcode" placeholder="Zipcode" value={formData.zipcode} onChange={handleChange} className='form-control' />
                                        {errors.zipcode && (<p className="formError">{errors.zipcode}</p>)}
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Address</label>
                                        <textarea rows={4} name="address" placeholder="Address" value={formData.address} onChange={handleChange} className='form-control' />
                                        {errors.address && (<p className="formError">{errors.address}</p>)}
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 1 && (
                            <>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Visa Type</label>
                                        <select
                                            className="form-select"
                                            id="visaType"
                                            name="visaType"
                                            value={formData.visaType}
                                            onChange={handleChange}
                                        >
                                            <option value='F1'>F1</option>
                                            <option value='F2'>F2</option>
                                        </select>
                                        {errors.visaType && (<p className="formError">{errors.visaType}</p>)}
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Country of Citizen</label>
                                        <select
                                            className="form-select"
                                            id="citizen"
                                            name="citizen"
                                            value={formData.citizen}
                                            onChange={handleChange}
                                        >
                                            <option value='India'>India</option>
                                            <option value='USA'>USA</option>
                                        </select>
                                        {errors.citizen && (<p className="formError">{errors.citizen}</p>)}
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Passport Number</label>
                                        <input type="text" name="passportNumber" placeholder="Passport Number" value={formData.passportNumber} onChange={handleChange} className='form-control' />
                                        {errors.passportNumber && (<p className="formError">{errors.passportNumber}</p>)}
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Date of First Entry to USA</label>
                                        <input type="date" name="firstEntry" value={formData.firstEntry} onChange={handleChange} className='form-control' />
                                        {errors.firstEntry && (<p className="formError">{errors.firstEntry}</p>)}
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-12'>
                                        <p>Number of days in USA?</p>
                                    </div>
                                    <div className='col-sm-6 mb-4'>
                                        <label className='mb-2'>2021</label>
                                        <input type="number" name="days2021" placeholder="2021" value={formData.days2021} onChange={handleChange} className='form-control' />
                                        {errors.days2021 && (<p className="formError">{errors.days2021}</p>)}
                                    </div>
                                    <div className='col-sm-6 mb-4'>
                                        <label className='mb-2'>2022</label>
                                        <input type="number" name="days2022" placeholder="2022" value={formData.days2022} onChange={handleChange} className='form-control' />
                                        {errors.days2022 && (<p className="formError">{errors.days2022}</p>)}
                                    </div>
                                    <div className='col-sm-6 mb-4'>
                                        <label className='mb-2'>2023</label>
                                        <input type="number" name="days2023" placeholder="2023" value={formData.days2023} onChange={handleChange} className='form-control' />
                                        {errors.days2023 && (<p className="formError">{errors.days2023}</p>)}
                                    </div>
                                    <div className='col-sm-6 mb-4'>
                                        <label className='mb-2'>2024</label>
                                        <input type="number" name="days2024" placeholder="2024" value={formData.days2024} onChange={handleChange} className='form-control' />
                                        {errors.days2024 && (<p className="formError">{errors.days2024}</p>)}
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Name</label>
                                        <input type="text" name="universityName" placeholder="Name" value={formData.universityName} onChange={handleChange} className='form-control' />
                                        {errors.universityName && (<p className="formError">{errors.universityName}</p>)}
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Advisor Name</label>
                                        <input type="text" name="universityAdvisorName" placeholder='Name' value={formData.universityAdvisorName} onChange={handleChange} className='form-control' />
                                        {errors.universityAdvisorName && (<p className="formError">{errors.universityAdvisorName}</p>)}
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Street</label>
                                        <input type="text" name="universityStreet" placeholder="Street" value={formData.universityStreet} onChange={handleChange} className='form-control' />
                                        {errors.universityStreet && (<p className="formError">{errors.universityStreet}</p>)}
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>City</label>
                                        <input type="text" name="universityCity" placeholder="City" value={formData.universityCity} onChange={handleChange} className='form-control' />
                                        {errors.universityCity && (<p className="formError">{errors.universityCity}</p>)}
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>State</label>
                                        <input type="text" name="universityState" placeholder="State" value={formData.universityState} onChange={handleChange} className='form-control' />
                                        {errors.universityState && (<p className="formError">{errors.universityState}</p>)}
                                    </div>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Zipcode</label>
                                        <input type="text" name="universityZipcode" placeholder="Zipcode" value={formData.universityZipcode} onChange={handleChange} className='form-control' />
                                        {errors.universityZipcode && (<p className="formError">{errors.universityZipcode}</p>)}
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-sm-6 col-lg-4'>
                                        <label className='mb-2'>Address</label>
                                        <textarea rows={4} name="universityAddress" placeholder="Address" value={formData.universityAddress} onChange={handleChange} className='form-control' />
                                        {errors.universityAddress && (<p className="formError">{errors.universityAddress}</p>)}
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <div>
                                <p>Street: {formData.street}</p>
                                <p>City: {formData.city}</p>
                                <p>State: {formData.state}</p>
                                <p>zipcode: {formData.zipcode}</p>
                                <p>address: {formData.address}</p>
                            </div>
                        )}
                        {
                            step !== 0 && (
                                <button className='btnLtePrimary me-3' onClick={prevStep} disabled={step === 0}>Previous</button>
                            )
                        }
                        {step < sections.length - 1 ? (
                            <button className='btnPrimary' onClick={nextStep}>Save & Continue</button>
                        ) : (
                            <button className='btnPrimary' onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
            }

        </>

    );
};

export default FormEEFT;