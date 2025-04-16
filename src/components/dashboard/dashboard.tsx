import Footer from "../footer/footer";
import Header from "../header/header";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Profile from "./profile";
import Users from "./users";
import Form from "./form";
import "./dashboard.css"

const Dashboard = () => {
    return (
        <>
            <Header />
            <section className="dashboard">
                <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                    <div className="row">
                        <div className="col-sm-3 pe-sm-0 col-lg-2">
                            <Nav variant="pills" className="flex-column p-3">
                                <Nav.Item className="mb-2">
                                    <Nav.Link eventKey="profile">Profile</Nav.Link>
                                </Nav.Item>
                                {
                                    (localStorage.getItem('authRole') ? atob(localStorage.getItem('authRole')!) : '') === 'ADMIN' ?
                                        <Nav.Item className="mb-2">
                                            <Nav.Link eventKey="users">Users</Nav.Link>
                                        </Nav.Item>
                                        : ''
                                }
                                <Nav.Item className="mb-2">
                                    <Nav.Link eventKey="second">Forms</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className="col-sm-9 ps-sm-0 col-lg-10">
                            <Tab.Content className="p-4">
                                <Tab.Pane eventKey="profile"><Profile /></Tab.Pane>
                                {
                                    (localStorage.getItem('authRole') ? atob(localStorage.getItem('authRole')!) : '') === 'ADMIN' ?
                                    <Tab.Pane eventKey="users"><Users/></Tab.Pane>
                                    : ''
                                }
                                <Tab.Pane eventKey="second"><Form/></Tab.Pane>
                            </Tab.Content>
                        </div>
                    </div>
                </Tab.Container>
            </section>
            <Footer />
        </>
    );
};
export default Dashboard;