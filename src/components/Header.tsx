import { ChevronDown } from 'lucide-react';
import { IMAGES } from '../constants/images';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (headerRef.current && contentRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const scrolled = window.scrollY;
        const progress = Math.min(scrolled / headerHeight, 1);
        setScrollProgress(progress);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <header 
      ref={headerRef}
      className="relative h-screen overflow-hidden" 
      aria-label="Thomanbauerhütte Hauptbild"
    >
      <div 
        className="absolute inset-0 bg-cover bg-top transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url("${IMAGES.HEADER}")`,
          backgroundSize: 'cover',
          transform: `translateY(-${scrollProgress * 25}%)`,
        }}
        role="img"
        aria-label="Außenansicht der Thomanbauerhütte"
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div 
        ref={contentRef}
        className="absolute top-0 left-0 right-0 h-screen flex flex-col items-center justify-center text-white px-4 animate-fade-in"
        style={{
          opacity: Math.max(1 - scrollProgress * 2, 0),
        }}
      >
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl text-center mb-6 tracking-tight">
          <span className="block sm:inline text-modern-100">Auszeit auf der</span>{' '}
          <span className="block sm:inline text-white drop-shadow-lg will-change-transform">Thomanbauerhütte</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-12 text-center text-modern-200 font-sans font-light tracking-wide">
          1700m · Nockberge · Naturerlebnis
        </p>
        <ChevronDown 
          className="animate-bounce w-10 h-10 text-modern-300 hover:text-modern-200 transition-colors duration-300" 
          aria-hidden="true"
          strokeWidth={1.5}
        />
      </div>
    </header>
  );
}
