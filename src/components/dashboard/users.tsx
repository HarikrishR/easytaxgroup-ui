import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import "./dashboard.css"

const Users = () => {
    const [userData, setUserData] = useState<any>(null);

    const fetchUsers = async () => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            var formData = {
                
            };
            // Fetch user data from the server
            await axios.post(serviceUrl + '/fetchUsers', formData)
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
        fetchUsers();
    },[]);

    return (
        <>
            <section className="users">
                {
                    !userData ? <p>Loading...</p> :
                        <>
                            
                        </>
                }

            </section>
        </>
    );
};

export default Users;