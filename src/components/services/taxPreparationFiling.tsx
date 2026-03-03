import Footer from "../footer/footer";
import Header from "../header/header";
import Banner from "../banner/banner";

const TaxPreparationFiling = () => {
  return (
    <>
      <Header />
      <Banner
        title="Services"
        description="We don't just provide services, we provide a roadmap for growth. Explore our suite of financial and compliance solutions tailored for the modern entrepreneur."
      />

      <section className="service">
        <div className="container service-content">
          <p className="service-intro">
            Accurate bookkeeping is the foundation of any successful business. Our services include:
          </p>

          <ul className="service-list">
            <li>
              <span className="check">✔</span>
              <div>
                <strong>Recording Daily Transactions:</strong> We log all income and expenses, categorize transactions, and maintain ledgers.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Bank & Credit Card Reconciliation:</strong> Monthly reconciliation of your accounts to catch errors, fraud, or missed entries.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Accounts Payable/Receivable Tracking:</strong> Track what you owe vendors and what customers owe you.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Financial Statements:</strong> Timely generation of P&L statements, balance sheets, and cash flow reports based on your requirements.
              </div>
            </li>

            <li>
              <span className="check">✔</span>
              <div>
                <strong>Custom Reports:</strong> Tailored reports based on your business goals (e.g., project profitability, department performance).
              </div>
            </li>
          </ul>

          <p className="service-footer">
            Whether you're just starting out or already have a growing business, we ensure your books stay clean and tax-ready.
          </p>
        </div>
      </section>

      <Footer />

      {/* CSS inside component */}
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

export default TaxPreparationFiling;