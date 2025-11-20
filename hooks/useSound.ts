import { useRef } from "react";

// Ovoz fayllariga yo'llar (yoki URL)
const SOUNDS = {
  move: "../assets/audio/MOVE.mp3", // Plitka surilganda
  match:
    "../assets/audio/match.mp3", // Mos tushganda (Match)
  correct:
    "../assets/audio/CORRECT.mp3", // To'g'ri javob
  wrong:
    "../assets/audio/wrong.mp3", // Noto'g'ri javob
  win: "../assets/audio/win.mp3", // Level yutilganda
  click:
    "../assets/audio/click.mp3", // Oddiy tugma bosilishi
};

export const useSound = () => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  // Ovozni oldindan yuklash (Preload)
  if (Object.keys(audioRefs.current).length === 0) {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.volume = 0.4; // Ovoz balandligi (0.0 - 1.0)
      audioRefs.current[key] = audio;
    });
  }

  const play = (soundName: keyof typeof SOUNDS) => {
    const audio = audioRefs.current[soundName];
    if (audio) {
      audio.currentTime = 0; // Qayta boshidan o'ynatish
      audio.play().catch((e) => console.warn("Sound play failed:", e));
    }
  };

  return { play };
};
