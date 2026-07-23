import React from 'react'

import { FaAward, FaShieldAlt, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
import timelineImage from '../../../assets/Images/TimelineImage.png'

import Img from './../../common/Img';

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeIn } from '../../../utils/motionFrameVariants';



const timeline = [
    {
        Logo: FaAward,
        heading: "Leadership",
        Description: "Empowering learners to lead in their industries",
    },
    {
        Logo: FaShieldAlt,
        heading: "Responsibility",
        Description: "Your growth and success are our top priorities",
    },
    {
        Logo: FaGraduationCap,
        heading: "Flexibility",
        Description: "Learn at your own pace, anywhere, anytime",
    },

    {
        Logo: FaLightbulb,
        heading: "Innovation",
        Description: "Cutting-edge curriculum for modern challenges",
    },
];

const viewport = { once: false, amount: 0.1 };

const TimelineSection = () => {
    return (
        <LazyMotion features={domAnimation}>
            <div className='flex flex-col lg:flex-row gap-15 items-center'>
                <m.div
                    variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView="show"
                    viewport={viewport}
                    className='w-full lg:w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-6' key={index}>

                                    <div className='w-[50px] h-[50px] rounded-full bg-richblue-500 flex justify-center items-center'>
                                        <element.Logo className="text-white text-2xl" />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </m.div>

                <m.div
                    variants={fadeIn('left', 0.1)}
                    initial='hidden'
                    whileInView="show"
                    viewport={viewport}
                    className='relative shadow-blue-200'>

                    <Img src={timelineImage}
                        alt="timelineImage"
                        className='shadow-white object-cover h-fit scale-x-[-1] w-[550px] '
                    />

                    <div className=' absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-70%] rounded-3xl'>
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                            <p className='text-2xl lg:text-3xl font-bold'>1,000+</p>
                            <p className='text-caribbeangreen-300 text-xs lg:text-sm'>Active Learners</p>
                        </div>

                        <div className='flex gap-5 items-center px-7'>
                            <p className='text-2xl lg:text-3xl font-bold'>20+</p>
                            <p className='text-caribbeangreen-300 text-xs lg:text-sm'>Premium Courses</p>
                        </div>

                    </div>

                </m.div>
            </div>
        </LazyMotion>
    )
}

export default TimelineSection
