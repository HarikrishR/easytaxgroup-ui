import axios from 'axios';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import { useEffect, useState, useCallback } from "react";
import Pagination from 'react-bootstrap/Pagination'; // <-- ADD THIS IMPORT
import Row from 'react-bootstrap/Row'; // <-- ADD THIS IMPORT
import Col from 'react-bootstrap/Col'; // <-- ADD THIS IMPORT

import "./dashboard.css"

const BusinessRegApp = () => {
    // NEW STATE FOR PAGINATION AND SEARCH
    const [applications, setApplications] = useState<any[]>([]); // Rename from orderData for clarity
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [limit, setLimit] = useState(10); // Records per page

    const serviceUrl = import.meta.env.VITE_SERVICE_URL;
    const licenseBaseUrl = serviceUrl ? `${serviceUrl}/uploads/licenses/` : '/';

    // Use useCallback to memoize the function, preventing unnecessary re-creation
    const fetchBusinessRegApplication = useCallback(async () => {
        try {
            // Build query parameters
            const params = {
                page: currentPage,
                limit: limit,
                search: searchQuery,
            };
            
            // Fetch applications with query parameters
            const response = await axios.get(serviceUrl + '/fetchBusinessRegApplication', { params });
                
            const { 
            data = [], 
            totalPages = 1
        } = response.data?.data || {};

            setApplications(data);
            setTotalPages(totalPages);
            
        } catch (error) {
            setApplications([]); 
            setTotalPages(1);
            toast.error("Error fetching Applications!");
        }
    }, [currentPage, limit, searchQuery, serviceUrl]); // Dependencies

    useEffect(() => {
        // Fetch data whenever page, limit, or search query changes
        fetchBusinessRegApplication();
    }, [fetchBusinessRegApplication]);

    // HANDLERS
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    // Function to generate the Pagination controls
    const renderPagination = () => {
        let items = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            items.push(<Pagination.First key="first" onClick={() => handlePageChange(1)} />);
            items.push(<Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />);
            if (startPage > 2) items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        } else {
            items.push(<Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />);
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item 
                    key={number} 
                    active={number === currentPage} 
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>,
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            items.push(<Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />);
            items.push(<Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} />);
        } else {
            items.push(<Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />);
        }

        return <Pagination>{items}</Pagination>;
    };

    // Removed the unused handleDownloadLicense for brevity.

    return (
        <>
            <section className="usDotApp">
                <h2 className="mb-3">Business Registration Applications</h2>
                
                {/* SEARCH AND LIMIT CONTROLS */}
                <Row className="mb-4 align-items-center">
                    <Col xs={12} md={8} lg={4}>
                        <input
                            type="text"
                            placeholder="Search by Name, Email, or Phone..."
                            className='form-control'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Col>
                    <Col xs={12} md={4} lg={2} className="mt-2 mt-md-0 ms-auto">
                        <select 
                            value={limit} 
                            className='form-select float-end'
                            onChange={(e) => {
                                setLimit(Number(e.target.value));
                                setCurrentPage(1); // Reset to page 1 when limit changes
                            }}
                        >
                            <option value={10}>Show 10</option>
                            <option value={25}>Show 25</option>
                            <option value={50}>Show 50</option>
                        </select>
                    </Col>
                </Row>
                
                <div className="table-responsive">
                    <Table striped bordered hover size='sm' className='nowrap-table'>
                        <thead>
                            <tr>
                                <th>Business Name</th>
                                <th>Business Type</th>
                                <th>Business Address Line 1</th>
                                <th>Business Address Line 2</th>
                                <th>Business City</th>
                                <th>Business State</th>
                                <th>Business Zipcode</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>SSN</th>
                                <th>Secoundary Name</th>
                                <th>Secoundary Email</th>
                                <th>Secoundary Phone Number</th>
                                <th>Secoundary SSN</th>
                                <th>Primary Driving License</th>
                                <th>Secoundary Business License</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applications.length === 0 ? // Check applications state
                                    <tr>
                                        <td colSpan={13} className="text-center">No Applications Found!</td> {/* Corrected colspan */}
                                    </tr> : applications.map((data: any) => (
                                        <tr key={data.applicationId}>
                                            <td>{data.businessName}</td>
                                            <td>{data.businessType}</td>
                                            <td>{data.businessAddressLineOne}</td>
                                            <td>{data.businessAddressLineTwo}</td>
                                            <td>{data.businessAddressCity}</td>
                                            <td>{data.businessAddressState}</td>
                                            <td>{data.businessAddressZip}</td>
                                            <td>{data.firstName + " " + data.lastName}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phoneNumber}</td>
                                            <td>{data.ssn}</td>
                                            <td>{data.secoundaryFirstName + " " + data.secoundaryLastName}</td>
                                            <td>{data.secoundaryEmail}</td>
                                            <td>{data.secoundaryPhoneNumber}</td>
                                            <td>{data.secoundarySSN}</td>
                                            <td>
                                                {data.primaryDiversLicenseFileName ? (
                                                    <a
                                                        href={`${licenseBaseUrl}${data.primaryDiversLicenseFileName}`}
                                                        className='text-dark'
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: 'underline' }}
                                                    >
                                                        View
                                                    </a>
                                                ) : 'N/A'}
                                            </td>
                                            <td>
                                                {data.secondaryDiversLicenseFileName ? (
                                                    <a
                                                        href={`${licenseBaseUrl}${data.secondaryDiversLicenseFileName}`}
                                                        className='text-dark'
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: 'underline' }}
                                                    >
                                                        View
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

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                        {renderPagination()}
                    </div>
                )}
            </section>
        </>
    );
};

export default BusinessRegApp;