import Footer from "../footer/footer";
import Header from "../header/header";
import Banner from "../banner/banner";
import about1 from '../../assets/images/about-1.png';
import "./aboutUs.css"

const AboutUs = () => {
  return (
    <>
      <Header />
      <Banner title="About" />
      <section className="aboutUs">
        <div className="container">
          <div className="row justify-content-center align-items-center ">
            <div className="col-md-5  text-center mb-4 mb-md-0">
              <img src={about1} alt="About Us" className="w-75" />
            </div>
            <div className="col-md-7">
              <h2 className="mb-4">Your Trusted Partner in Bookkeeping, Tax Filing & Compliance</h2>
              <p>At Easy Tax Group, we specialize in delivering reliable, efficient, and personalized financial services to help individuals and businesses stay organized, compliant, and financially healthy.</p>
              <p>As a leading firm in bookkeeping, tax filing, and regulatory compliance, our team of experienced professionals is committed to simplifying your financial operations — from day-to-day transaction tracking to complex tax filings and government reporting.</p>
              <p className="mb-0">With a strong focus on accuracy, transparency, and long-term client success, we work closely with you to ensure your books are clean, taxes are filed on time, and compliance is never a concern.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="offer">
                <div className="container">
                    <div className="row justify-content-center mb-4">
                        <div className="col-md-12 text-center">
                            <h2 className="mb-2">What We Offer</h2>
                            <p className="mb-0 w-75 m-auto">Whether you’re a startup, small business, or independent professional, we provide the support and expertise you need to manage your financial responsibilities with ease.</p>
                        </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <div className="offerBox text-center shadow p-4">
                          <h3 className="mb-3">Accurate & Timely Bookkeeping</h3>
                          <p>Keep your financial records organized and up to date</p>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <div className="offerBox text-center shadow p-4">
                          <h3 className="mb-3">Expert Tax Filing Services</h3>
                          <p>Maximize savings and stay IRS-compliant year-round</p>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <div className="offerBox text-center shadow p-4">
                          <h3 className="mb-3">Full Spectrum Compliance Support</h3>
                          <p>Meet federal and state requirements with confidence</p>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="offerBox text-center shadow p-4">
                          <h3 className="mb-3">Personalized Financial Oversight</h3>
                          <p>Get insights that support smarter business decisions</p>
                        </div>
                      </div>
                    </div>
                </div>
            </section>
      <Footer />
    </>
  );
};
export default AboutUs;