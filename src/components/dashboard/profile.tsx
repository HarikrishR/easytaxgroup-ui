import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import "./dashboard.css"
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../redux/actions/action';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state:any)=>state.userData)

    const fetchUserData = async () => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            var formData = {
                userId: localStorage.getItem('authUser')
            };
            // Fetch user data from the server
            await axios.post(serviceUrl + '/fetchUserById', formData)
                .then((response: { data: any; }) => {
                    var data = response.data.data;
                    dispatch(userData(data));
                })
                .catch((error: any) => {
                    console.error("Error fetching user data:", error);
                    toast.error("Error fetching user data!");
                });

        } catch (error) {
            toast.error("Error fetching user data!");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            <section className="profile">
                {
                    !user ? <p>Loading...</p> :
                        <>
                            <div className="profile-header">
                                <h2 className="mb-0">Hello {user.firstName}!</h2>
                                <p>Here you can view personal informations.</p>
                            </div>
                            <div className="profile-content mb-4">
                                <div className='subHead position-relative overflow-hidden mb-3'>
                                    <h6 className='mb-0 pe-4'>User Info</h6>
                                </div>
                                <ul className="p-0">
                                    <li><span>ID</span> {user.userId}</li>
                                    <li><span>First Name</span> {user.firstName}</li>
                                    <li><span>Last Name</span> {user.lastName}</li>
                                    <li><span>Email</span> {user.email}</li>
                                    <li><span>Phone Number</span> {user.phoneNumber}</li>
                                    <li><span>Role</span> {user.type}</li>
                                </ul>
                            </div>
                            {
                                user.street ?
                                    <div className="profile-content">
                                        <div className='subHead position-relative overflow-hidden mb-3'>
                                            <h6 className='mb-0 pe-4'>Address</h6>
                                        </div>
                                        <ul className="p-0">
                                            <li><span>Street</span> {user.usaStreet}</li>
                                            <li><span>City</span> {user.usaCity}</li>
                                            <li><span>State</span> {user.usaState}</li>
                                            <li><span>Zipcode</span> {user.usaZipcode}</li>
                                        </ul>
                                    </div> : <></>
                            }
                        </>
                }
            </section>
        </>
    );
};

export default Profile;