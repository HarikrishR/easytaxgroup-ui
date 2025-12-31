import axios from 'axios';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import { useEffect, useState, useCallback } from "react";
import Pagination from 'react-bootstrap/Pagination'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 

import "./dashboard.css"

const FormF1RegApp = () => {
    // NEW STATE FOR PAGINATION AND SEARCH
    const [applications, setApplications] = useState<any[]>([]); // Rename from orderData for clarity
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [limit, setLimit] = useState(10); // Records per pageß

    const serviceUrl = import.meta.env.VITE_SERVICE_URL;

    // Use useCallback to memoize the function, preventing unnecessary re-creation
    const fetchFormF1RegApplication = useCallback(async () => {
        try {
            // Build query parameters
            const params = {
                page: currentPage,
                limit: limit,
                search: searchQuery,
            };
            
            // Fetch applications with query parameters
            const response = await axios.get(serviceUrl + '/fetchFormf1RegApplication', { params });
                
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
        fetchFormF1RegApplication();
    }, [fetchFormF1RegApplication]);

    // HANDLERS
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); 
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    // Function to generate the Pagination controls
    const renderPagination = () => {
        let items = [];
        
        // Always show First and Previous buttons
        items.push(
            <Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />,
            <Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        );
    
        // Calculate range of page numbers to show
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
    
        if (startPage > 1) items.push(<Pagination.Ellipsis key="start-el" disabled />);
    
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item 
                    key={number} 
                    active={number === currentPage} 
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
    
        if (endPage < totalPages) items.push(<Pagination.Ellipsis key="end-el" disabled />);
    
        // Always show Next and Last buttons
        items.push(
            <Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />,
            <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        );
    
        return <Pagination>{items}</Pagination>;
    };

    // Removed the unused handleDownloadLicense for brevity.

    return (
        <>
            <section className="usDotApp">
                <h2 className="mb-3">Form F1 Visa Applications</h2>
                
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Visa Status</th>
                                <th>State Of Reseidency</th>
                                <th>Referal Name</th>
                                <th>Referal Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applications.length === 0 ? // Check applications state
                                    <tr>
                                        <td colSpan={13} className="text-center">No Applications Found!</td> {/* Corrected colspan */}
                                    </tr> : applications.map((data: any) => (
                                        <tr key={data.applicationId}>
                                            <td>{data.firstName + " " + data.lastName}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phoneNumber}</td>
                                            <td>{data.visaStatus}</td>
                                            <td>{data.stateOfResidency}</td>
                                            <td>{data.referalName}</td>
                                            <td>{data.referalPhoneNumber}</td>
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

export default FormF1RegApp;