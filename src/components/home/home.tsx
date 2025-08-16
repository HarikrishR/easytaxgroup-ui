import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import arrow from '../../assets/images/arrows.png';
import arrowDark from '../../assets/images/arrowsDark.png';
import hmAbout from '../../assets/images/hmAbout.png';
import whatwedo from '../../assets/images/whatwedo.jpg';
import "./home.css"

const Home = () => {
  return (
    <>
      <Header />
      <section className="homeBanner d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h1 className="banner-title mb-4">Simplifying Tax, Bookkeeping & Compliance <br className="d-none d-md-block" /> So You Can Focus on Growth</h1>
              <Link to="/aboutUs" className='btnUnderline mt-5 mt-lg-0 d-inline-block'>Get In Touch <img src={arrow} className='About Us' /></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="hmAbout">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
            <h4 className="mb-3">About Us</h4>
            <h2>Simplify your financial management</h2>
              <p className="mb-4">At Easy Tax Group, we provide comprehensive tax services, accurate bookkeeping, and full compliance support tailored to individuals and businesses. Our goal is to simplify your financial management, ensure regulatory peace of mind, and help you stay focused on growth. With a team of experienced advisors, we are committed to delivering reliable, personalized solutions that protect your assets and drive long-term financial success.</p>
              <Link to="/aboutUs" className='btnUnderline dark mt-4 mt-lg-0 d-inline-block'>Get In Touch <img src={arrowDark} className='About Us' /></Link>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src={hmAbout} className='About Us w-75' />
            </div>
          </div>
        </div>
      </section>
      <section className="stats">
        <div className="container text-center">
          <div className="row justify-content-between">
            <div className="col-sm-3">
              <div className="single-counter">
                <h2>10k</h2>
                <span className="title">Project complete</span>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="single-counter">
                <h2>6k</h2>
                <span className="title">Satisfied clients</span>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="single-counter">
                <h2>99+</h2>
                <span className="title">Positive feedback</span>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="single-counter last">
                <h2>20+</h2>
                <span className="title">Winning awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="whatwedo">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7 mb-4 mb-md-0">
              <h4 className="mb-3">What We Do</h4>
              <h2>The real experts in the field will provide</h2>
              <p className="mb-4">High standards, responsiveness, and qualified services are the three underlying principles of work.</p>
              <div className="row">
                <div className="col-md-6">
                  <ul>
                    <li>Financial Consultation</li>
                    <li>Tax Planning & Compliance</li>
                    <li>Investment Management</li>
                    <li className="mb-md-0">Wealth Management Solutions</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul>
                    <li>Business Accounting</li>
                    <li>Cash Flow Management</li>
                    <li>Financial Reporting</li>
                    <li className="mb-0">Risk Management Strategies</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="text-center">
                <img src={whatwedo} alt="What We Do" className="w-75" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonial">
        <div className="container overflow-hidden">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <h2 className="mb-4">What our clients say</h2>
              <p className="mb-5">We are proud to have received positive feedback from our clients, reflecting our commitment to excellence and client satisfaction.</p>
              <div className="slider">
                <input type="radio" name="testimonial" id="t-1" />
                <input type="radio" name="testimonial" id="t-2" />
                <input type="radio" name="testimonial" id="t-3" defaultChecked />
                <input type="radio" name="testimonial" id="t-4" />
                <input type="radio" name="testimonial" id="t-5" />
                <div className="testimonials mb-8">
                  <label className="item" htmlFor="t-1">
                    <div className="mycard">
                      <p className="cardtitle">Práctica</p>
                      <div>
                        <img src="https://i.pravatar.cc/200" alt="nivel5" className="cardimg" />
                      </div>
                      <div>
                        <p className="carddescription">Poner en práctica los conocimientos adquiridos.</p>
                      </div>
                    </div>
                  </label>
                  <label className="item" htmlFor="t-2">
                    <div className="mycard">
                      <p className="cardtitle">Práctica</p>
                      <div>
                        <img src="https://i.pravatar.cc/200" alt="nivel5" className="cardimg" />
                      </div>
                      <div>
                        <p className="carddescription">Poner en práctica los conocimientos adquiridos.</p>
                      </div>
                    </div>
                  </label>
                  <label className="item" htmlFor="t-3">
                    <div className="mycard">
                      <p className="cardtitle">Práctica</p>
                      <div>
                        <img src="https://i.pravatar.cc/200" alt="nivel5" className="cardimg" />
                      </div>
                      <div>
                        <p className="carddescription">Poner en práctica los conocimientos adquiridos.</p>
                      </div>
                    </div>
                  </label>
                  <label className="item" htmlFor="t-4">
                    <div className="mycard">
                      <p className="cardtitle">Práctica</p>
                      <div>
                        <img src="https://i.pravatar.cc/200" alt="nivel5" className="cardimg" />
                      </div>
                      <div>
                        <p className="carddescription">Poner en práctica los conocimientos adquiridos.</p>
                      </div>
                    </div>
                  </label>
                  <label className="item" htmlFor="t-5">
                    <div className="mycard">
                      <p className="cardtitle">Práctica</p>
                      <div>
                        <img src="https://i.pravatar.cc/200" alt="nivel5" className="cardimg" />
                      </div>
                      <div>
                        <p className="carddescription">Poner en práctica los conocimientos adquiridos.</p>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="dots">
                  <label htmlFor="t-1"></label>
                  <label htmlFor="t-2"></label>
                  <label htmlFor="t-3"></label>
                  <label htmlFor="t-4"></label>
                  <label htmlFor="t-5"></label>
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
export default Home;