import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import Banner from "../banner/banner";
import { FaWpforms } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";
import { GrCompliance } from "react-icons/gr";
import { GoCreditCard } from "react-icons/go";
import { LiaSalesforce } from "react-icons/lia";
import { AiOutlineFileDone } from "react-icons/ai";
import serAbout from "../../assets/images/serviceAbt.jpg";
import service1 from "../../assets/images/service1.jpg";
import service2 from "../../assets/images/service2.png";
import service3 from "../../assets/images/service3.jpg";
import service4 from "../../assets/images/service4.png";
import service5 from "../../assets/images/service5.webp";
import "./services.css";

const Services = () => {
  const navigate = useNavigate();

  const openServicePage = (
    service:
      | "taxPrep"
      | "salesTax"
      | "payroll"
      | "businessRegistration"
      | "bookkeeping"
      | "fmcsa"
      | "form8843"
  ) => {
    const serviceRoutes = {
      taxPrep: "/services/taxPreparationFiling",
      salesTax: "/services/salesTaxRegistration",
      payroll: "/services/payrollSetup",
      businessRegistration: "/services/businessRegistration",
      bookkeeping: "/services/bookkeeping",
      fmcsa: "/services/fmcsaCompliance",
      form8843: "/services/taxGuideStudents",
    } as const;

    navigate(serviceRoutes[service]);
  };

  return (
    <>
      <Header />
      <Banner
        title="Services"
        description="We don't just provide services, we provide a roadmap for growth. Explore our suite of financial and compliance solutions tailored for the modern entrepreneur."
      />
      <section className="serAbout">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <h4 className="mb-3">What We Do</h4>
              <h2>The real experts in the field will provide</h2>
              <p className="mb-4">
                High standards, responsiveness, and qualified services are the three
                underlying principles of work.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <ul>
                    <li>Tax Preparation & Filing</li>
                    <li>Sales Tax Registration & Filing</li>
                    <li>Payroll Setup & Compliance</li>
                    <li>Business Registration Services</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul>
                    <li>Bookkeeping Services</li>
                    <li>FMCSA Compliance</li>
                    <li>Tax Guide For Indian Students</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src={serAbout} className="About Us w-75" />
            </div>
          </div>
        </div>
      </section>
      <section className="serIntro">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div
              className="col-md-6 col-lg-4 mb-3"
              onClick={() => openServicePage("taxPrep")}
            >
              <div className="serInfoBox overflow-hidden shadow">
                <img src={service1} className="w-100 serInfoImg" />
                <div className="overlay">
                  <div className="head d-flex align-items-center">
                    <div className="headtitle">
                      <AiOutlineFileDone />
                    </div>
                    <div>
                      <h3 className="m-0">Tax Preparation & Filing</h3>
                    </div>
                  </div>
                  <p>
                    We provide complete tax preparation and filing services for
                    individuals, businesses, and self-employed professionals. Our
                    services include:
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-3"
              onClick={() => openServicePage("salesTax")}
            >
              <div className="serInfoBox overflow-hidden shadow">
                <img src={service2} className="w-100 serInfoImg" />
                <div className="overlay">
                  <div className="head d-flex align-items-center">
                    <div className="headtitle">
                      <LiaSalesforce />
                    </div>
                    <div>
                      <h3 className="m-0">Sales Tax Registration & Filing</h3>
                    </div>
                  </div>
                  <p>
                    Sales tax compliance is critical and often complicated for product
                    and service-based businesses. We offer:
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-3"
              onClick={() => openServicePage("payroll")}
            >
              <div className="serInfoBox overflow-hidden shadow">
                <img src={service3} className="w-100 serInfoImg" />
                <div className="overlay">
                  <div className="head d-flex align-items-center">
                    <div className="headtitle">
                      <GoCreditCard />
                    </div>
                    <div>
                      <h3 className="m-0">Payroll Setup & Compliance</h3>
                    </div>
                  </div>
                  <p>
                    Managing payroll can be time-consuming and risky if done
                    incorrectly. We offer full-service payroll solutions, including:
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-3"
              onClick={() => openServicePage("businessRegistration")}
            >
              <div className="serInfoBox overflow-hidden shadow">
                <img src={service4} className="w-100 serInfoImg" />
                <div className="overlay">
                  <div className="head d-flex align-items-center">
                    <div className="headtitle">
                      <MdAppRegistration />
                    </div>
                    <div>
                      <h3 className="m-0">Business Registration Services</h3>
                    </div>
                  </div>
                  <p>
                    Starting a business the right way saves time and legal trouble down
                    the line. We assist with:
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-3"
              onClick={() => openServicePage("bookkeeping")}
            >
              <div className="serInfoBox overflow-hidden shadow">
                <img src={service5} className="w-100 serInfoImg" />
                <div className="overlay">
                  <div className="head d-flex align-items-center">
                    <div className="headtitle">
                      <SlBookOpen />
                    </div>
                    <div>
                      <h3 className="m-0">Bookkeeping Services</h3>
                    </div>
                  </div>
                  <p>
                    Accurate bookkeeping is the foundation of any successful business.
                    Our services include:
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-3"
              onClick={() => openServicePage("fmcsa")}
            >
              <div className="serInfoBox overflow-hidden shadow">
                <img src={service4} className="w-100 serInfoImg" />
                <div className="overlay">
                  <div className="head d-flex align-items-center">
                    <div className="headtitle">
                      <GrCompliance />
                    </div>
                    <div>
                      <h3 className="m-0">FMCSA Compliance</h3>
                    </div>
                  </div>
                  <p>
                    We offer end-to-end compliance support for trucking and logistics
                    businesses regulated by FMCSA. Our services include:
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-3"
              onClick={() => openServicePage("form8843")}
            >
              <div className="serInfoBox overflow-hidden shadow">
                <img src={service5} className="w-100 serInfoImg" />
                <div className="overlay">
                  <div className="head d-flex align-items-center">
                    <div className="headtitle">
                      <FaWpforms />
                    </div>
                    <div>
                      <h3 className="m-0">Tax Guide For Indian Students</h3>
                    </div>
                  </div>
                  <p>
                    Complete tax guide for Indian students on F1 visa, including Form
                    8843 filing requirements and deadlines:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
