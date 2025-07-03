import React from 'react';
import Squares from './Squares';
import { ArrowBigRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TiltedCard from './TiltedCard';
import egyptian from '../assets/card-photos/Egyptian-1.png';
import yoroba from '../assets/card-photos/yoroba-1.png';
import harrapan from '../assets/card-photos/harapan-2.png';
import mayan from '../assets/card-photos/mayan-1.png';
import Viking from '../assets/card-photos/Viking-1.png';
import zen from '../assets/card-photos/zen-1.png';

const Welcome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth');
  };

  return (
    <div className='overflow-x-hidden'>
      {/* Hero Section */}
      <div className='h-[100vh] relative'>
        <div className='max-w-[100%] max-h-[100%]'>
          <Squares
            speed={0.5}
            squareSize={25}
            direction='diagonal'
            borderColor='#fff'
            hoverFillColor='#222'
          />

          <div className='absolute left-[15%] right-[15%]  top-1/4 flex flex-col gap-[2rem]'>
            <p className='bungee-regular  text-center text-[2.5rem] md:text-[4rem]'>
              Ancient Roots.<br /> Modern Personality.
            </p>
            <p className=' hidden lg:block w-[60%] self-center  text-center text-2xl bg-neutral-600 p-2 rounded-full text-white'>
              "Your behavior mirrors the legacies of ancient empires."
            </p>

            <button
              onClick={handleClick}
              className='hidden md:flex gap-2 w-[10rem] self-center cursor-pointer bg-[#f5f5dc]  text-black font-semibold raleway pl-3 py-3 pr-5 rounded-2xl hover:bg-amber-200 hover:scale-110 transition-all duration-500'
            >
              Get Started
              <ArrowBigRight />
            </button>
          </div>
        </div>
      </div>

      {/* Why Take This Quiz Section */}
      <div className="bg-neutral-950 text-white py-20 px-8 md:px-20">
        <h2 className="text-4xl font-bold bungee-regular mb-6 text-center">Why Take This Quiz?</h2>
        <p className="text-xl text-center text-neutral-400 max-w-3xl mx-auto mb-12">
          This isn't just a personality quiz — it's a cultural journey. Based on behavioral patterns and ancient archetypes, you'll uncover hidden traits that shape your worldview.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-700 hover:border-blue-500 transition">
            <h3 className="text-2xl font-semibold mb-2">🔍 Smart Questions</h3>
            <p className="text-neutral-400">Mix of sliders and choices — designed to reveal your deepest instincts.</p>
          </div>
          <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-700 hover:border-blue-500 transition">
            <h3 className="text-2xl font-semibold mb-2">🌍 Cultural Depth</h3>
            <p className="text-neutral-400">Inspired by ancient personas like Harappans, Vikings, and beyond.</p>
          </div>
          <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-700 hover:border-blue-500 transition">
            <h3 className="text-2xl font-semibold mb-2">📊 Visual Results</h3>
            <p className="text-neutral-400">Get a chart and personality card to understand your modern-ancient self.</p>
          </div>
        </div>
      </div>

      {/* Culture Cards Section */}
      <div className="characters bg-black w-[80%] mx-auto flex flex-col items-center mb-[4rem] mt-[6rem]">
        <h1 className='bungee-regular text-[2.5rem] md:text-[4.2rem]'>Cultural Echoes: <span className='text-4xl raleway'>Which Legacy Shapes You?</span></h1>
        <h2 className='raleway text-3xl text-white font-semibold mt-[1.5rem]'>Discover the ancient soul within.</h2>
        <p className='raleway hidden md:block text-neutral-600 text-center mx-[8rem] text-lg mt-3'>
          These timeless civilizations reflect the diverse strengths in each of us—boldness, harmony, intellect, creativity, and spiritual depth. Which culture mirrors your inner compass?
        </p>

        <div className="cards mt-[4rem] grid lg:grid-cols-2 xl:grid-cols-3 gap-[2rem]">
          {[{ img: egyptian, name: "Egyptian" }, { img: yoroba, name: "Yoroba" }, { img: harrapan, name: "Harrapan" },
            { img: mayan, name: "Mayan" }, { img: Viking, name: "Viking" }, { img: zen, name: "Zen" }]
            .map(({ img, name }) => (
              <TiltedCard
                key={name}
                imageSrc={img}
                altText={name.toLowerCase()}
                captionText={name}
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.07}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<p className="tilted-card-demo-text">{name}</p>}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
