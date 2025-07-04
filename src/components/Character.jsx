import { CULTURE_PROFILES } from '../../constant/characters'
import { div, ul } from 'framer-motion/client'
import harapan from '../assets/card-photos/harapan-2.png'
import { useGSAP } from '@gsap/react'
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'


import gsap, { SplitText } from 'gsap/all'
import SpotlightCard from './SpotlightCard'
import { ArrowBigLeft } from 'lucide-react'
const Character = ({result}) => {

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);


    useGSAP(() => {
        if (!result) return;
        document.fonts.ready.then(() => {
            const titleSplit = new SplitText('.cultural-match', { type: 'chars, words' });
            const resultSplit = new SplitText('.cultural-match-result', { type: 'chars, words' });

            if (titleSplit.chars.length) {
                gsap.from(titleSplit.chars, {
                    opacity: 0,
                    yPercent: 100,
                    duration: 1.8,
                    ease: 'expo.out',
                    stagger: 0.05
                });
            }

            if (resultSplit.chars.length) {
                gsap.from(resultSplit.chars, {
                    opacity: 0,
                    yPercent: 100,
                    duration: 1.8,
                    ease: 'expo.out',
                    stagger: 0.06,
                    delay: 1
                });
            }

            if (document.querySelector('.avatar')) {
                gsap.from('.avatar', {
                    opacity: 0,
                    xPercent: 100,
                    duration: 1.8,
                    ease: 'expo.out',
                    stagger: 0.06,
                    delay: 1
                });
            }

            if (document.querySelector('.key-traits')) {
                gsap.from('.key-traits', {
                    opacity: 0,
                    xPercent: -100,
                    duration: 1.8,
                    ease: 'expo.out',
                    stagger: 0.06,
                    delay: 2
                });
            }
        });
    }, [result]);

    const getRandomRGBA = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = (Math.random() * 0.5 + 0.2).toFixed(2); // alpha between 0.2 and 0.7
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      };

      const getBackgroundFile = (culture) => {
        switch (culture) {
          case 'Harappan (Indus Valley)':
            return 'Harappan_BG.jpg';
          case 'Norse/Viking':
            return 'Viking_BG.jpg';
          case 'Greek (Ancient Greece)':
            return 'Greece_BG.png';
          case 'Yoruba':
            return 'Yoroba_BG.jpg';
          case 'Mayan':
            return 'Mayan_BG.jpg';
          case 'Japanese (Zen)':
            return 'Japanese_BG.jpg';
          case 'Renaissance Italian':
            return 'renaissance_BG.jpg';
          case 'Egyptian (Ancient Egypt)':
            return 'Egyptian_BG.jpg';
          default:
            return 'bg.jpg'; // fallback background
        }
      }
      

      const getAvatarFile = (culture) => {
        switch (culture) {
          case 'Harappan (Indus Valley)': return '/avatars/harapan-2.png';
          case 'Norse/Viking': return '/avatars/viking.png';
          case 'Greek (Ancient Greece)': return '/avatars/Greek.png';
          case 'Yoruba': return '/avatars/yoroba-1.png';
          case 'Mayan': return '/avatars/mayan-1.png';
          case 'Japanese (Zen)': return '/avatars/zen-1.png';
          case 'Renaissance Italian': return '/avatars/italian-1.png';
          case 'Egyptian (Ancient Egypt)': return '/avatars/Egyptian-1.png';
          default: return '/avatars/default.png'; // fallback
        }
      };
      
      
    
  return (
    
    <div>
        <div className='relative overflow-hidden h-[100vh]'>
    <div className={`w-[100vw] bg-no-repeat bg-cover h-[100vh] z-0 absolute top-0 rounded-lg`}
    style={{
        backgroundImage: `url(/${getBackgroundFile(result.cultural_match)})`
      }}
    >

    </div>

    <div className='relative ' >
        
        <div className='w-full' >
            <div className='w-[80%] text-neutral-950  flex   ml-[4rem] mt-[2rem] flex-col'>
            <h1 className=' cultural-match raleway   text-[2.5rem]'>Cultural Match:<br/> </h1>
            
            <p className='bungee-regular cultural-match-result text-[3rem] lg:text-[5rem]'>{result.cultural_match}</p>
            </div>
            
        </div>

        <div className='avatar absolute top-[18rem] left-1/2 transform -translate-x-1/2 md:top-[20rem] md:left-[60%] md:scale-150 lg:top-[25rem] lg:left-[50rem] lg:scale-200 transition-all duration-500'>
        <img
          src={getAvatarFile(result.cultural_match)}
          alt={result.cultural_match}
          style={{
            maxHeight: '20rem',
            maxWidth: '80vw',
            height: 'auto',
            width: 'auto',
            imageRendering: 'auto',
          }}
          className="rounded-xl shadow-lg"
        />
        </div>

        <div className="key-traits lg:mt-[13rem] mt-[2rem]  lg:ml-[5%] ml-[25%] bg-amber-100/40 min-w-[45%] max-w-[47%]  text-neutral-800 px-[1rem] py-[3rem] items-center flex flex-col rounded-3xl hover:bg-amber-100/80 transition-colors duration-300 cursor-pointer ">
            <h2 className="bungee-regular text-[2rem]  mb-2">Core Traits:</h2>
            <ul className="  grid lg:grid-cols-3 gap-[1.5rem]">
                {(result.core_traits || []).map((trait, index) => (
                <li key={index} className="text-lg whitespace-nowrap text-amber-100 bg-neutral-800 rounded-2xl px-[1rem]   py-2 raleway">{trait}</li>
                ))}
            </ul>
        </div>


        
    </div>

        </div>

        

        


        
    </div>
  )
}

export default Character