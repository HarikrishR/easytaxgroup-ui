import Footer from "../footer/footer";
import Header from "../header/header";
import Banner from "../banner/banner";
import "./services.css"

const Services = () => {
    return (
      <>
      <Header />
      <Banner title="Services" />
            <section className="service">
                <div className="container-lg">
                    <div className="row justify-content-center">
                        <div className="col-12">
                        <div className="row">
                          <div className="col-sm-4 mb-4 mb-sm-0">
                            <div className="nav align-items-start nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                              <button className="nav-link active" id="taxPrep-tab" data-bs-toggle="pill" data-bs-target="#taxPrep" type="button" role="tab" aria-controls="taxPrep" aria-selected="true">Tax Preparation & Filing</button>
                              <button className="nav-link" id="salesTaxPrep-tab" data-bs-toggle="pill" data-bs-target="#salesTaxPrep" type="button" role="tab" aria-controls="salesTaxPrep" aria-selected="false">Sales Tax Registration & Filing</button>
                              <button className="nav-link" id="payrollSetup-tab" data-bs-toggle="pill" data-bs-target="#payrollSetup" type="button" role="tab" aria-controls="payrollSetup" aria-selected="false">Payroll Setup & Compliance</button>
                              <button className="nav-link" id="businessRegistration-tab" data-bs-toggle="pill" data-bs-target="#businessRegistration" type="button" role="tab" aria-controls="businessRegistration" aria-selected="false">Business Registration Services</button>
                              <button className="nav-link" id="bookKeeping-tab" data-bs-toggle="pill" data-bs-target="#bookKeeping" type="button" role="tab" aria-controls="bookKeeping" aria-selected="false">Bookkeeping Services</button>
                              <button className="nav-link" id="fmca-tab" data-bs-toggle="pill" data-bs-target="#fmca" type="button" role="tab" aria-controls="fmca" aria-selected="false">FMCSA Compliance</button>
                              <button className="nav-link" id="8843Filling-tab" data-bs-toggle="pill" data-bs-target="#8843Filling" type="button" role="tab" aria-controls="8843Filling" aria-selected="false">Form 8843 Filing for Non-Residents</button>
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
                                <p className="mb-0">Let us guide you through every step of launching your business.</p>
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
                                <p className="mb-0">We help keep your operations compliant, efficient, and audit-ready — so you can stay on the road without interruptions.</p>
                              </div>
                              <div className="tab-pane fade" id="8843Filling" role="tabpanel" aria-labelledby="8843Filling-tab">
                                <p>If you're a non-resident alien in the U.S. on an F, J, M, or Q visa, you're required to file Form 8843 — even if you have no U.S. income. We help you:</p>
                                <ul>
                                  <li><span>Determine Filing Requirements:</span> Based on your visa type, number of days in the U.S., and income.</li>
                                  <li><span>Accurately Complete Form 8843:</span> Including details like school/employer information, duration of stay, and visa classification.</li>
                                  <li><span>Avoid IRS Issues:</span> Ensure you're in full compliance and avoid any future visa or tax problems.</li>
                                </ul>
                                <p className="mb-0">This service is especially useful for international students, researchers, exchange visitors, and scholars.</p>
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