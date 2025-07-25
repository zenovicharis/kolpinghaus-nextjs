import Link from "next/link";
import React from "react";

const HomeGallery = () => {
  const images = [
    { path: "/img/grid/pic1.jpg", title: "Galeriebild 1" },
    { path: "/img/grid/pic2.jpg", title: "Galeriebild 2" },
    { path: "/img/grid/pic3.jpg", title: "Galeriebild 3" },
  ];

  return (
    <section id="gallery" className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="headline">
              <h2>Gallerie</h2>
            </div>
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
            <div
              className="col-md-12 text-center"
              style={{ marginTop: "30px" }}
            >
              <p className="contact-btn">
                <Link href="/gallery" legacyBehavior>
                  <a id="submit">Mehr sehen</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
