import { FC, useState } from "react";
import Image from "next/image";

interface MenuItem {
  name: string;
  price: string;
  info: string;
  path?: string; // Optional path for image
}

interface MenuType {
  name: string;
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
  // Correct mapping based on the provided database structure.
  const menuGroupMapping: { [key: string]: string[] } = {
    Vorspeise: ["Vorspeise"],
    Hauptgericht: ["Hauptgericht"],
    Specialangebote: ["Spezialangebote"],
    Beilage: ["Beilage"],
    Getrankenkarte: ["Getrankenkarte"],
    Dessert: ["Dessert"],
  };

  // The desired order of the menu categories.
  const menuOrder = [
    "Vorspeise",
    "Hauptgericht",
    "Specialangebote",
    "Beilage",
    "Getrankenkarte",
    "Dessert",
  ];

  // Transform the raw food data into the desired menu structure.
  const transformedMenu: MenuCategory[] = menuOrder
    .map((newCategoryName) => {
      const dbCategoryNames = menuGroupMapping[newCategoryName];
      const types: MenuType[] = [];

      const matchingDbCategories = food.filter((dbCategory) =>
        dbCategoryNames.includes(dbCategory.name)
      );

      matchingDbCategories.forEach((dbCategory) => {
        types.push(...dbCategory.types);
      });

      if (types.length > 0) {
        return {
          name: newCategoryName,
          types,
        };
      }
      return null;
    })
    .filter((category): category is MenuCategory => category !== null);

  const [openSection, setOpenSection] = useState(transformedMenu[0]?.name);

  const toId = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  const toggleSection = (sectionName: string) => {
    setOpenSection(openSection === sectionName ? "" : sectionName);
  };

  return (
    <section id="menu" className="menu-2col-content home-widget">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="alignc">
              <h2 className="home-subtitle">Entdecken Sie</h2>
              <h1 className="home-title margin-b24 title-headline">
                Unsere Speisekarte
              </h1>
              <p>
                Entdecken Sie die Vielfalt und den Geschmack unserer kroatischen
                und mediterranen Spezialitäten. Alle Zutaten sind frisch und
                sorgfältig von unseren Köchen ausgewählt. Genießen Sie ein
                außergewöhnliches kulinarisches Erlebnis.
              </p>
            </div>

            {/* FOOD MENU */}
            <ul className="our-menu">
              {transformedMenu.map((category) => (
                <li key={category.name}>
                  <h4
                    className={`menu-title-section ${
                      openSection === category.name ? "active" : ""
                    }`}
                    onClick={() => toggleSection(category.name)}
                  >
                    <a href={`#${toId(category.name)}`}>{category.name}</a>
                  </h4>
                  <div
                    id={toId(category.name)}
                    className="menu-section"
                    style={{
                      maxHeight: openSection === category.name ? "2000px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.8s ease-in-out",
                    }}
                  >
                    {category.types.map((type) => (
                      <div
                        key={type.name}
                        className="menu-holder menu-2col menu-accordion"
                      >
                        <div className="menu-post-wrapper">
                          {type.name !== category.name && (
                            <h5 className="menu-type-name">{type.name}</h5>
                          )}
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
                    ))}
                  </div>
                </li>
              ))}
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
