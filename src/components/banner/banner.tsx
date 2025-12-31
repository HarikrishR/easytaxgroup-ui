import "./banner.css";

interface BannerProps {
  title: string;
  description?: string;
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
  return (
    <>
      {/* <section className="banner d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 bannerContent">
              <h1 className="banner-title">{title}</h1>
              <p className="banner-subtitle m-0"><span className="fromTitle">Home</span> <span className="title"> {title}</span></p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="banner">
        <div className="container">
          <div className="row min-vh-75 align-items-center">
            <div className="col-lg-7">
              <div className="glass-card animate-fade-in">
                <h1>{title}</h1>
                <p className="lead-text mt-3 mb-0">{description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-shape"></div>
      </section>
    </>
  );
};

export default Banner;