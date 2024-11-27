import { sliderItems } from "../assets/data";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Slide() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <div
        className="absolute bottom-0 left-3 top-0 z-20 m-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#fff7f7] opacity-90"
        onClick={() => handleClick("left")}
      >
        <FaArrowLeft />
      </div>
      <div
        className="flex h-full transition-all duration-700 ease-in-out"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item, index) => (
          <div
            className="flex h-screen w-screen flex-col items-center md:flex-row"
            // style={{ backgroundColor: `#${item.bg}` }}
            key={index}
          >
            <div className="h-full flex-1">
              <img
                className="sm:h-[300px] sm:w-[400px] md:h-full md:w-full"
                src={item.img}
                alt=""
              />
            </div>
            <div className="mr-6 flex-1 p-12">
              <h1 className="hidden text-2xl font-bold md:block md:text-4xl">
                {item.title}
              </h1>
              <p className="my-12 hidden text-xl font-medium tracking-widest md:block">
                {item.desc}
              </p>
              <Link
                to="/products"
                className="cursor-pointer border border-black bg-transparent p-3 transition-all hover:bg-black hover:text-white"
              >
                VIEW COLLECTION
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div
        className="absolute bottom-0 right-3 top-0 z-20 m-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#fff7f7] opacity-70"
        onClick={() => handleClick("right")}
      >
        <FaArrowRight />
      </div>
    </div>
  );
}

export default Slide;
