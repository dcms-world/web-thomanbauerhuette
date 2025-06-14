import React, { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { FaImage, FaTree, FaHome, FaGlobeEurope } from 'react-icons/fa';
import Navigation from './Navigation';

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
          alt: 'Galerie Bild',
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
      <div className="container mx-auto px-4 py-12 mt-16">
      <div className="flex justify-center mb-8 space-x-4">
{categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                selectedCategory === category 
                  ? 'bg-green-800 text-white' 
                  : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
              }`}
            >
              <Icon className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">{category}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">Lade Bilder...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={`${selectedCategory}-${index}`}
              className="aspect-square overflow-hidden rounded-2xl shadow-lg group transition-all duration-300"
            >
              {image.type === 'video' ? (
                <video
                  src={image.url}
                  muted
                  loop
                  autoPlay
                  playsInline
                  webkit-playsinline
                  x5-playsinline
                  preload="metadata"
                  className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105 video-no-controls"
                />
              ) : (
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
