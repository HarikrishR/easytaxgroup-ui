

import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { BsDownload } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import Table from 'react-bootstrap/Table';
import { getAdminOrderFormData, getGeneratePDF, getUpdateOrder } from "../../redux/actions/action";
import { useEffect, useState } from "react";
import "./dashboard.css"

const AdminOrders = () => {
    const [orderData, setOrderData] = useState<any>([]);
    const [updateOrderId, setUpdateOrderId] = useState<any>(null);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ status: '', trackingLink: '', trackingNumber: '' });
    const [errors, setErrors] = useState<{ status?: string; trackingLink?: string; trackingNumber?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, name } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Validate the input field
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
                .then((response: { data: any; }) => {
                    console.log(response);
                    fetchOrders();
                    dispatch(getUpdateOrder(false));
                    toast.success("Updated successful");
                })
                .catch((error: any) => {
                    toast.error(error.response.data.message);
                }); // Dispatch the action with form data
        }
    };

    const updateOrder = useSelector((state: any) => state.updateOrder);

    const fetchOrders = async () => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            // Fetch user data from the server
            await axios.get(serviceUrl + '/fetchOrders')
                .then((response: { data: any; }) => {
                    var data = response.data.data;
                    setOrderData(data);
                })
                .catch((error: any) => {
                    console.error(error);
                    toast.error("Error fetching orders!");
                });

        } catch (error) {
            console.error(error);
            toast.error("Error fetching orders!");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDownload = (data: any) => {
        // Logic to download the form
        console.log(data);
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
                <div className="row">
                    <Table striped bordered hover size='sm'>
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
                                        <td colSpan={20} className="text-center">No Orders Found!</td>
                                    </tr> : orderData.map((data: any) => (
                                        <tr key={data.orderId}>
                                            <td>{data.orderId}</td>
                                            <td>{data.user.userId}</td>
                                            <td>{data.user.firstName + " " + data.user.lastName}</td>
                                            <td>{data.user.email}</td>
                                            <td>{data.user.phoneNumber}</td>
                                            <td>{data.user.usaStreet + ", " + data.user.usaCity + ", " + data.user.usaState + ", " + data.user.usaZipcode + "."}</td>
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
                                                <span className={`mb-3 statusDes ${data.status === 'Cancelled' ? 'cancel' : ''}`}>
                                                    {data.status === 'Pending' ? 'Filed' : data.status === 'Cancelled' ? 'Cancelled' : ''}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </Table>

                </div>
                <>
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
                </>
            </section>
        </>
    );
};

export default AdminOrders;