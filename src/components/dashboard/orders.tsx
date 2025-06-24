

import axios from 'axios';
import { toast } from 'react-toastify';
import { getOrderDataById } from "../../redux/actions/action";
import { useEffect, useState } from "react";
import "./dashboard.css"
import { useDispatch } from 'react-redux';

const Orders = () => {
    const [orderData, setOrderData] = useState<any>([]);
    const dispatch = useDispatch();

    const fetchOrders = async () => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            // Fetch user data from the server
            var orderData = {
                userId: localStorage.getItem('authUser')
            };
            await axios.post(serviceUrl + '/fetchOrdersById', orderData)
                .then((response: { data: any; }) => {
                    var data = response.data.data;
                    dispatch(getOrderDataById(data));
                    setOrderData(data);
                })
                .catch((error: any) => {
                    console.error("Error fetching orders:", error)
                    toast.error("Error fetching orders!");
                });

        } catch (error) {
            toast.error("Error fetching orders!");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <section className="orders">
                <h2 className="mb-3">Orders</h2>
                <div className="row">
                    {
                        orderData.length === 0 ?
                            <div className="col-12">
                                <p className="mb-0 text-center">No Orders Found!</p>
                            </div> :
                            orderData.map((data: any) => (
                                <div className="col-sm-6 col-lg-4 mb-4" key={data.orderId}>
                                    <div className="card shadow">
                                        <div className="card-body">
                                            <h5 className="mb-3"># {data.orderId}</h5>
                                            <p className="mb-1 sub"><span>Form :</span> {data.form}</p>
                                            <p className="mb-1 sub"><span>Years : </span>{ 
                                                data.submittedYear.map((year: any, index: number) => (
                                                    <span key={year}>
                                                        {year}{index !== data.submittedYear.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))
                                            }</p>
                                            <p className="mb-2 sub"><span>Payment :</span> {data.paymentStatus}</p>
                                            <div className="status">
                                                <p className="mb-1"><span className='statusHead'>Status : </span>
                                                    <span className={`mb-2 statusDes ${data.status === 'Pending' ? 'filed' : data.status === 'Cancelled' ? 'cancel' : data.status === 'Under Review' ? 'ur' : ''}`}>
                                                    {data.status === 'Pending' ? 'Filed' : data.status === 'Cancelled' ? 'Cancelled' : data.status === 'Under Review' ? 'Under Review' : ''}
                                                    </span>
                                                </p>
                                            </div>
                                            {
                                                data.status === 'Pending' ? 
                                                <>
                                                <p className='mb-1 sub'><span>Tracking Link :</span> <a href={data.trackingLink} target='_blank' className='text-decoration-none'>Click here</a></p>
                                                <p className='mb-1 sub'><span>Tracking Number :</span> {data.trackingNumber || "N/A"}</p>
                                                
                                                </> : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </section>
        </>
    );
};

export default Orders;