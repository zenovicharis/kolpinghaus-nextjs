import styles from "../styles/Gallery.module.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Gallery({ children }) {
  return (
    <div className={styles.gall}>
      <Carousel
        showArrows={false}
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        autoPlay
      >
        {children}
      </Carousel>
    </div>
  );
}
