import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Men's Collection",
    desc: "Stylish and modern outfits for every occasion.",
    img: "https://images.unsplash.com/photo-1557684387-08927d28c72a?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "men",
  },
  {
    title: "Women's Collection",
    desc: "Elegant, chic, and comfortable fashion pieces.",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "women",
  },
  {
    title: "Kids' Collection",
    desc: "Fun and colorful fashion for the little ones.",
    img: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "kids",
  },
];

function Slide() {
  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex h-full w-full items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Black shadow overlay */}
              <div className="absolute inset-0 bg-black opacity-50"></div>

              {/* Text and Button */}
              <div className="relative z-10 text-center text-white">
                <h2 className="text-4xl font-bold md:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-4 text-lg md:text-2xl">{slide.desc}</p>
                <Link
                  to={`/products?category=${slide.category}`}
                  className="mt-8 inline-block rounded-full border border-white px-6 py-3 text-lg transition hover:bg-white hover:text-black"
                >
                  Collections
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for bullets and navigation */}
      <style>
        {`
          /* White pagination dots */
          .swiper-pagination-bullet {
            background: white;
            opacity: 0.7;
          }
          .swiper-pagination-bullet-active {
            background: white;
            opacity: 1;
          }

          /* Navigation arrows */
          .swiper-button-next, .swiper-button-prev {
            color: white;
            // background: rgba(0, 0, 0, 0.4);
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
          }

          // .swiper-button-next:hover, .swiper-button-prev:hover {
          //   background: rgba(0, 0, 0, 0.7);
          // }

          /* Hide navigation buttons on mobile (width < 768px) */
          @media (max-width: 768px) {
            .swiper-button-next, .swiper-button-prev {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Slide;
