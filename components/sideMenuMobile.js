import { Link as ScrollLink } from "react-scroll";

export default function SideMenuMobile({ callback }) {
  return (
    <>
      <li>
        <ScrollLink
          activeClass="active-menu"
          to="main"
          spy={true}
          smooth={true}
          duration={500}
          onClick={callback}
        >
          Home
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          activeClass="active-menu"
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          onClick={callback}
        >
          Restaurant
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          activeClass="active-menu"
          to="menu"
          spy={true}
          smooth={true}
          duration={500}
          onClick={callback}
        >
          Menu
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          activeClass="active-menu"
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
          onClick={callback}
        >
          Kontakt
        </ScrollLink>
      </li>
    </>
  );
}
