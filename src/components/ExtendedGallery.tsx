import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from './Navigation';
import { 
  Image as ImageIcon, 
  Home as HouseIcon, 
  Mountain as LandscapeIcon, 
  Grid as AllIcon 
} from 'lucide-react';

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const galleryImages = shuffleArray([
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `aussen-${i + 1}`,
    src: `/images/gallery/aussen-${i + 1}.jpg`,
    alt: `Außenansicht der Hütte ${i + 1}`,
    category: 'Außenbereich'
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `innen-${i + 1}`,
    src: `/images/gallery/innen-${i + 1}.jpg`,
    alt: `Innenansicht der Hütte ${i + 1}`,
    category: 'Innenbereich'
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `umgebung-${i + 1}`,
    src: `/images/gallery/umgebung-${i + 1}.jpg`,
    alt: `Umgebung der Hütte ${i + 1}`,
    category: 'Umgebung'
  }))
]);

export default function ExtendedGallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  useEffect(() => {
    setFilteredImages(
      activeCategory === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === activeCategory)
    );
    setSelectedImageIndex(null);
  }, [activeCategory]);

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1
    );
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      selectedImageIndex === filteredImages.length - 1 ? 0 : selectedImageIndex + 1
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'Escape') setSelectedImageIndex(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredImages]);

  const categoryIcons = {
    all: AllIcon,
    Außenbereich: HouseIcon,
    Innenbereich: ImageIcon,
    Umgebung: LandscapeIcon
  };

  return (
    <>
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-stone-100">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl text-center mb-12">Fotogalerie</h1>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
              {['all', 'Außenbereich', 'Innenbereich', 'Umgebung'].map(category => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap flex items-center gap-2 ${
                      activeCategory === category
                        ? 'bg-green-800 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {category === 'all' ? 'Alle' : category}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {selectedImageIndex !== null && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setSelectedImageIndex(null);
                }}
              >
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                  <X className="w-8 h-8" />
                </button>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 text-white hover:text-gray-300"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 text-white hover:text-gray-300"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
                <img
                  src={filteredImages[selectedImageIndex].src}
                  alt={filteredImages[selectedImageIndex].alt}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
