import React from 'react'
import Instructor from '../../../assets/Images/teacher3.png'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from './../../common/Img';


import { LazyMotion, domAnimation, m } from 'framer-motion'
import { scaleUp } from '../../../utils/motionFrameVariants';


const viewport = { once: false, amount: 0.1 };

const InstructorSection = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>
          <m.div
            variants={scaleUp}
            initial='hidden'
            whileInView="show"
            viewport={viewport}
            className='lg:w-[50%] '>
          <Img
            src={Instructor}
            alt="Instructor"
            className='shadow-white rounded-3xl'
          />
          </m.div>

        <div className='lg:w-[50%] flex flex-col'>
          <div className='text-3xl lg:text-4xl font-semobold w-[50%] mb-2'>
            Share Your
            <HighlightText text={"Knowledge"} />
          </div>

          <p className='font-medium text-[16px] w-[80%] text-richblack-300 mb-12'>
            Join our global network of educators. We provide the tools and platform to teach what you love and impact learners worldwide.
          </p>

          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center'>
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </LazyMotion>
  )
}

export default InstructorSection
