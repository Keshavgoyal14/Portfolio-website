import React, { useEffect, useState } from 'react';
import './journey.css';

const stops = [
  { label: 'Profile', target: 'top' },
  { label: 'Work', target: 'experience' },
  { label: 'Builds', target: 'projects' },
  { label: 'Toolkit', target: 'skills' },
  { label: 'Connect', target: 'contact' },
];

export default function JourneyGuide() {
  const [progress, setProgress] = useState(0);
  const [activeStop, setActiveStop] = useState(0);

  useEffect(() => {
    const updateJourney = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(Math.max(0, Math.min(1, nextProgress)));
      setActiveStop(Math.min(stops.length - 1, Math.round(nextProgress * (stops.length - 1))));
    };
    updateJourney();
    window.addEventListener('scroll', updateJourney, { passive: true });
    window.addEventListener('resize', updateJourney);
    return () => {
      window.removeEventListener('scroll', updateJourney);
      window.removeEventListener('resize', updateJourney);
    };
  }, []);

  return <aside className="journey-guide" aria-label="Portfolio journey">
    <div className="journey-track"><span className="journey-progress" style={{ height: `${progress * 100}%` }} /></div>
    <div className="journey-stops">{stops.map((stop, index) => <a className={index <= activeStop ? 'journey-stop reached' : 'journey-stop'} href={`#${stop.target}`} key={stop.target} aria-label={`Go to ${stop.label}`}><i /><span>{stop.label}</span></a>)}</div>
    <div className="journey-character" style={{ top: `calc(${progress * 100}% - ${progress * 70}px)` }} aria-hidden="true">
      <div className="character-shadow" /><div className="character"><div className="character-backpack" /><div className="character-head"><b /><b /><em /></div><div className="character-body"><span>↗</span></div><div className="character-leg left" /><div className="character-leg right" /></div>
    </div>
  </aside>;
}
