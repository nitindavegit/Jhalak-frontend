import React from 'react'
import SpotlightCard from './SpotlightCard'

const FactsSection = ({ result }) => {
    const getRandomRGBA = () => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const a = (Math.random() * 0.5 + 0.2).toFixed(2) // alpha between 0.2 and 0.7
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    return (
        <div className='w-[80%] mx-auto flex flex-col items-center mt-[4rem] bg-black'>
            <h1 className='bungee-regular text-[4rem]'>Facts</h1>

            <div className='grid md:grid-cols-2 gap-[3rem] mt-[2rem]  cursor-pointer'>
                {result && Array.isArray(result.facts) ? (
                    result.facts.map((fact, index) => (
                        <SpotlightCard spotlightColor={getRandomRGBA()} key={index} className='w-[300px] h-[250px]'>
                            <p className='raleway text-lg leading-8'>{fact}</p>
                        </SpotlightCard>
                    ))
                ) : (
                    <p className='text-white'>No facts available.</p>
                )}
            </div>
        </div>
    )
}

export default FactsSection