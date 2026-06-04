import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Footer() {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  useEffect(() => {
    if (isImageEnlarged && imageRef.current) {
      imageRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [isImageEnlarged]);

  return (
    <footer className="py-16 bg-alpine-950 text-white relative border-t border-alpine-900 overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-alpine-900 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-4 text-center max-w-4xl space-y-8">
        
        {/* Host Profile Area */}
        <div className="space-y-4">
          <div 
            ref={imageRef}
            className={`
              relative cursor-pointer transition-all duration-500 ease-out mx-auto overflow-hidden
              ${isImageEnlarged 
                ? 'w-full max-w-[500px] rounded-3xl border border-white/10 shadow-2xl' 
                : 'w-32 h-32 rounded-full border-4 border-sunshine-500/40 hover:border-sunshine-500 shadow-xl'}
            `}
            onClick={toggleImageSize}
          >
            <img
              src="/images/team/gastgeber.webp"
              alt="Leo & Alexandra, Gastgeber der Thomanbauerhütte"
              className={`
                object-cover transition-all duration-500 ease-out w-full
                ${isImageEnlarged 
                  ? 'max-h-[70vh] object-contain rounded-2xl' 
                  : 'w-32 h-32'}
              `}
              loading="lazy"
            />
            
            {isImageEnlarged && (
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageEnlarged(false);
                  }}
                  className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors focus:ring-2 focus:ring-sunshine-400 focus:outline-none"
                  aria-label="Bild schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold tracking-wide">Leo & Alexandra</h3>
            <p className="text-alpine-300 text-sm tracking-wide font-light">
              Ihre Gastgeber auf der Thomanbauerhütte
            </p>
          </div>
        </div>

        {/* Footer Navigation Links */}
        <div className="pt-6 border-t border-alpine-900/60 max-w-xs mx-auto">
          <Link 
            to="/rechtliches" 
            className="text-xs uppercase tracking-widest font-semibold text-alpine-400 hover:text-sunshine-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sunshine-400 focus:ring-offset-2 focus:ring-offset-alpine-950 px-3 py-1.5 rounded-full"
          >
            Impressum & Datenschutz
          </Link>
        </div>

        {/* Copyright notice */}
        <p className="text-xs text-alpine-500 tracking-wider">
          © {new Date().getFullYear()} Thomanbauerhütte. Alle Rechte vorbehalten.
        </p>

      </div>
    </footer>
  );
}
