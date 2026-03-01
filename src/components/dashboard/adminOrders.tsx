import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { BsDownload } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination'; //
import Row from 'react-bootstrap/Row'; //
import Col from 'react-bootstrap/Col'; //
import { getAdminOrderFormData, getGeneratePDF, getUpdateOrder } from "../../redux/actions/action";
import { useEffect, useState, useCallback } from "react";
import "./dashboard.css"

const AdminOrders = () => {
    const [orderData, setOrderData] = useState<any>([]);
    const [updateOrderId, setUpdateOrderId] = useState<any>(null);
    const dispatch = useDispatch();

    // NEW STATE FOR PAGINATION AND SEARCH
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [limit, setLimit] = useState(10);

    const [formData, setFormData] = useState({ status: '', trackingLink: '', trackingNumber: '' });
    const [errors, setErrors] = useState<{ status?: string; trackingLink?: string; trackingNumber?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, name } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        const newErrors = { ...errors };
        if (!value) {
            newErrors[name as keyof typeof newErrors] = `${name} is required`;
        } else
            delete newErrors[name as keyof typeof newErrors];

        setErrors(newErrors);
    };

    const validate = () => {
        const newErrors: { status?: string; trackingLink?: string; trackingNumber?: string } = {};
        if (!formData.status) {
            newErrors.status = 'Order Status is required';
        }
        if (!formData.trackingLink) {
            newErrors.trackingLink = 'Tracking Link is required';
        }
        if (!formData.trackingNumber) {
            newErrors.trackingNumber = 'Tracking Number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            var orderStatusData = {
                trackingLink: formData.trackingLink,
                trackingNumber: formData.trackingNumber,
                status: formData.status,
                id: updateOrderId,
            }
            await axios.post(serviceUrl + '/updateOrderStatus', orderStatusData)
                .then(() => {
                    fetchOrders();
                    dispatch(getUpdateOrder(false));
                    toast.success("Updated successful");
                })
                .catch((error: any) => {
                    toast.error(error.response.data.message);
                });
        }
    };

    const updateOrder = useSelector((state: any) => state.updateOrder);

    // MEMOIZED FETCH FUNCTION
    const fetchOrders = useCallback(async () => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            const params = {
                page: currentPage,
                limit: limit,
                search: searchQuery,
            };

            const response = await axios.get(serviceUrl + '/fetchOrders', { params });
            
            // Matches the nested data structure: response.data.data
            const { 
                data = [], 
                totalPages = 1 
            } = response.data?.data || {};

            setOrderData(data);
            setTotalPages(totalPages);

        } catch (error) {
            setOrderData([]);
            setTotalPages(1);
            toast.error("Error fetching orders!");
        }
    }, [currentPage, limit, searchQuery]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

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

    const renderPagination = () => {
        let items = [];
        items.push(<Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />);
        items.push(<Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />);

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

        items.push(<Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />);
        items.push(<Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />);

        return <Pagination>{items}</Pagination>;
    };

    const handleDownload = (data: any) => {
        dispatch(getGeneratePDF(true))
        dispatch(getAdminOrderFormData(data));
    };

    const openEditOrder = (data: any) => {
        dispatch(getUpdateOrder(true));
        setUpdateOrderId(data);
    }

    return (
        <>
            <section className="adminOrders">
                <h2 className="mb-3">Orders</h2>

                {/* SEARCH AND LIMIT CONTROLS */}
                <Row className="mb-4 align-items-center">
                    <Col xs={12} md={8} lg={4}>
                        <input
                            type="text"
                            placeholder="Search by ID, Name, or Email..."
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
                                setCurrentPage(1);
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
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Form</th>
                                <th>Years</th>
                                <th>Download Form</th>
                                <th>Created At</th>
                                <th>Payment</th>
                                <th>Update Status</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderData.length === 0 ?
                                    <tr>
                                        <td colSpan={13} className="text-center">No Orders Found!</td>
                                    </tr> : orderData.map((data: any) => (
                                        <tr key={data.orderId}>
                                            <td>{data.orderId}</td>
                                            <td>{data.user?.userId || 'N/A'}</td>
                                            <td>{(data.user?.firstName || '') + " " + (data.user?.lastName || '')}</td>
                                            <td>{data.user?.email || 'N/A'}</td>
                                            <td>{data.user?.phoneNumber || 'N/A'}</td>
                                            <td>{data.user ? `${data.user.usaStreet}, ${data.user.usaCity}, ${data.user.usaState}, ${data.user.usaZipcode}.` : 'N/A'}</td>
                                            <td>{data.form}</td>
                                            <td>{
                                                data.submittedYear.map((year: any, index: number) => (
                                                    <span key={year}>
                                                        {year}{index !== data.submittedYear.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))
                                            }</td>
                                            <td className='text-center'>
                                                {
                                                    data.paymentStatus === "succeeded" ?
                                                        <p className='mb-0 downloadForm' onClick={() => handleDownload(data)}><BsDownload /></p> :
                                                        <></>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    new Date(data.createdAt).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true
                                                    }).replace(',', '').replace(/\//g, '-')
                                                }
                                            </td>
                                            <td>{data.paymentStatus}</td>
                                            <td className='upper-case text-center'>
                                                {
                                                    data.paymentStatus === "succeeded" ?
                                                        <button className='btnPrimary px-1 py-0' onClick={() => openEditOrder(data.id)} ><CiEdit /></button> :
                                                        <></>
                                                }
                                            </td>
                                            <td className='upper-case'>
                                                <span className={`statusDes ${data.status === 'Pending' ? '' : data.status === 'Cancelled' ? 'cancel' : data.status === 'Under Review' ? 'ur' : ''}`}>
                                                    {data.status === 'Pending' ? 'Filed' : data.status === 'Cancelled' ? 'Cancelled' : data.status === 'Under Review' ? 'Under Review' : data.status}
                                                </span>
                                            </td>
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

                <Modal className='pdfModal' show={updateOrder} onHide={() => dispatch(getUpdateOrder(false))}>
                    <Modal.Body className='text-center p-4 orderStatusModal'>
                        <h5 className='mb-3'>Update Status</h5>
                        <form>
                            <div className="mb-4">
                                <select
                                    className="form-select"
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value=''>Select Status</option>
                                    <option value='Pending'>Pending</option>
                                    <option value='Under Review'>Under Review</option>
                                    <option value='Cancelled'>Cancelled</option>
                                </select>
                                {errors.status && (
                                    <p className="formError">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4 mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="trackingNumber"
                                    name="trackingNumber"
                                    placeholder="Tracking Number"
                                    value={formData.trackingNumber}
                                    onChange={handleChange}
                                />
                                {errors.trackingNumber && (
                                    <p className="formError">
                                        {errors.trackingNumber}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="trackingLink"
                                    name="trackingLink"
                                    placeholder="Tracking Link"
                                    value={formData.trackingLink}
                                    onChange={handleChange}
                                />
                                {errors.trackingLink && (
                                    <p className="formError">
                                        {errors.trackingLink}
                                    </p>
                                )}
                            </div>
                            <button type="submit" className="btnPrimary w-100 mt-2" onClick={handleSubmit}>Update</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </section>
        </>
    );
};

export default AdminOrders;