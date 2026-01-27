import { useState, useEffect, useCallback, memo } from "react";

const slides = [
  {
    link: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/6/9/f8f09845-e453-49f8-ac3f-445fde6b59791623250209264-DK_Flip-Flops.jpg",
    id: 1,
  },
  {
    link: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/6/9/f008298e-a446-4863-afdb-a1b75ab99aa81623250209248-DK_WFH.jpg",
    id: 2,
  },
  {
    link: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/6/8/b07ef9e8-b1b7-4b9d-9d15-e633d7ac70a91623162255312-DK-MAIN-BANNER.jpg",
    id: 3,
  },
  {
    link: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/6/9/182c7932-31f3-44a7-bcac-fe141fd412d21623250209232-DK_KidsWear.jpg",
    id: 4,
  },
  {
    link: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/6/9/64365564-c127-409f-b021-39287ef57d041623250209213-DK_OmniStyles.jpg",
    id: 5,
  },
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);
  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full  overflow-hidden">
      {/* Carousel container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <img
              src={slide.link}
              alt={`Slide ${slide.id}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white sm:p-2 rounded-full hover:bg-black/50 focus:outline-none cursor-pointer"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white sm:p-2 rounded-full hover:bg-black/50 focus:outline-none cursor-pointer"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(slide.id - 1)}
            className={`w-1 h-1 sm:w-3 sm:h-3 rounded-full ${
              slide.id - 1 === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${slide.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(Carousel);
