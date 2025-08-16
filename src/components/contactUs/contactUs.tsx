import Footer from "../footer/footer";
import Header from "../header/header";
import Banner from "../banner/banner";
import phone from '../../assets/images/phone.png';
import email from '../../assets/images/email.png';
import location from '../../assets/images/location.png';
import "./contactUs.css"

const ContactUs = () => {
  return (
    <>
      <Header />
      <Banner title="Contact" />
      <section className="contactUs">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="mb-3 getInTouch">Get in Touch</h2>
              <p>If you have any questions or need further information, feel free to reach out to us. We are here to help you with your financial needs.</p>
              <div className="contactInfo d-flex align-items-center mt-4">
                <div>
                  <img src={phone} alt="Phone Number" />
                </div>
                <div>
                  <p className="mb-1 title">Phone</p>
                  <p className="m-0 subTitle">+1 (917) 600-9952</p>
                </div>
              </div>
              <div className="contactInfo d-flex align-items-center mt-4">
                <div>
                  <img src={email} alt="Email Address" />
                </div>
                <div>
                  <p className="mb-1 title">Email</p>
                  <p className="m-0 subTitle">info@easytaxgroup.com</p>
                </div>
              </div>
              <div className="contactInfo d-flex align-items-center mt-4">
                <div>
                  <img src={location} alt="Location" />
                </div>
                <div>
                  <p className="mb-1 title">Location</p>
                  <p className="m-0 subTitle">110 Fieldcrest Ave Ste 3, Edison, NJ 08837</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.0211922116623!2d-74.34384062385212!3d40.51902267142348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c9db5f36d33f%3A0xa41dfef8fe21b57!2s110%20Fieldcrest%20Ave%20Ste%203%2C%20Edison%2C%20NJ%2008837%2C%20USA!5e0!3m2!1sen!2sin!4v1754659473437!5m2!1sen!2sin" height="350" style={{ border: "0", width: '100%' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default ContactUs;