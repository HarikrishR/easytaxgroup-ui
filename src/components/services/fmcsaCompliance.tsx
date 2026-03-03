import Header from "../header/header";
import Footer from "../footer/footer";
import Banner from "../banner/banner";
import { Link } from "react-router-dom";

const FmcsaCompliance = () => {
  return (
    <>
      <Header />
      <Banner
        title="FMCSA Compliance"
        description="End-to-end compliance support for trucking and logistics businesses."
      />

      <section className="service-section">
        <div className="container service-wrapper">

          <p className="service-intro">
            We offer end-to-end compliance support for trucking and logistics businesses regulated by the Federal Motor Carrier Safety Administration (FMCSA). Our services include:
          </p>

          <ul className="service-list">
            <li>
              <span className="check">✔</span>
              <div>
                <strong>FMCSA & DOT Registration:</strong> Assistance with obtaining or renewing your USDOT and MC numbers.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Appointment of Process Agent (BOC-3 Filing):</strong> We help you appoint a legal agent in all states through proper BOC-3 filing, a mandatory requirement for interstate motor carriers.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Unified Carrier Registration (UCR):</strong> Timely filing and renewal of UCR registration to ensure compliance and avoid penalties.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Driver Qualification File (DQF) Maintenance:</strong> Creation and management of complete DQFs, including license verification, medical certificates, background checks, and safety performance history.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Hours of Service (HOS) Compliance:</strong> Guidance on electronic logging devices (ELDs), log audits, and managing driver duty hours.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Audit Preparation:</strong> Assistance in compiling and organizing required documents to prepare for FMCSA audits or roadside inspections.
              </div>
            </li>
          </ul>

          <p className="service-footer">
            We help keep your operations compliant, efficient, and audit-ready — so you can stay on the road without interruptions.
          </p>

          <Link to="/fmcsaApply" className="apply-btn">
            Apply Now
          </Link>

        </div>
      </section>

      <Footer />

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

export default FmcsaCompliance;