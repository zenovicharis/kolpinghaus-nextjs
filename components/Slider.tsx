import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

interface Slide {
	url: string;
	title: string;
	subtitle?: string | null;
}

interface SliderProps {
	slides: Slide[];
}

const Slider: FC<SliderProps> = ({ slides }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      loop
      spaceBetween={0}
      slidesPerView={1}
      style={{ height: "100vh" }}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="slider-img"
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="slider-caption">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <a href="reservation" className="view-more more-white">
								Tisch reservieren
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
