import { FC } from "react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

interface GalleryImage {
  path: string;
}

interface HomeMainMenuProps {
  images: GalleryImage[];
}

const HomeMainMenu: FC<HomeMainMenuProps> = ({ images }) => {
  const sections = [
    {
      title: "Bei Uns",
      subtitle: "Gallerie ansehen",
      image: images[0]?.path || "/img/grid/pic1.jpg",
      link: "#gallery",
      isScrollLink: false,
    },
    {
      title: "Unsere Speisekarte",
      subtitle: "Speisekarte ansehen",
      image: "/img/MenuBG.png",
      link: "menu",
      isScrollLink: true,
    },
    {
      title: "Jetzt Buchen",
      subtitle: "Reservieren Sie Ihren Tisch",
      image: "/img/banner.jpg",
      link: "/reservation",
      isScrollLink: false,
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
                {section.isScrollLink ? (
                  <ScrollLink
                    to={section.link}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="grid-overlay"></div>
                    <div className="featured-item-content">
                      <h5>{section.title}</h5>
                      <div className="featured-short-desc">
                        {section.subtitle}
                      </div>
                    </div>
                  </ScrollLink>
                ) : (
                  <a href={section.link}>
                    <div className="grid-overlay"></div>
                    <div className="featured-item-content">
                      <h5>{section.title}</h5>
                      <div className="featured-short-desc">
                        {section.subtitle}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeMainMenu;