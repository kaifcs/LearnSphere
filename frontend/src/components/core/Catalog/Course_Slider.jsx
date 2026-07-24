import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import Course_Card from "./Course_Card";

function Course_Slider({ Courses }) {
  const enableLoop = Courses?.length >= 4;

  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={enableLoop}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] px-2 pt-8"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={course._id || i}>
              <Course_Card
                course={course}
                Height={"h-[250px]"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col gap-6 sm:flex-row">
          <p className="skeleton h-[201px] w-full rounded-xl"></p>
          <p className="skeleton hidden h-[201px] w-full rounded-xl lg:flex"></p>
          <p className="skeleton hidden h-[201px] w-full rounded-xl lg:flex"></p>
        </div>
      )}
    </>
  );
}

export default Course_Slider;