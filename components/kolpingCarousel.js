import clsx from "clsx";
import { Carousel } from "react-responsive-carousel";
import styles from "../styles/KolpingCarousel.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function KolpingCarousel({ slides }) {
  return (
    <div className={styles.caroselContainer}>
      {slides && (
        <Carousel
          autoPlay
          renderArrowNext={(onClickHandler) => (
            <div className={styles.controlls} onClick={onClickHandler}></div>
          )}
          renderArrowPrev={(onClickHandler) => (
            <div
              className={clsx([styles.controlls, styles.right])}
              onClick={onClickHandler}
            ></div>
          )}
          infiniteLoop
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
        >
          {slides.map((a, i) => {
            return (
              <div key={i}>
                <img src={a.path} alt="Slider Promo Image" />
                <div className={styles.legend}>
                  <div className={styles.title}>
                    <h1>{a.title}</h1>
                  </div>
                  <p className={styles.about}>{a.subtitle}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}
