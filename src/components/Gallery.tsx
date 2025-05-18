import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES } from '../constants/images';
import { useState, useRef } from 'react';

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedImage, setExpandedImage] = useState<{url: string, alt: string} | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleExpandImage = (image: {url: string, alt: string}, index: number) => {
    setExpandedImage(image);
    setCurrentImageIndex(index);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    const touchEndX = e.touches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left (next image)
        setCurrentImageIndex(prev => 
          prev < IMAGES.GALLERY.length - 1 ? prev + 1 : 0
        );
      } else {
        // Swipe right (previous image)
        setCurrentImageIndex(prev => 
          prev > 0 ? prev - 1 : IMAGES.GALLERY.length - 1
        );
      }
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      if (direction === 'next') {
        return prev < IMAGES.GALLERY.length - 1 ? prev + 1 : 0;
      } else {
        return prev > 0 ? prev - 1 : IMAGES.GALLERY.length - 1;
      }
    });
  };

  const handleImageClick = () => {
    setCurrentImageIndex(prev => 
      prev < IMAGES.GALLERY.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <>
      <section className="py-20 bg-neutral-50" id="gallery">
        <div className="container mx-auto px-4 animate-fade-in">
          <h2 className="font-serif text-4xl text-center mb-12 text-neutral-800 tracking-tight">
            Impressionen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {IMAGES.GALLERY.map((image, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden rounded-2xl shadow-lg relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                  loading="lazy"
                  onClick={() => handleExpandImage(image, index)}
                />
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      className="bg-white/80 p-3 rounded-full hover:bg-white transition-colors"
                      aria-label="Expand image"
                      onClick={() => handleExpandImage(image, index)}
                    >
                      <ImageIcon className="w-6 h-6 text-neutral-800" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/galerie"
              className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 group"
            >
              <ImageIcon 
                className="w-5 h-5 mr-2" 
                strokeWidth={2}
              />
              Zur Bildergalerie
              <ArrowRight 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              />
            </Link>
          </div>
        </div>
      </section>

      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fade-in"
          onClick={closeExpandedImage}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="max-w-[90%] max-h-[90%] relative"
            onClick={(e) => {
              e.stopPropagation();
              handleImageClick();
            }}
          >
            <img 
              src={IMAGES.GALLERY[currentImageIndex].url} 
              alt={IMAGES.GALLERY[currentImageIndex].alt} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button 
              onClick={closeExpandedImage}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              aria-label="Close image"
            >
              <X className="w-6 h-6 text-neutral-800" />
            </button>
            
            {/* Previous Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-800" />
            </button>
            
            {/* Next Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-neutral-800" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
