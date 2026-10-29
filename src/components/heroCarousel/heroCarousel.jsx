import { useState, useEffect } from "react";
import Cta from "../cta/cta";
import SizesOrder from "../sizeOrder/sizeOrder";
import "./heroCarousel.css";

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 0, component: <Cta /> },
    { id: 1, component: <SizesOrder /> },
  ];

  function previousSlide() {
    setActiveSlide((current) => (current === 0 ? 1 : 0));
  }

  function nextSlide() {
    setActiveSlide((current) => (current === 0 ? 1 : 0));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-carousel">
      <div className="hero-carousel-slides">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`hero-carousel-slide ${
              activeSlide === slide.id ? "active" : ""
            }`}
            aria-hidden={activeSlide !== slide.id}
            inert={activeSlide !== slide.id}
          >
            {slide.component}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="hero-carousel-arrow hero-carousel-arrow-left"
        onClick={previousSlide}
        aria-label="Slide anterior"
      >
        ‹
      </button>

      <button
        type="button"
        className="hero-carousel-arrow hero-carousel-arrow-right"
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        ›
      </button>
    </div>
  );
}

export default HeroCarousel;