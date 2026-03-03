import Footer from "../footer/footer";
import Header from "../header/header";
import Banner from "../banner/banner";

const SalesTaxRegistration = () => {
  return (
    <>
      <Header />
      <Banner
        title="Sales Tax Registration & Filing"
        description="Professional sales tax registration and compliance services."
      />

      <section className="service">
        <div className="container service-content">

          <p className="service-intro">
            Sales tax compliance is critical — and often complicated — for product and service-based businesses. We offer:
          </p>

          <ul className="service-list">
            <li>
              <span className="check">✔</span>
              <div>
                <strong>Sales Tax Registration:</strong> Assistance with registering for state sales tax IDs across multiple jurisdictions.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Filing Support:</strong> Monthly, quarterly, or annual sales tax filing depending on your state requirements.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Record-Keeping Compliance:</strong> We help you maintain accurate sales records to support your filings in the event of a sales tax audit.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Multi-State Nexus Guidance:</strong> If your business sells in multiple states, we help determine where you have nexus and your responsibilities in each state.
              </div>
            </li>
          </ul>

          <p className="service-footer">
            Stay compliant with evolving sales tax rules and avoid costly penalties.
          </p>

        </div>
      </section>

      <Footer />

      {/* Internal CSS */}
      <style>{`
        .service {
          padding: 60px 0;
          background-color: #f9f9f9;
        }

        .service-content {
          max-width: 900px;
          margin: 0 auto;
          font-size: 18px;
          line-height: 1.7;
          color: #333;
        }

        .service-intro {
          margin-bottom: 30px;
          font-size: 20px;
        }

        .service-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .service-list li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 22px;
        }

        .check {
          color: #2ecc71;
          font-size: 22px;
          margin-right: 15px;
          margin-top: 3px;
        }

        .service-list strong {
          font-weight: 600;
        }

        .service-footer {
          margin-top: 30px;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default SalesTaxRegistration;