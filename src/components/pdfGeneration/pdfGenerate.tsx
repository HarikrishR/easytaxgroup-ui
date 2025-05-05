import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { PDFDocument } from 'pdf-lib';
import form8843_20 from './f8843_20.pdf';
import form8843_21 from './f8843_21.pdf';
import form8843_22 from './f8843_22.pdf';
import form8843_23 from './f8843_23.pdf';
import form8843_24 from './f8843_24.pdf';
import { getGeneratePDF } from '../../redux/actions/action';
import './pdfGenerate.css';

const PDFGenerate = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state: any) => state.adminOrderFromData);
    const generatePDF = useSelector((state: any) => state.generatePDF);

    const getNoOfDays = (val: any) => {
        var days = "0";
        if (formData.noOfDaysUSA) {
            formData.noOfDaysUSA.forEach((data: any) => {
                if (data.year === "20" + val) {
                    days = data.days.toString();
                }
            })
            return days;
        }
        else {
            console.log("No data");
            return days;
        }
    }

    const getVisaForYears = (val: any) => {
        var visaType = "";
        if (formData.noOfDaysUSA) {
            formData.noOfDaysUSA.forEach((data: any) => {
                if (data.year === "20" + val) {
                    visaType = formData.form8843_datum.visaType;
                }
            })
            return visaType;
        }
        else {
            console.log("No data");
            return visaType;
        }
    }


    const generatePdf = async () => {
        try {
            // const formWithYear = Object.keys(formData)
            //     .filter(key => formData[key] === "yes" && key.includes("wantToFile"));
            // console.log(formWithYear);

            formData.submittedYear.forEach(async (data: any) => {
                const year = data; // Extract the year from the key
                // console.log(formData);
                var formUrl = '';
                if (year === "2020") {
                    formUrl = form8843_20;
                } else if (year === "2021") {
                    formUrl = form8843_21;
                } else if (year === "2022") {
                    formUrl = form8843_22;
                } else if (year === "2023") {
                    formUrl = form8843_23;
                }
                else if (year === "2024") {
                    formUrl = form8843_24;
                }

                const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
                const pdfDoc = await PDFDocument.load(formPdfBytes);
                const form = pdfDoc.getForm();
                const fields = form.getFields().map(f => f.getName()); // Extract field names

                // Populate fields (Make sure field names match actual PDF form field names)
                form.getTextField("topmostSubform[0].Page1[0].f1_4[0]").setText(formData.user.firstName);
                form.getTextField("topmostSubform[0].Page1[0].f1_5[0]").setText(formData.user.lastName);
                form.getTextField("topmostSubform[0].Page1[0].f1_7[0]").setText(formData.user.street + "," + formData.user.city + "," + formData.user.state + "," + formData.user.zipcode);
                form.getTextField("topmostSubform[0].Page1[0].f1_9[0]").setText(formData.visaType);
                form.getTextField("topmostSubform[0].Page1[0].f1_11[0]").setText(formData.citizen);
                form.getTextField("topmostSubform[0].Page1[0].f1_12[0]").setText(formData.citizen);
                form.getTextField("topmostSubform[0].Page1[0].f1_13[0]").setText(formData.passportNumber);
                form.getTextField("topmostSubform[0].Page1[0].f1_14[0]").setText(getNoOfDays(Number(year.slice(-2))));
                form.getTextField("topmostSubform[0].Page1[0].f1_15[0]").setText(getNoOfDays(Number(year.slice(-2)) - 1));
                form.getTextField("topmostSubform[0].Page1[0].f1_16[0]").setText(getNoOfDays(Number(year.slice(-2)) - 2));
                form.getTextField("topmostSubform[0].Page1[0].f1_17[0]").setText(getNoOfDays(Number(year.slice(-2))));
                form.getTextField("topmostSubform[0].Page1[0].f1_30[0]").setText(formData.form8843_datum.universityAdvisorName);
                form.getTextField("topmostSubform[0].Page1[0].f1_31[0]").setText(formData.form8843_datum.universityStreet + "," + formData.form8843_datum.universityCity + "," + formData.form8843_datum.universityState + "," + formData.form8843_datum.universityZipcode);
                form.getTextField("topmostSubform[0].Page1[0].f1_32[0]").setText(formData.form8843_datum.universityAdvisorNumber);
                form.getTextField("topmostSubform[0].Page1[0].f1_36[0]").setText(getVisaForYears(Number(year.slice(-2)) - 6));
                form.getTextField("topmostSubform[0].Page1[0].f1_37[0]").setText(getVisaForYears(Number(year.slice(-2)) - 5));
                form.getTextField("topmostSubform[0].Page1[0].f1_38[0]").setText(getVisaForYears(Number(year.slice(-2)) - 4));
                form.getTextField("topmostSubform[0].Page1[0].f1_39[0]").setText(getVisaForYears(Number(year.slice(-2)) - 3));
                form.getTextField("topmostSubform[0].Page1[0].f1_40[0]").setText(getVisaForYears(Number(year.slice(-2)) - 2));
                form.getTextField("topmostSubform[0].Page1[0].f1_41[0]").setText(getVisaForYears(Number(year.slice(-2)) - 1));
                form.getCheckBox("topmostSubform[0].Page1[0].c1_2[1]").check();
                form.getCheckBox("topmostSubform[0].Page1[0].c1_3[1]").check();

                //Save and prepare for download
                const updatedPdfBytes = await pdfDoc.save();
                const blob = new Blob([updatedPdfBytes], { type: "application/pdf" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "form8843_" + year + ".pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);

                dispatch(getGeneratePDF(false));
                toast.success("PDF generated successfully!");
            })
        } catch (e: any) {
            toast.error("Error generating PDF!");
            dispatch(getGeneratePDF(false));
        }
    };

    return (
        <>
            <Modal className='pdfModal' show={generatePDF} onHide={() => dispatch(getGeneratePDF(false))}>
                <Modal.Body className='text-center p-4'>
                    <p>Your form 8843 is ready, please click download.</p>
                    <button className='btnPrimary' onClick={() => generatePdf()}>Download</button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PDFGenerate;