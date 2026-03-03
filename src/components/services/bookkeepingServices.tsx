import Header from "../header/header";
import Footer from "../footer/footer";
import Banner from "../banner/banner";

const BookkeepingServices = () => {
  return (
    <>
      <Header />
      <Banner
        title="Bookkeeping Services"
        description="Accurate bookkeeping is the foundation of every successful business."
      />

      <section className="service-section">
        <div className="container service-wrapper">

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
      `}</style>
    </>
  );
};

export default BookkeepingServices;