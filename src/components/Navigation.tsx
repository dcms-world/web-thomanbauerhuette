import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { href: '/', label: 'Start' },
    { href: '/galerie', label: 'Galerie' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const showGlass = isScrolled || !isHome;
  const isLightText = isHome && !isScrolled && !isOpen;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      showGlass ? 'py-3 md:py-4 px-4' : 'py-6 px-6'
    }`}>
      <div className={`mx-auto max-w-6xl rounded-full transition-all duration-500 ${
        showGlass 
          ? 'glassmorphism shadow-lg px-6 py-3 border border-white/20' 
          : 'bg-transparent px-2 py-1'
      }`}>
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300 font-bold ${
              isLightText ? 'text-white drop-shadow-md' : 'text-alpine-800'
            }`}
            onClick={scrollToTop}
          >
            Thomanbauerhütte
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-semibold tracking-wider uppercase relative py-1 transition-colors duration-300 ${
                    isLightText 
                      ? isActive ? 'text-sunshine-300 border-b-2 border-sunshine-400' : 'text-white/80 hover:text-white'
                      : isActive ? 'text-alpine-800 border-b-2 border-sunshine-500' : 'text-alpine-600 hover:text-alpine-800'
                  }`}
                  onClick={scrollToTop}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              isLightText 
                ? 'text-white hover:bg-white/10' 
                : 'text-alpine-800 hover:bg-alpine-100'
            }`}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-alpine-950/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button on Mobile Overlay */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-3 text-white/80 hover:text-white rounded-full hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Menü schließen"
        >
          <X className="w-8 h-8" />
        </button>

        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`text-2xl font-serif tracking-widest transition-colors duration-300 ${
                isActive ? 'text-sunshine-400 font-bold border-b border-sunshine-400 pb-1' : 'text-white/80 hover:text-white'
              }`}
              onClick={() => {
                setIsOpen(false);
                scrollToTop();
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
