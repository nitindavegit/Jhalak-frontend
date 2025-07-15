import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap, { SplitText } from 'gsap/all';

const getAvatarFile = (culture = "") => {
  const normalized = culture.trim().toLowerCase();
  if (normalized.includes("harappan")) return "/avatars/harapan-2.png";
  if (normalized.includes("norse") || normalized.includes("viking")) return "/avatars/viking.png";
  if (normalized.includes("greek")) return "/avatars/greek.png";
  if (normalized.includes("yoruba")) return "/avatars/yoroba-1.png";
  if (normalized.includes("mayan")) return "/avatars/mayan-1.png";
  if (normalized.includes("japanese") || normalized.includes("zen")) return "/avatars/zen-1.png";
  if (normalized.includes("renaissance") || normalized.includes("italian")) return "/avatars/italian-1.png";
  if (normalized.includes("egyptian")) return "/avatars/egyptian-1.png";
  return "/avatars/default.png";
};

const getBackgroundFile = (culture = "") => {
  const normalized = culture.trim().toLowerCase();
  if (normalized.includes("harappan")) return "Harappan_BG.jpg";
  if (normalized.includes("norse") || normalized.includes("viking")) return "Viking_BG.jpg";
  if (normalized.includes("greek")) return "Greece_BG.png";
  if (normalized.includes("yoruba")) return "Yoroba_BG.jpg";
  if (normalized.includes("mayan")) return "Mayan_BG.jpg";
  if (normalized.includes("japanese") || normalized.includes("zen")) return "Japanese_BG.jpg";
  if (normalized.includes("renaissance") || normalized.includes("italian")) return "renaissance_BG.jpg";
  if (normalized.includes("egyptian")) return "Egyptian_BG.jpg";
  return "bg.jpg";
};

const Character = ({ result }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (!result) return;
    document.fonts.ready.then(() => {
      const titleSplit = new SplitText('.cultural-match', { type: 'chars, words' });
      const resultSplit = new SplitText('.cultural-match-result', { type: 'chars, words' });

      if (titleSplit.chars.length) {
        gsap.from(titleSplit.chars, { opacity: 0, yPercent: 100, duration: 1.8, ease: 'expo.out', stagger: 0.05 });
      }
      if (resultSplit.chars.length) {
        gsap.from(resultSplit.chars, { opacity: 0, yPercent: 100, duration: 1.8, ease: 'expo.out', stagger: 0.06, delay: 1 });
      }
      if (document.querySelector('.avatar')) {
        gsap.from('.avatar', { opacity: 0, xPercent: 100, duration: 1.8, ease: 'expo.out', stagger: 0.06, delay: 1 });
      }
      if (document.querySelector('.key-traits')) {
        gsap.from('.key-traits', { opacity: 0, xPercent: -100, duration: 1.8, ease: 'expo.out', stagger: 0.06, delay: 2 });
      }
    });
  }, [result]);

  const avatarSrc = getAvatarFile(result.cultural_match);
  console.log("Resolved avatar for:", result.cultural_match, "->", avatarSrc);

  return (
    <div>
      <div className="relative overflow-hidden h-[100vh]">
        <div
          className="w-[100vw] bg-no-repeat bg-cover h-[100vh] z-0 absolute top-0 rounded-lg"
          style={{ backgroundImage: `url(/${getBackgroundFile(result.cultural_match)})` }}
        ></div>
        <div className="relative">
          <div className="w-full">
            <div className="w-[80%] text-neutral-950 flex ml-[4rem] mt-[2rem] flex-col">
              <h1 className="cultural-match raleway text-[2.5rem]">Cultural Match:<br /></h1>
              <p className="bungee-regular cultural-match-result text-[3rem] lg:text-[5rem]">{result.cultural_match}</p>
            </div>
          </div>
          <div className="avatar absolute top-[8rem] left-1/2 transform -translate-x-1/2 sm:top-[10rem] md:top-[14rem] md:scale-110 lg:top-[18rem] lg:scale-125 xl:top-[22rem] xl:scale-150 transition-all duration-500 z-10">
            <img
              src={avatarSrc}
              alt={result.cultural_match}
              onError={e => { e.target.src = '/avatars/default.png'; }}
              style={{
                maxHeight: '16rem',
                minHeight: '6rem',
                maxWidth: '80vw',
                height: 'auto',
                width: 'auto',
                imageRendering: 'auto',
              }}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="key-traits lg:mt-[13rem] mt-[2rem] lg:ml-[5%] ml-[25%] bg-amber-100/40 min-w-[45%] max-w-[47%] text-neutral-800 px-[1rem] py-[3rem] items-center flex flex-col rounded-3xl hover:bg-amber-100/80 transition-colors duration-300 cursor-pointer">
            <h2 className="bungee-regular text-[2rem] mb-2">Core Traits:</h2>
            <ul className="grid lg:grid-cols-3 gap-[1.5rem]">
              {(result.core_traits || []).map((trait, index) => (
                <li key={index} className="text-lg whitespace-nowrap text-amber-100 bg-neutral-800 rounded-2xl px-[1rem] py-2 raleway">{trait}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
