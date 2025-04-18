import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { AuthContext } from '../../authContext';
import { useDispatch } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { FaUsers, FaWpforms } from "react-icons/fa";
import Tab from 'react-bootstrap/Tab';
import Profile from "./profile";
import Users from "./users";
import Form from "./form";
import logo from '../../assets/images/logo.png';
import "./dashboard.css"
import './adminDashboard.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { userData } from '../../redux/actions/action';

const Dashboard = () => {
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();

    const handleLogout = () => {
            auth?.logout();
            dispatch(userData(null));
        };

    return (
        <div className='dashboard'>
            <div className="navbar navbar-light sticky-top bg-light flex-md-nowrap shadow-sm py-2">
                <div className="container-fluid">
                    <a className="navbar-brand col-md-3 col-lg-2" href="#">
                        <img src={logo} className='logo ps-4' />
                    </a>
                    <button className="navbar-toggler d-sm-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-none d-sm-block">
                        <button onClick={() => { handleLogout() }} className="btnPrimary me-4 small">Logout</button>
                    </div>
                </div>

            </div>

            <Tab.Container defaultActiveKey="profile">
                <div className="container-fluid">
                    <div id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse shadow-sm">
                        <div className="position-sticky p-4">
                            <Nav className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="profile">
                                        <CgProfile className="me-2" />
                                        Profile
                                    </Nav.Link>
                                </Nav.Item>
                                {
                                    (localStorage.getItem('authRole') ? atob(localStorage.getItem('authRole')!) : '') === 'ADMIN' ?
                                        <Nav.Item>
                                            <Nav.Link eventKey="users">
                                                <FaUsers className="me-2" />
                                                Users
                                            </Nav.Link>
                                        </Nav.Item>
                                        : ''
                                }
                                {
                                    (localStorage.getItem('authRole') ? atob(localStorage.getItem('authRole')!) : '') === 'CLIENT' ?
                                        <Nav.Item>
                                            <Nav.Link eventKey="forms">
                                                <FaWpforms className="me-2" />
                                                Forms
                                            </Nav.Link>
                                        </Nav.Item>
                                        : ''
                                }
                            </Nav>
                            <div className="d-block d-sm-none">
                                <button onClick={() => { handleLogout() }} className="btnPrimary me-4 small">Logout</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 ms-sm-auto col-lg-10">
                        <div className="p-4">
                            <Tab.Content>
                                <Tab.Pane eventKey="profile">
                                    <Profile />
                                </Tab.Pane>
                                {
                                    (localStorage.getItem('authRole') ? atob(localStorage.getItem('authRole')!) : '') === 'ADMIN' ?
                                        <Tab.Pane eventKey="users"><Users /></Tab.Pane>
                                        : ''
                                }
                                {
                                    (localStorage.getItem('authRole') ? atob(localStorage.getItem('authRole')!) : '') === 'CLIENT' ?
                                        <Tab.Pane eventKey="forms"><Form /></Tab.Pane>
                                        : ''
                                }
                            </Tab.Content>
                        </div>
                    </div>
                </div>
            </Tab.Container>
        </div>
    );
};
export default Dashboard;