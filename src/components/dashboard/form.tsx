import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
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
                    <ul>
                        <li onClick={() => fetchFormData('8843')}>8843</li>
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