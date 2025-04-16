import { useState } from "react";
import FormEEFT from './form8843';
import "./dashboard.css"

const Form = () => {

    const [formData, setFormData] = useState<any>(null);

    const fetchFormData = async (value: any) => {
        setFormData(value);
    }

    return (
        <>
            <section className="form">
                <h2 className="mb-3">Form</h2>
                {
                    !formData ? 
                    <ul className="form-list">
                        <li onClick={() => fetchFormData('8843')}><span>8843</span></li>
                    </ul> : 
                    <></>
                }
                {
                    formData === '8843' ? 
                    <FormEEFT /> : 
                    <></>
                }

            </section>
        </>
    );
};

export default Form;