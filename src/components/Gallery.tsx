import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

interface MediaData {
  url: string;
  alt: string;
  type: 'image' | 'video';
}

export default function Gallery() {
  const [media, setMedia] = useState<MediaData[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/gallery_manager.php?action=impressions');
        const data: string[] = await response.json();
        const formattedMedia: MediaData[] = data.map((url: string) => ({
          url: url,
          alt: 'Impressionen',
          type: url.toLowerCase().endsWith('.mp4') ? 'video' : 'image'
        }));
        setMedia(formattedMedia);
      } catch (error) {
        console.error('Fehler beim Laden der Medien:', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <section className="py-20 bg-neutral-50" id="gallery">
      <div className="container mx-auto px-4 animate-fade-in">
        <h2 className="font-serif text-4xl text-center mb-12 text-neutral-800 tracking-tight">
          Impressionen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {media.map((item, index) => (
            <div 
              key={index} 
              className="aspect-square overflow-hidden rounded-2xl shadow-lg group"
            >
              {item.type === 'video' ? (
                <video
                  src={item.url}
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
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                />
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
  );
}
