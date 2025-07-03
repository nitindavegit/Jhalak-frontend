import React from 'react'

const TraitsSection = ({ result }) => {
    return (
        <div className="w-[80%] mx-auto my-[6rem] flex flex-col gap-16 items-center">
            {/* Core Traits */}
            <div className="w-full">
                <h2 className="bungee-regular text-[3rem] text-white mb-6">🧭 Core Traits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
                    {result && Array.isArray(result.core_traits) ? (
                        result.core_traits.map((trait, index) => (
                            <div
                                key={index}
                                className="bg-neutral-900 cursor-pointer p-6 rounded-2xl text-white hover:scale-105 transition-transform duration-300"
                            >
                                <h3 className="text-2xl font-bold text-amber-300 raleway">{trait}</h3>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No core traits available.</p>
                    )}
                </div>
            </div>

            {/* Motifs */}
            <div className="w-full">
                <h2 className="bungee-regular text-[3rem] text-white mb-6">🔱 Visual Motifs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
                    {result && result.visual_theme && Array.isArray(result.visual_theme.motifs) ? (
                        result.visual_theme.motifs.map((motif, index) => (
                            <div
                                key={index}
                                className="bg-neutral-900 p-6 rounded-2xl text-white hover:scale-105 transition-transform duration-300"
                            >
                                <h3 className="text-xl font-semibold text-amber-300 raleway mb-2">{motif}</h3>
                                <p className="text-gray-300">
                                    {motif.includes("Longship") && "Symbol of exploration and conquest."}
                                    {motif.includes("Runic") && "Ancient Norse wisdom and fate."}
                                    {motif.includes("Knotwork") && "Unity, eternity, and interconnectedness."}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No motifs available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TraitsSection