import axios from 'axios';
import { toast } from 'react-toastify';
import { PDFDocument } from 'pdf-lib';
import { useEffect, useState } from "react";
import form8843 from './f8843.pdf';
import "./dashboard.css"

const PDFGenerate = () => {


    const generatePdf = async () => {
        const formUrl = form8843; // Provide actual URL of the blank Form 8843 PDF
        const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const form = pdfDoc.getForm();

        const fields = form.getFields().map(f => f.getName()); // Extract field names
        console.log("Available form fields:", fields);
        console.log("Available form fields:", formData);

        // Populate fields (Make sure field names match actual PDF form field names)
        form.getTextField("topmostSubform[0].Page1[0].f1_9[0]").setText(formData.visaType);
        form.getTextField("topmostSubform[0].Page1[0].f1_11[0]").setText(formData.citizen);
        form.getTextField("topmostSubform[0].Page1[0].f1_12[0]").setText(formData.citizen);
        form.getTextField("topmostSubform[0].Page1[0].f1_13[0]").setText(formData.passportNumber);
        form.getTextField("topmostSubform[0].Page1[0].f1_14[0]").setText(formData.days2024 ? formData.days2024.toString() : "0");
        form.getTextField("topmostSubform[0].Page1[0].f1_15[0]").setText(formData.days2023 ? formData.days2023.toString() : "0");
        form.getTextField("topmostSubform[0].Page1[0].f1_16[0]").setText(formData.days2022 ? formData.days2022.toString() : "0");
        form.getTextField("topmostSubform[0].Page1[0].f1_17[0]").setText(formData.days2024 ? formData.days2024.toString() : "0");
        form.getTextField("topmostSubform[0].Page1[0].f1_18[0]").setText(formData.universityAdvisorName);
        form.getTextField("topmostSubform[0].Page1[0].f1_19[0]").setText(formData.universityCity + "," + formData.universityState + "," + formData.universityZipcode);
        form.getTextField("topmostSubform[0].Page1[0].f1_20[0]").setText(formData.universityAdvisorNumber);
        form.getTextField("topmostSubform[0].Page1[0].f1_21[0]").setText(formData.universityAdvisorName);
        form.getTextField("topmostSubform[0].Page1[0].f1_22[0]").setText(formData.universityCity + "," + formData.universityState + "," + formData.universityZipcode);
        form.getTextField("topmostSubform[0].Page1[0].f1_23[0]").setText(formData.universityAdvisorNumber);
        form.getTextField("topmostSubform[0].Page1[0].f1_30[0]").setText(localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}").firstName || "" : "" + ", " + localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}").lastName || "" : "");
        form.getTextField("topmostSubform[0].Page1[0].f1_31[0]").setText(formData.city + "," + formData.state + "," + formData.zipcode);
        form.getTextField("topmostSubform[0].Page1[0].f1_32[0]").setText(localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}").phoneNumber || "" : "");

        // Save and prepare for download
        const updatedPdfBytes = await pdfDoc.save();
        const blob = new Blob([updatedPdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Updated_Form8843.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };



    return (
        <></>

    );
};

export default PDFGenerate;