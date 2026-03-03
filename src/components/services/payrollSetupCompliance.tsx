import Footer from "../footer/footer";
import Header from "../header/header";
import Banner from "../banner/banner";

const PayrollSetup = () => {
  return (
    <>
      <Header />
      <Banner
        title="Payroll Setup & Compliance"
        description="Complete payroll setup and compliance solutions."
      />

      <section className="service">
        <div className="container service-content">

          <p className="service-intro">
            Managing payroll can be time-consuming and risky if done incorrectly. We offer full-service payroll solutions, including:
          </p>

          <ul className="service-list">
            <li>
              <span className="check">✔</span>
              <div>
                <strong>Initial Setup of Payroll Systems:</strong> We help you set up your payroll system with the appropriate tax and employee classifications.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Payroll Processing:</strong> Weekly, bi-weekly, or monthly payroll runs, including gross-to-net calculations and paycheck generation.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Tax Filings:</strong> Timely preparation and filing of federal and state payroll forms including Form 941 (Quarterly), 940 (Annual FUTA), and state unemployment or withholding forms.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Compliance Management:</strong> We ensure that your payroll complies with IRS and state laws, including minimum wage, overtime, and employee classification rules.
              </div>
            </li>
          </ul>

          <p className="service-footer">
            Perfect for small and medium sized businesses that want to outsource payroll stress-free.
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

export default PayrollSetup;