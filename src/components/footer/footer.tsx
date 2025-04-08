import './footer.css'
import logo from '../../assets/images/logo.png'

const Footer = () => {
    return (
        <>
            <section className="footer">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <img src={logo} alt="logo" className='logo' />
                            <p className='mb-0'>At Easy Tax Group, we are dedicated to providing comprehensive compliance services that cover every aspect of your business needs.</p>
                        </div>
                        <div className='col-md-3'>
                            <h3>Company</h3>
                            <ul>
                                <li><a href='' title=''>Home</a></li>
                                <li><a href='' title=''>About Us</a></li>
                                <li><a href='' title=''>Services</a></li>
                                <li><a href='' title=''>Contacts</a></li>
                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <h3>Socials</h3>
                            <ul>
                                <li><a href='' title=''>Facebook</a></li>
                                <li><a href='' title=''>Twitter</a></li>
                                <li><a href='' title=''>LinkedIn</a></li>
                                <li><a href='' title=''>Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='copyright text-center mt-5'>
                    <p className='mb-0'>Copyright © 2025 Easy Tax Group. All Rights Reserved.</p>
                </div>
            </section>
        </>
    )
}

export default Footer;