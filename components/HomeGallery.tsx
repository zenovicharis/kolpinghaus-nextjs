import { FC } from "react";
import Image from "next/image";

interface GalleryImage {
  path: string;
}

interface HomeGalleryProps {
  images: GalleryImage[];
}

const HomeGallery: FC<HomeGalleryProps> = ({ images }) => {
  const sections = [
    {
      title: "Bei Uns",
      subtitle: "Gallerie ansehen",
      image: images[0]?.path || "/img/grid/pic1.jpg",
      link: "#",
    },
    {
      title: "Unsere Speisekarte",
      subtitle: "Speisekarte ansehen",
      image: "/img/MenuBG.png",
      link: "#menu",
    },
    {
      title: "Jetzt Buchen",
      subtitle: "Reservieren Sie Ihren Tisch",
      image: "/img/banner.jpg",
      link: "#reservation",
    },
  ];

  return (
    <section id="home-content-1" className="home-widget">
      <div className="container">
        <div className="row">
          {sections.map((section, index) => (
            <div className="col-md-4" key={index}>
              <div className="home-featured-item">
                <div
                  className="home-featured-img"
                  style={{ backgroundImage: `url(${section.image})` }}
                ></div>
                <a href={section.link}>
                  <div className="grid-overlay"></div>
                  <div className="featured-item-content">
                    <h5>{section.title}</h5>
                    <div className="featured-short-desc">{section.subtitle}</div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
