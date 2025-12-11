

import axios from 'axios';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import "./dashboard.css"

const UsDotApp = () => {
    const [orderData, setOrderData] = useState<any>([]);

    const fetchDotApplication = async () => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            // Fetch user data from the server
            await axios.get(serviceUrl + '/fetchUsdotapplications')
                .then((response: { data: any; }) => {
                    var data = response.data.data;
                    setOrderData(data);
                })
                .catch((error: any) => {
                    console.error(error);
                    toast.error("Error fetching Applications!");
                });

        } catch (error) {
            console.error(error);
            toast.error("Error fetching Applications!");
        }
    };

    useEffect(() => {
        fetchDotApplication();
    }, []);

    // Function to safely parse the JSON string property and return a clean array of strings
    const parseTypeOfProperty = (rawData: any): string[] => {
        let propertyList: string[] = [];

        if (Array.isArray(rawData)) {
            // Case 1: Data is already a parsed array (new data)
            propertyList = rawData.map(String);
        } else if (typeof rawData === 'string') {
            try {
                // Case 2: Data is a string that needs parsing (old/double-stringified data)
                let parsed = JSON.parse(rawData);

                // If the result is a string, it means it was double-stringified (e.g., the payload you provided)
                if (typeof parsed === 'string') {
                    parsed = JSON.parse(parsed); // Parse it again
                }

                // If the final parsed result is an array, map it
                propertyList = Array.isArray(parsed) ? parsed.map(String) : [String(rawData)];
            } catch (e) {
                // Case 3: Parsing fails, treat the whole original string as a single item
                propertyList = [rawData];
            }
        } else {
            // Fallback for null/undefined/other
            propertyList = [String(rawData || 'N/A')];
        }

        // Final check to clean up remaining JSON string artifacts (quotes/brackets/backslashes)
        return propertyList.map(item => item.replace(/\"|\\|\[|\]/g, ''));
    };

    const serviceUrl = import.meta.env.VITE_SERVICE_URL;
    const licenseBaseUrl = serviceUrl ? `${serviceUrl}/uploads/licenses/` : '/';

    return (
        <>
            <section className="usDotApp">
                <h2 className="mb-3">Orders</h2>
                <div className="table-responsive">
                    <Table striped bordered hover size='sm' className='nowrap-table'>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Business Name</th>
                                <th>Email</th>
                                <th>Area Code</th>
                                <th>Phone Number</th>
                                <th>Service Offered</th>
                                <th>Type Of Property</th>
                                <th>No Of Vehicle</th>
                                <th>Interstate or Intrastate</th>
                                <th>Driving License</th>
                                <th>Business License</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderData.length === 0 ?
                                    <tr>
                                        <td colSpan={20} className="text-center">No Applications Found!</td>
                                    </tr> : orderData.map((data: any) => (
                                        <tr key={data.userId}>
                                            <td>{data.userId}</td>
                                            <td>{data.firstName + " " + data.lastName}</td>
                                            <td>{data.businessName}</td>
                                            <td>{data.email}</td>
                                            <td>{data.areaCode}</td>
                                            <td>{data.phoneNumber}</td>
                                            <td>{data.serviceOffered}</td>
                                            <td>
                                                <ul>
                                                    {parseTypeOfProperty(data.typeOfProperty).map((item: string, index: number) => (

                                                        <li key={index}>{item}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>{data.numberOfVehicles}</td>
                                            <td>{data.interstateIntrastate}</td>
                                            <td>
                                                {data.driversLicenseFileName ? (
                                                    <a
                                                        href={`${licenseBaseUrl}${data.driversLicenseFileName}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: 'underline' }}
                                                    >
                                                        View License
                                                    </a>
                                                ) : 'N/A'}
                                            </td>
                                            <td>
                                                {data.businessLicenseFileName ? (
                                                    <a
                                                        href={`${licenseBaseUrl}${data.businessLicenseFileName}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: 'underline' }}
                                                    >
                                                        View License
                                                    </a>
                                                ) : 'N/A'}
                                            </td>
                                            <td>{
                                                new Date(data.createdAt).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                }).replace(',', '').replace(/\//g, '-')
                                            }</td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
};

export default UsDotApp;