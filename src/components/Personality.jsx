import React, { useEffect, useState } from 'react'
import Character from './Character'
import FactsSection from './FactsSection'
import TraitsSection from './TraitsSection'
import { ArrowBigLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Personality = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cachedResults = localStorage.getItem('quizResults');
    if (cachedResults) {
      setProfile(JSON.parse(cachedResults));
    }
  }, []);

  if (!profile) return <div className='p-4 text-center'>No personality result found.</div>;

  return (
    <div className='w-[100%]'>
      {/* Character, Cultural Match, and Confidence (overlay style) */}
      <Character result={profile} />

      {/* 3. Facts */}
      <FactsSection result={{ facts: profile.facts }} />

      {/* 4. Key Traits */}
      {profile.key_traits && (
        <div className="w-[80%] mx-auto flex flex-col items-center mt-[2rem]">
          <h2 className="bungee-regular text-[2rem] text-amber-100 mb-4">Key Traits</h2>
          <ul className="flex flex-wrap gap-4 justify-center">
            {profile.key_traits.map((trait, idx) => (
              <li key={idx} className="bg-neutral-800 text-amber-100 px-4 py-2 rounded-2xl text-lg font-semibold raleway shadow">
                {trait}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Core Traits and 6. Visual Motifs */}
      <TraitsSection result={{ core_traits: profile.core_traits, visual_theme: { motifs: profile.motifs } }} />

      {/* 7. Reasoning */}
      {profile.reasoning && (
        <div className="w-[80%] mx-auto mt-10 mb-6 p-6 bg-neutral-900 rounded-2xl shadow">
          <h2 className="bungee-regular text-[2rem] text-amber-100 mb-2">Reasoning</h2>
          <p className="raleway text-lg text-amber-100">{profile.reasoning}</p>
        </div>
      )}

      {/* 8. Advice */}
      {profile.advice && (
        <div className="w-[80%] mx-auto mb-10 p-6 bg-neutral-800 rounded-2xl shadow">
          <h2 className="bungee-regular text-[2rem] text-amber-200 mb-2">Advice</h2>
          <p className="raleway text-lg text-amber-100">{profile.advice}</p>
        </div>
      )}

      <div className='flex justify-center mb-[4rem]'>
        <button
          className='flex gap-2 cursor-pointer bg-[#f5f5dc] text-black font-semibold raleway pl-3 py-3 pr-5 rounded-2xl hover:bg-amber-200 hover:scale-110 transition-all duration-500'
          onClick={() => navigate('/')}
        >
          Back To Home
          <ArrowBigLeft />
        </button>
      </div>
    </div>
  )
}

export default Personality
