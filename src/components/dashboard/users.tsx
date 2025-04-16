import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "./dashboard.css"

const Users = () => {
    const [userData, setUserData] = useState<any>(null);

    const fetchUsers = async () => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            // Fetch user data from the server
            await axios.get(serviceUrl + '/fetchUsers')
                .then((response: { data: any; }) => {
                    var data = response.data.data;
                    setUserData(data);
                })
                .catch((error: any) => {
                    toast.error("Error fetching user data!");
                });

        } catch (error) {
            toast.error("Error fetching user data!");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <section className="users">
                {/* <h2 className="mb-3">Users</h2> */}
                <p className="mb-4">Here you can view all users.</p>
                {
                    !userData ? <p>Loading...</p> :
                        <>
                            <div className="usersDetails">
                                <Table striped bordered hover size='sm'>
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userData.length === 0 ?
                                                <tr>
                                                    <td colSpan={5} className="text-center">No Users Found!</td>
                                                </tr> : userData.map((user: any) => (
                                                    <tr key={user.userId}>
                                                        <td>{user.userId}</td>
                                                        <td>{user.firstName}</td>
                                                        <td>{user.lastName}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phoneNumber}</td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </Table>
                            </div>

                        </>
                }

            </section>
        </>
    );
};

export default Users;