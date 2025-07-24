import { FC, useState } from "react";
import Image from "next/image";

interface MenuItem {
  name: string;
  price: string;
  info: string;
  path?: string; // Optional path for image
}

interface MenuType {
  name:string;
  list: MenuItem[];
}

interface MenuCategory {
  name: string;
  types: MenuType[];
}

interface HomeMenuProps {
  food: MenuCategory[];
}

const HomeMenu: FC<HomeMenuProps> = ({ food }) => {
  const [openSection, setOpenSection] = useState(food[0]?.types[0]?.name);

  // Helper to create a unique ID from a string
  const toId = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  const toggleSection = (sectionName: string) => {
    if (openSection === sectionName) {
      setOpenSection("");
    } else {
      setOpenSection(sectionName);
    }
  };

  return (
    <section id="menu" className="menu-2col-content home-widget">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="alignc">
              <h2 className="home-subtitle">Entdecken Sie</h2>
              <h1 className="home-title margin-b24 title-headline">Unsere Speisekarte</h1>
              <p>
                Entdecken Sie die Vielfalt und den Geschmack unserer kroatischen und mediterranen Spezialitäten. Alle Zutaten sind frisch und sorgfältig von unseren Köchen ausgewählt. Genießen Sie ein außergewöhnliches kulinarisches Erlebnis.
              </p>
            </div>

            {/* FOOD MENU */}
            <ul className="our-menu">
              {food.map((category) =>
                category.types.map((type) => {
                  const sectionId = toId(type.name);
                  const isOpen = openSection === type.name;

                  return (
                    <li key={sectionId}>
                      <h4
                        className={`menu-title-section ${
                          isOpen ? "active" : ""
                        }`}
                        onClick={() => toggleSection(type.name)}
                      >
                        <a href={`#${sectionId}`}>{type.name}</a>
                      </h4>
                      <div
                        id={sectionId}
                        className="menu-section"
                        style={{ display: isOpen ? "block" : "none" }}
                      >
                        <div className="menu-holder menu-2col menu-accordion">
                          {type.list.map((item, itemIndex) => (
                            <div
                              className={`menu-post clearfix ${
                                itemIndex % 2 !== 0 ? "last" : ""
                              }`}
                              key={itemIndex}
                            >
                              {item.path && (
                                <div className="menu-post-img">
                                  <a
                                    href={item.path}
                                    className="lightbox"
                                    title={item.name}
                                  >
                                    <Image
                                      width={400}
                                      height={400}
                                      src={item.path}
                                      alt={item.name}
                                    />
                                  </a>
                                </div>
                              )}
                              <div className="menu-post-desc">
                                <h4>
                                  <span className="menu-title">
                                    {item.name}
                                  </span>{" "}
                                  <span className="menu-dots"></span>
                                  <span className="menu-price">
                                    €{item.price}
                                  </span>
                                </h4>
                                <div className="menu-text">{item.info}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
            {/* /FOOD MENU*/}
          </div>
          {/*col-md-12*/}
        </div>
        {/*row*/}
      </div>
      {/*container*/}
    </section>
  );
};

export default HomeMenu;
