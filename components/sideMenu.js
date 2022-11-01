import styles from "../styles/Sidemenu.module.scss";
import { Link as ScrollLink } from "react-scroll";

export default function SideMenu() {
  return (
    <div className={styles.sideMenu}>
      <div className={styles.menuBlock}>
        <ScrollLink
          activeClass="active-menu"
          to="main"
          spy={true}
          smooth={true}
          duration={500}
        >
          <h5>Home</h5>
        </ScrollLink>
      </div>
      <div className={styles.menuBlock}>
        <ScrollLink
          activeClass="active-menu"
          to="about"
          spy={true}
          smooth={true}
          duration={500}
        >
          <h5>Restourant</h5>
        </ScrollLink>
      </div>
      <div className={styles.menuBlock}>
        <ScrollLink
          activeClass="active-menu"
          to="menu"
          spy={true}
          smooth={true}
          duration={500}
        >
          <h5>Menu</h5>
        </ScrollLink>
      </div>
      <div className={styles.menuBlock}>
        <ScrollLink
          activeClass="active-menu"
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
        >
          <h5>Kontakt</h5>
        </ScrollLink>
      </div>
    </div>
  );
}
