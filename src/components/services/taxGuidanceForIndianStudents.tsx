import Header from "../header/header";
import Footer from "../footer/footer";
import Banner from "../banner/banner";
import { Link } from "react-router-dom";

const F1TaxGuide = () => {
  return (
    <>
      <Header />
      <Banner
        title="Complete Tax Guide For Indian Students On F1 Visa"
        description="Important U.S. tax filing information for F1 students."
      />

      <section className="guide-section">
        <div className="container guide-wrapper">

          <h2 className="guide-title">
            Complete Tax Guide For Indian Students On F1 Visa.
          </h2>

          <p>
            Indian students studying in the United States are required to comply with U.S. tax laws every year, even if they did not earn any income.
            Many students unknowingly miss required filings, which can lead to penalties, IRS notices, or complications during future visa or Green Card processing.
          </p>

          <p>
            This guide explains who needs to file, what forms are required, important deadlines, and common mistakes to avoid.
          </p>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="guide-table">
              <thead>
                <tr>
                  <th></th>
                  <th>F1</th>
                  <th>F1 (On Campus PartTime | CPT | OPT)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tax Form</td>
                  <td>Form 8843</td>
                  <td>1040 NR + Form 8843</td>
                </tr>
                <tr>
                  <td>Due Date</td>
                  <td>June 15th</td>
                  <td>April 15th</td>
                </tr>
                <tr>
                  <td>Tax Residential Status</td>
                  <td>Non-Resident</td>
                  <td>Non-Resident</td>
                </tr>
                <tr>
                  <td>Filing Criteria</td>
                  <td>Need to File Irrespective of the Income (Even with No Income)</td>
                  <td>Need to File When You have Income.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Mandatory Forms for Indian Students</h3>
          <h4>Form 8843 (Required for All Students)</h4>
          <p>Form 8843 must be filed by every F1 and J1 student, regardless of income.</p>

          <ul className="check-list">
            <li>Confirms non-resident tax status</li>
            <li>Required even with zero income</li>
            <li>Failure to file may result in non-compliance records</li>
          </ul>

          <p>
            If your Form 8843 has not been filed, we will prepare and assist with filing it at no cost, except for mailing expenses.
          </p>

          <h3>Federal & State Tax Returns (If You Earned Income) – 1040NR + Form 8843</h3>

          <ul className="check-list">
            <li>On-campus employment income (W-2)</li>
            <li>CPT or OPT salary</li>
            <li>Internship stipends</li>
            <li>Taxable scholarship or fellowship income</li>
            <li>Bank interest</li>
          </ul>

          <h3>Resident vs Non-Resident Tax Status</h3>
          <p>
            Most Indian students are considered Non-Resident Aliens (NRA) during their first five calendar years in the U.S.
          </p>

          <ul className="check-list">
            <li>You cannot claim the standard deduction</li>
            <li>You cannot file jointly</li>
            <li>Different tax rates and rules apply</li>
            <li>Special tax forms are required</li>
          </ul>

          <h3>Important Tax Deadlines</h3>
          <ul className="check-list">
            <li><strong>April 15:</strong> Federal and state tax returns (if income was earned)</li>
            <li><strong>June 15:</strong> Form 8843 only (if no income)</li>
          </ul>

          <h3>Common Tax Filing Mistakes to Avoid</h3>
          <ul className="check-list">
            <li>Not filing Form 8843</li>
            <li>Filing as a U.S. resident incorrectly</li>
            <li>Using tax software not designed for non-residents</li>
            <li>Missing state tax filings</li>
            <li>Ignoring IRS or state tax notices</li>
          </ul>

          <h3>Why Choose Us?</h3>
          <ul className="check-list">
            <li>Team of CPA (USA) & Chartered Accountant (India)</li>
            <li>Over 10 years of experience</li>
            <li>Specialized in Indian student tax filings</li>
            <li>Accurate, compliant, transparent service</li>
            <li>Year-round support</li>
          </ul>

          <div className="cta-box">
            <h4>Book a Free Consultation</h4>
            <p>
              Schedule a free 15-minute consultation today and file with confidence.
            </p>
           <Link to="/taxfilling" className="apply-btn">
  Apply Now
</Link>
          </div>

        </div>
      </section>

      <Footer />

      {/* Styling */}
      <style>{`
        .guide-section {
          background: #f4f4f4;
          padding: 60px 0;
        }

        .guide-wrapper {
          background: #ffffff;
          padding: 40px;
          border-left: 8px solid #1c2331;
          border-radius: 8px;
          max-width: 1100px;
          margin: auto;
        }

        .guide-title {
          font-weight: 700;
          margin-bottom: 20px;
        }

        .guide-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }

        .guide-table th,
        .guide-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: center;
        }

        .guide-table th {
          background: #f8f8f8;
          font-weight: 600;
        }

        .check-list {
          list-style: none;
          padding-left: 0;
        }

        .check-list li {
          position: relative;
          padding-left: 30px;
          margin-bottom: 12px;
        }

        .check-list li:before {
          content: "✔";
          position: absolute;
          left: 0;
          color: #6ab04c;
          font-weight: bold;
        }

        .cta-box {
          margin-top: 40px;
          padding: 25px;
          background: #f9f9f9;
          border-radius: 6px;
        }

        .apply-btn {
          display: inline-block;
          margin-top: 15px;
          background-color: #1c2331;
          color: #fff;
          padding: 10px 25px;
          border-radius: 6px;
          text-decoration: none;
        }

        .apply-btn:hover {
          background-color: #111827;
        }
      `}</style>
    </>
  );
};

export default F1TaxGuide;