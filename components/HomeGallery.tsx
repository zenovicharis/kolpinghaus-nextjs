import Link from "next/link";
import React from "react";
import { images as ImageSchema } from '../db/schema';

interface HomeGalleryProps {
  images: (typeof ImageSchema.$inferSelect)[];
}

const HomeGallery = ({ images }: HomeGalleryProps) => {
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
                {images.slice(0, 3).map((image, index) => (
                  <div className="menu-post gallery-post" key={index}>
                    <a
                      href={image.url}
                      className="lightbox"
                    >
                      <div className="item-content-bkg gallery-bkg">
                        <div
                          className="gallery-img"
                          style={{ backgroundImage: `url(${image.url})` }}
                        ></div>
                        <div className="menu-post-desc">
                          <h4>Galeriebild {index + 1}</h4>
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
