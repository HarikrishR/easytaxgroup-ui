import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import "./dashboard.css"

const Profile = () => {
    const [userData, setUserData] = useState<any>(null);

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
                    setUserData(data);
                })
                .catch((error: any) => {
                    console.error("Error fetching user data:", error);
                    toast.error("Error fetching user data!");
                });

        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Error fetching user data!");
        }
    };

    useEffect(() => {
        fetchUserData();
    },[]);

    return (
        <>
            <section className="profile">
                {
                    !userData ? <p>Loading...</p> :
                        <>
                            <div className="profile-header">
                                <h2 className="mb-0">Hello {userData.firstName}!</h2>
                                <p>Here you can view personal informations.</p>
                            </div>
                            <div className="profile-content">
                                <ul className="p-0 mt-4">
                                    <li><span>User ID</span> {userData.userId}</li>
                                    <li><span>First Name</span> {userData.firstName}</li>
                                    <li><span>Last Name</span> {userData.lastName}</li>
                                    <li><span>Email</span> {userData.email}</li>
                                    <li><span>Phone Number</span> {userData.phoneNumber}</li>
                                    <li><span>Role</span> {userData.type}</li>
                                </ul>
                            </div>
                        </>
                }
            </section>
        </>
    );
};

export default Profile;