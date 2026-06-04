import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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

  // Memoize header content to prevent unnecessary re-renders
  const headerContent = useMemo(() => {
    const scrollToAbout = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div 
        ref={contentRef}
        className="absolute top-0 left-0 right-0 h-screen flex flex-col items-center justify-center text-white px-4 animate-fade-in z-10"
        style={{
          opacity: Math.max(1 - scrollProgress * 1.8, 0),
          transform: `translateY(${scrollProgress * 40}px)`,
        }}
      >
        <span className="text-sunshine-300 font-serif italic text-lg sm:text-2xl md:text-3xl mb-3 tracking-wide drop-shadow-md">
          Auszeit auf der
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-center mb-8 tracking-tight font-bold text-white drop-shadow-2xl">
          Thomanbauerhütte
        </h1>
        
        {/* Modern Alpine Badge Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-2xl px-4">
          <span className="px-4 py-2 rounded-full border border-white/20 bg-alpine-950/40 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-lg">
            1700m Seehöhe
          </span>
          <span className="px-4 py-2 rounded-full border border-white/20 bg-alpine-950/40 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-lg">
            Nockberge
          </span>
          <span className="px-4 py-2 rounded-full border border-white/20 bg-alpine-950/40 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-lg">
            Digital Detox
          </span>
        </div>

        <button 
          onClick={scrollToAbout}
          className="focus:outline-none focus:ring-2 focus:ring-sunshine-400 rounded-full p-2 hover:bg-white/10 transition-colors"
          aria-label="Nach unten scrollen"
        >
          <ChevronDown 
            className="animate-bounce w-10 h-10 text-sunshine-300 hover:text-sunshine-200 transition-colors duration-300" 
            aria-hidden="true"
            strokeWidth={1.5}
          />
        </button>
      </div>
    );
  }, [scrollProgress]);

  return (
    <header 
      ref={headerRef}
      className="relative h-screen overflow-hidden bg-alpine-950" 
      aria-label="Thomanbauerhütte Hauptbild"
    >
      <picture className="absolute inset-0">
        <source srcSet="/images/header/optimized/huette-aussen-compressed.webp" type="image/webp" />
        <source srcSet="/images/header/optimized/huette-aussen-compressed.jpg" type="image/jpeg" />
        <img 
          src="/images/header/optimized/huette-aussen-compressed.jpg" 
          alt="Außenansicht der Thomanbauerhütte"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-75 ease-out scale-105"
          style={{
            transform: `translateY(${scrollProgress * 15}%)`,
          }}
          fetchpriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-alpine-950/30" />
      {headerContent}
    </header>
  );
}
