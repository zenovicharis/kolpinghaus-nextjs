import { FC } from "react";
import Image from "next/image";

interface Slide {
  path: string;
  title: string;
  description: string;
}

interface SliderProps {
  slides: Slide[];
}

const Slider: FC<SliderProps> = ({ slides }) => {
  return (
    <div className="slider-container">
      <div className="owl-carousel owl-theme home-slider">
        {slides.map((slide, index) => (
          <div className="slider-post slider-item-box-bkg" key={index}>
            <div
              className="slider-img"
              style={{ backgroundImage: `url(${slide.path})` }}
            ></div>
            <div className="slider-caption">
              <div className="slider-text">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <p>
                  <a href="reservation.html" className="view-more more-white">
                    Book a Table
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
