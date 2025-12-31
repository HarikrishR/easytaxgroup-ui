import { Link } from "react-router-dom";
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
import "./services.css"

const Services = () => {
  return (
    <>
      <Header />
      <Banner title="Services" description="We don't just provide services, we provide a roadmap for growth. Explore our suite of financial and compliance solutions tailored for the modern entrepreneur." />
      <section className="service">
        <div className="container-lg">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="row">
                <div className="col-sm-4 mb-4 mb-sm-0">
                  <div className="nav shadow align-items-start nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="taxPrep-tab" data-bs-toggle="pill" data-bs-target="#taxPrep" type="button" role="tab" aria-controls="taxPrep" aria-selected="true"><AiOutlineFileDone /> Tax Preparation & Filing</button>
                    <button className="nav-link" id="salesTaxPrep-tab" data-bs-toggle="pill" data-bs-target="#salesTaxPrep" type="button" role="tab" aria-controls="salesTaxPrep" aria-selected="false"><LiaSalesforce /> Sales Tax Registration & Filing</button>
                    <button className="nav-link" id="payrollSetup-tab" data-bs-toggle="pill" data-bs-target="#payrollSetup" type="button" role="tab" aria-controls="payrollSetup" aria-selected="false"><GoCreditCard /> Payroll Setup & Compliance</button>
                    <button className="nav-link" id="businessRegistration-tab" data-bs-toggle="pill" data-bs-target="#businessRegistration" type="button" role="tab" aria-controls="businessRegistration" aria-selected="false"><MdAppRegistration /> Business Registration Services</button>
                    <button className="nav-link" id="bookKeeping-tab" data-bs-toggle="pill" data-bs-target="#bookKeeping" type="button" role="tab" aria-controls="bookKeeping" aria-selected="false"><SlBookOpen /> Bookkeeping Services</button>
                    <button className="nav-link" id="fmca-tab" data-bs-toggle="pill" data-bs-target="#fmca" type="button" role="tab" aria-controls="fmca" aria-selected="false"><GrCompliance /> FMCSA Compliance</button>
                    <button className="nav-link" id="8843Filling-tab" data-bs-toggle="pill" data-bs-target="#8843Filling" type="button" role="tab" aria-controls="8843Filling" aria-selected="false"><FaWpforms /> Form 8843 Filing for Non-Residents</button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="taxPrep" role="tabpanel" aria-labelledby="taxPrep-tab">
                      <p>We provide complete tax preparation and filing services for individuals, businesses, and self-employed professionals. Our services include:</p>
                      <ul>
                        <li><span>Individual Tax Returns (Form 1040):</span> We ensure accurate preparation of your personal tax returns, including income from wages, investments, rental properties, freelance work, and more.</li>
                        <li><span>Business Tax Returns (Forms 1120, 1120S, 1065):</span> Whether you operate a C-Corp, S-Corp, or Partnership, we handle your federal and state tax filings with precision.</li>
                        <li><span>Deductions & Credits Optimization:</span> We work to identify all applicable deductions and credits to minimize your tax liability.</li>
                      </ul>
                      <p>We assist in preparing accurate financial statements using your bank statements, especially when traditional books of accounts are incomplete or unavailable. This ensures reliable reporting and helps meet tax and compliance requirements.</p>
                      <p className="mb-0">Whether you're filing for the first time or need help with back taxes or amended returns, we've got you covered.</p>
                    </div>
                    <div className="tab-pane fade" id="salesTaxPrep" role="tabpanel" aria-labelledby="salesTaxPrep-tab">
                      <p>Sales tax compliance is critical — and often complicated — for product and service-based businesses. We offer:</p>
                      <ul>
                        <li><span>Sales Tax Registration:</span> Assistance with registering for state sales tax IDs across multiple jurisdictions.</li>
                        <li><span>Filing Support:</span> Monthly, quarterly, or annual sales tax filing depending on your state requirements.</li>
                        <li><span>Record-Keeping Compliance:</span> We help you maintain accurate sales records to support your filings in the event of a sales tax audit.</li>
                        <li><span>Multi-State Nexus Guidance:</span> If your business sells in multiple states, we help determine where you have nexus and your responsibilities in each state.</li>
                      </ul>
                      <p className="mb-0">Stay compliant with evolving sales tax rules and avoid costly penalties.</p>
                    </div>
                    <div className="tab-pane fade" id="payrollSetup" role="tabpanel" aria-labelledby="payrollSetup-tab">
                      <p>Managing payroll can be time-consuming and risky if done incorrectly. We offer full-service payroll solutions, including:</p>
                      <ul>
                        <li><span>Initial Setup of Payroll Systems:</span> We help you set up your payroll system with the appropriate tax and employee classifications.</li>
                        <li><span>Payroll Processing:</span> Weekly, bi-weekly, or monthly payroll runs, including gross-to-net calculations and paycheck generation.</li>
                        <li><span>Tax Filings:</span> Timely preparation and filing of federal and state payroll forms including Form 941 (Quarterly), 940 (Annual FUTA), and state unemployment or withholding forms.</li>
                        <li><span>Compliance Management:</span> We ensure that your payroll complies with IRS and state laws, including minimum wage, overtime, and employee classification rules.</li>
                      </ul>
                      <p className="mb-0">Perfect for small and medium sized businesses that want to outsource payroll stress-free.</p>
                    </div>
                    <div className="tab-pane fade" id="businessRegistration" role="tabpanel" aria-labelledby="businessRegistration-tab">
                      <p>Starting a business the right way saves time and legal trouble down the line. We assist with:</p>
                      <ul>
                        <li><span>Entity Selection Guidance:</span> We help you choose between LLC, S-Corp, C-Corp, or Sole Proprietorship based on your goals and tax situation.</li>
                        <li><span>Business Name Search & Registration:</span> Ensuring your desired business name is available and registering it with the relevant authorities.</li>
                        <li><span>EIN (Employer Identification Number) Application:</span> Fast and accurate EIN registration with the IRS.</li>
                        <li><span>State-Level Registration & Licensing:</span> Registration with state departments for sales tax, employer tax, and local business licenses as needed.</li>
                      </ul>
                      <p className="mb-4">Let us guide you through every step of launching your business.</p>
                      <Link target="_blank" to="/businessRegService" className='btnPrimary'>Apply Now</Link>
                    </div>
                    <div className="tab-pane fade" id="bookKeeping" role="tabpanel" aria-labelledby="bookKeeping-tab">
                      <p>Accurate bookkeeping is the foundation of any successful business. Our services include:</p>
                      <ul>
                        <li><span>Recording Daily Transactions:</span> We log all income and expenses, categorize transactions, and maintain ledgers.</li>
                        <li><span>Bank & Credit Card Reconciliation:</span> Monthly reconciliation of your accounts to catch errors, fraud, or missed entries.</li>
                        <li><span>Accounts Payable/Receivable Tracking:</span> Track what you owe vendors and what customers owe you.</li>
                        <li><span>Financial Statements:</span> Timely generation of P&L statements, balance sheets, and cash flow reports based on your requirements.</li>
                        <li><span>Custom Reports:</span> Tailored reports based on your business goals (e.g., project profitability, department performance).</li>
                      </ul>
                      <p className="mb-0">Whether you're just starting out or already have a growing business, we ensure your books stay clean and tax-ready.</p>
                    </div>
                    <div className="tab-pane fade" id="fmca" role="tabpanel" aria-labelledby="fmca-tab">
                      <p>We offer end-to-end compliance support for trucking and logistics businesses regulated by the Federal Motor Carrier Safety Administration (FMCSA). Our services include:</p>
                      <ul>
                        <li><span>FMCSA & DOT Registration:</span> Assistance with obtaining or renewing your USDOT and MC numbers.</li>
                        <li><span>Appointment of Process Agent (BOC-3 Filing):</span> We help you appoint a legal agent in all states through proper BOC-3 filing, a mandatory requirement for interstate motor carriers.</li>
                        <li><span>Unified Carrier Registration (UCR):</span> Timely filing and renewal of UCR registration to ensure compliance and avoid penalties.</li>
                        <li><span>Driver Qualification File (DQF) Maintenance:</span> Creation and management of complete DQFs, including license verification, medical certificates, background checks, and safety performance history.</li>
                        <li><span>Hours of Service (HOS) Compliance:</span> Guidance on electronic logging devices (ELDs), log audits, and managing driver duty hours.</li>
                        <li><span>Audit Preparation:</span> Assistance in compiling and organizing required documents to prepare for FMCSA audits or roadside inspections.</li>
                      </ul>
                      <p className="mb-4">We help keep your operations compliant, efficient, and audit-ready — so you can stay on the road without interruptions.</p>
                      <Link target="_blank" to="/fmcsacompliance" className='btnPrimary'>Apply Now</Link>
                    </div>
                    <div className="tab-pane fade" id="8843Filling" role="tabpanel" aria-labelledby="8843Filling-tab">
                      <h3>Complete Tax Guide For Indian Students On F1 Visa.</h3>
                      <p>Indian students studying in the United States are required to comply with U.S. tax laws every year, even if they did not earn any income. Many students unknowingly miss required filings, which can lead to penalties, IRS notices, or complications during future visa or Green Card processing.</p>
                      <p>This guide explains who needs to file, what forms are required, important deadlines, and common mistakes to avoid.</p>
                      <table className="table table-bordered my-4 text-center">
                        <thead>
                          <tr>
                            <th></th>
                            <th>F1</th>
                            <th>F1 <br/>(On Campus PartTime| CPT | OPT)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Tax Form</th>
                            <td>Form 8843</td>
                            <td>1040 NR+Form 8843</td>
                          </tr>
                          <tr>
                            <th>Due Date</th>
                            <td>June 15th</td>
                            <td>April 15th</td>
                          </tr>
                          <tr>
                            <th>Tax Residential Status</th>
                            <td>Non-Resident</td>
                            <td>Non-Resident</td>
                          </tr>
                          <tr>
                            <th>Filling Criteria</th>
                            <td>Need to File Irrespective of the Income<br/>(Even with No Income)</td>
                            <td>Need to File When You have Income.</td>
                          </tr>
                        </tbody>
                      </table>
                      <h3>Mandatory Forms for Indian Students</h3>
                      <h4>Form 8843 (Required for All Students)</h4>
                      <p>Form 8843 must be filed by every F1 and J1 student, regardless of income.</p>
                      <ul>
                        <li>Confirms non-resident tax status</li>
                        <li>Required even with zero income</li>
                        <li>Failure to file may result in non-compliance records</li>
                      </ul>
                      <p>While many universities assist with Form 8843 filing, not all students receive this support.</p>
                      <p>If your Form 8843 has not been filed, we will prepare and assist with filing it at no cost, except for mailing expenses.</p>
                      <h4>Federal & State Tax Returns (If You Earned Income)1040NR+Form 8843</h4>
                      <p>You must file a federal (and possibly state) tax return if you earned income such as:</p>
                      <ul>
                        <li>On-campus employment income (W-2)</li>
                        <li>CPT or OPT salary</li>
                        <li>Internship stipends</li>
                        <li>Taxable scholarship or fellowship income</li>
                        <li>Bank interest</li>
                      </ul>
                      <h4>Common Income Sources for Indian Students</h4>
                      <p>Indian students commonly earn income through:</p>
                      <ul>
                        <li>On-campus jobs</li>
                        <li>CPT internships</li>
                        <li>OPT or STEM OPT employment</li>
                        <li>Scholarships and fellowships</li>
                        <li>U.S. bank interest</li>
                      </ul>
                      <p>Each income type has different tax treatment and must be reported correctly.</p>
                      <h4>Resident vs Non-Resident Tax Status</h4>
                      <p>Most Indian students are considered Non-Resident Aliens (NRA) for U.S. tax purposes during their first five calendar years in the U.S.</p>
                      <p>As a Non-Resident Alien:</p>
                      <ul>
                        <li>You cannot claim the standard deduction</li>
                        <li>You cannot file jointly</li>
                        <li>Different tax rates and rules apply</li>
                        <li>Special tax forms are required</li>
                      </ul>
                      <p>Filing under the wrong tax status is one of the most common and costly mistakes students make.</p>
                      <h4>Important Tax Deadlines</h4>
                      <ul>
                        <li><span>April 15:</span> Federal and state tax returns (if income was earned)</li>
                        <li><span>June 15:</span> Form 8843 only (if no income)</li>
                      </ul>
                      <p>Missing deadlines may result in penalties, interest, and future immigration complications.</p>
                      <h4>Common Tax Filing Mistakes to Avoid</h4>
                      <ul>
                        <li>Not filing Form 8843</li>
                        <li>Filing as a U.S. resident incorrectly</li>
                        <li>Using tax software not designed for non-residents</li>
                        <li>Missing state tax filings</li>
                        <li>Ignoring IRS or state tax notices</li>
                      </ul>
                      <p>Even small mistakes can lead to financial penalties or compliance issues.</p>
                      <h4>Why Professional Tax Help Matters</h4>
                      <p>Tax filing for Indian students requires knowledge of:</p>
                      <ul>
                        <li>Visa-based tax rules</li>
                        <li>Non-resident tax compliance</li>
                        <li>India-U.S. tax treaty benefits</li>
                        <li>Federal and state tax regulations</li>
                      </ul>
                      <p>Working with a professional ensures accuracy, compliance, and peace of mind.</p>
                      <h4>Why Choose Us?</h4>
                      <ul>
                        <li>Team of CPA (USA) & Chartered Accountant (India)</li>
                        <li>Over 10 years of experience in tax and accounting</li>
                        <li>Specialized in Indian and international student tax filings</li>
                        <li>Accurate, compliant, and transparent service</li>
                        <li>Year-round support beyond tax season</li>
                      </ul>
                      <h4>Book a Free Consultation</h4>
                      <p>If you are unsure about your filing requirements or need help with Form 8843, CPT, or OPT taxes, we are here to help.</p>
                      <p><b>Schedule a free 15-minute consultation today and file with confidence.</b></p>
                      <Link target="_blank" to="/formf1visa" className='btnPrimary'>Apply Now</Link>
                    </div>
                  </div>
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