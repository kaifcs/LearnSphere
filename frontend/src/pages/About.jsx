import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"

import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import Img from "../components/common/Img"
import ReviewSlider from './../components/common/ReviewSlider';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { fadeIn } from "../utils/motionFrameVariants"

const viewport = { once: false, amount: 0.1 };

const About = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">

          <m.header
            className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]"
          >
            <m.p
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView="show"
              viewport={viewport}
            > Driving Innovation in Online Education for a
              <HighlightText text={"Brighter Future"} />
            </m.p>

            <m.p
              variants={fadeIn('up', 0.1)}
              initial='hidden'
              whileInView="show"
              viewport={viewport}
              className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              LearnSphere is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </m.p>
          </m.header>


          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className=" absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <Img src={BannerImage1} alt="" />
            <Img src={BannerImage2} alt="" />
            <Img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-400">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-400">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <m.div
              variants={fadeIn('right', 0.1)}
              initial='hidden'
              whileInView="show"
              viewport={viewport}
              className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                LearnSphere was created with a clear goal: to make high-quality tech education accessible, interactive, and career-focused. As engineers and lifelong learners, we saw the gap between traditional computer science degrees and the fast-paced skills required by modern tech companies.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                We built this platform to break down geographical barriers and provide learners with hands-on projects, up-to-date curriculums, and a supportive environment. LearnSphere is more than a course catalog; it's a launchpad for the next generation of developers.
              </p>
            </m.div>

            <m.div
             variants={fadeIn('left', 0.1)}
             initial='hidden'
             whileInView="show"
             viewport={viewport}
            >
              <Img
                src={FoundingStory}
                alt="FoundingStory"
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </m.div>
          </div>


          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                We envision a world where anyone with internet access can learn the skills needed to land their dream job in tech. Our team continuously iterates on our platform to ensure it remains intuitive, fast, and packed with the latest industry standards.
              </p>
            </div>

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission is to cultivate a collaborative community. Beyond video lectures, we prioritize interactive coding environments, peer networking, and real-time feedback. We believe the best learning happens when students build together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Reviws from Other Learner */}
      <div className=" my-20 px-5 text-white ">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* footer */}
      <Footer />
    </LazyMotion>
  )
}

export default About