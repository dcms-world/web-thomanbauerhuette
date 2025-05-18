import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  useEffect(() => {
    if (isImageEnlarged && imageRef.current) {
      // Scroll to the image to ensure it's fully visible
      imageRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [isImageEnlarged]);

  return (
    <footer className="py-12 bg-stone-100 relative">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <div 
            ref={imageRef}
            className={`
              relative cursor-pointer transition-all duration-300 ease-in-out mx-auto
              ${isImageEnlarged 
                ? 'w-full max-w-[800px]' 
                : 'w-32 h-32'}
            `}
            onClick={toggleImageSize}
          >
            <img
              src="/images/team/gastgeber.jpg"
              alt="Leo & Alexandra"
              className={`
                object-cover transition-all duration-300 ease-in-out
                ${isImageEnlarged 
                  ? 'w-full max-h-[80vh] object-contain' 
                  : 'w-32 h-32 rounded-full'}
                shadow-lg
              `}
            />
            {isImageEnlarged && (
              <div className="absolute top-4 right-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageEnlarged(false);
                  }}
                  className="bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <h3 className="font-serif text-2xl mb-2 mt-4">Leo & Alexandra</h3>
          <p className="text-gray-600">Ihre Gastgeber auf der Thomanbauerhütte</p>
        </div>
        <div className="mb-4">
          <Link to="/rechtliches" className="text-sm text-gray-500 hover:text-green-800">
            Impressum & Datenschutz
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Thomanbauerhütte. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
