import Header from "../header/header";
import Footer from "../footer/footer";
import Banner from "../banner/banner";
import { Link } from "react-router-dom";

const BusinessRegistrationServices = () => {
  return (
    <>
      <Header />
      <Banner
        title="Business Registration Services"
        description="Starting a business the right way saves time and legal trouble down the line."
      />

      <section className="service-section">
        <div className="container service-wrapper">

          <p className="service-intro">
            Starting a business the right way saves time and legal trouble down the line. We assist with:
          </p>

          <ul className="service-list">
            <li>
              <span className="check">✔</span>
              <div>
                <strong>Entity Selection Guidance:</strong> We help you choose between LLC, S-Corp, C-Corp, or Sole Proprietorship based on your goals and tax situation.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Business Name Search & Registration:</strong> Ensuring your desired business name is available and registering it with the relevant authorities.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>EIN (Employer Identification Number) Application:</strong> Fast and accurate EIN registration with the IRS.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>State-Level Registration & Licensing:</strong> Registration with state departments for sales tax, employer tax, and local business licenses as needed.
              </div>
            </li>
          </ul>

          <p className="service-footer">
            Let us guide you through every step of launching your business.
          </p>

          <Link to="/businessRegService" className="apply-btn">
            Apply Now
          </Link>

        </div>
      </section>

      <Footer />

      {/* Internal Styling */}
      <style>{`
        .service-section {
          background: #f4f4f4;
          padding: 60px 0;
        }

        .service-wrapper {
          background: #ffffff;
          padding: 40px;
          border-left: 8px solid #1c2331;
          border-radius: 8px;
          max-width: 1000px;
          margin: auto;
        }

        .service-intro {
          font-size: 20px;
          margin-bottom: 30px;
          color: #333;
        }

        .service-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .service-list li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
          font-size: 18px;
          color: #333;
        }

        .check {
          color: #6ab04c;
          font-size: 22px;
          margin-right: 15px;
          margin-top: 4px;
        }

        .service-list strong {
          font-weight: 600;
        }

        .service-footer {
          margin-top: 25px;
          font-size: 18px;
          color: #333;
        }

        .apply-btn {
          display: inline-block;
          margin-top: 25px;
          background-color: #1c2331;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 16px;
          transition: 0.3s ease;
        }

        .apply-btn:hover {
          background-color: #111827;
        }
      `}</style>
    </>
  );
};

export default BusinessRegistrationServices;