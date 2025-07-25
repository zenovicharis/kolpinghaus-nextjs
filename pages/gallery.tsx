import Layout from "../components/Layout";

const GalleryPage = () => {
  const images = Array.from({ length: 12 }, (_, i) => ({
    path: `/img/grid/pic${i + 1}.jpg`,
    title: `Galeriebild ${i + 1}`,
  }));

  return (
    <Layout>
      <section
        className="topSingleBkg topPageBkg"
        style={{
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="item-content-bkg">
          <div className="item-img"></div>
          <div className="inner-desc">
            <h1 className="post-title single-post-title">Galerie</h1>
            <span className="post-subtitle">
              Ein Einblick in unser Ambiente
            </span>
          </div>
        </div>
      </section>

      <section id="wrap-content" className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="gallery-3colgrid-content">
                <div className="menu-holder menu-3col-grid-image gallery-holder clearfix">
                  {images.map((image, index) => (
                    <div className="menu-post gallery-post" key={index}>
                      <a
                        href={image.path}
                        className="lightbox"
                        title={image.title}
                      >
                        <div className="item-content-bkg gallery-bkg">
                          <div
                            className="gallery-img"
                            style={{ backgroundImage: `url(${image.path})` }}
                          ></div>
                          <div className="menu-post-desc">
                            <h4>{image.title}</h4>
                            <div className="gallery-mglass">
                              <i className="fas fa-search"></i>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;
