import React, { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { FaImage, FaTree, FaHome, FaGlobeEurope } from 'react-icons/fa';
import { Play } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface ImageData {
  url: string;
  alt: string;
  type: 'image' | 'video';
}

interface CategoryIcons {
  [key: string]: IconType;
}

export default function ExtendedGallery() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/gallery_manager.php?category=${selectedCategory}`);
        const data: string[] = await response.json();
        const formattedImages: ImageData[] = data.map((url: string) => ({
          url: url,
          alt: `Thomanbauerhütte - ${selectedCategory}`,
          type: url.toLowerCase().endsWith('.mp4') ? 'video' : 'image'
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Fehler beim Laden der Bilder:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [selectedCategory]);

  const categoryIcons: CategoryIcons = {
    'Alle': FaImage,
    'Aussen': FaTree,
    'Innen': FaHome,
    'Umgebung': FaGlobeEurope
  };

  const categories = ['Alle', 'Aussen', 'Innen', 'Umgebung'];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-24 mt-20 max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <span className="text-sunshine-600 font-serif italic text-lg md:text-xl block">
              Einblicke in unser Paradies
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-alpine-800 tracking-tight font-extrabold">
              Die Bildergalerie
            </h1>
          </div>

          {/* Elegant Pill Category Tabs */}
          <div className="flex flex-wrap justify-center mb-16 gap-2 sm:gap-3 max-w-xl mx-auto bg-alpine-50 p-2 rounded-full border border-alpine-150/50 backdrop-blur-md">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-alpine-700/40 ${
                    isSelected 
                      ? 'bg-alpine-800 text-white shadow-md' 
                      : 'text-alpine-750 hover:bg-alpine-100 hover:text-alpine-950'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-sunshine-300' : 'text-alpine-500'} mr-2`} />
                  <span>{category === 'Alle' ? 'Alle Fotos' : category}</span>
                </button>
              );
            })}
          </div>

          {/* Skeleton Loader or Image Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-alpine-100/50 border border-alpine-150 rounded-3xl animate-pulse shadow-sm"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
              {images.map((image, index) => (
                <div 
                  key={`${selectedCategory}-${index}`}
                  className="aspect-square overflow-hidden rounded-3xl shadow-md group relative border border-white bg-alpine-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {image.type === 'video' ? (
                    <>
                      <video
                        src={image.url}
                        muted
                        loop
                        autoPlay
                        playsInline
                        webkit-playsinline="true"
                        x5-playsinline="true"
                        preload="metadata"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 video-no-controls"
                      />
                      {/* Floating Play tag */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white rounded-full p-2 shadow-md">
                        <Play className="w-3 h-3 fill-current" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  {/* Backdrop reflection blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-alpine-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
