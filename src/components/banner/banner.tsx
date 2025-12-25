import "./banner.css";

interface BannerProps {
  title: string;
}

const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <>
      <section className="banner d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 bannerContent">
              <h1 className="banner-title">{title}</h1>
              <p className="banner-subtitle m-0"><span className="fromTitle">Home</span> <span className="title"> {title}</span></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;