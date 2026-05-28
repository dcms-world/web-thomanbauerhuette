import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon, Play } from 'lucide-react';

interface MediaData {
  url: string;
  alt: string;
  type: 'image' | 'video';
}

export default function Gallery() {
  const [media, setMedia] = useState<MediaData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await fetch('/gallery_manager.php?action=impressions');
        const data: string[] = await response.json();
        const formattedMedia: MediaData[] = data.map((url: string) => ({
          url: url,
          alt: 'Impressionen der Thomanbauerhütte',
          type: url.toLowerCase().endsWith('.mp4') ? 'video' : 'image'
        }));
        setMedia(formattedMedia);
      } catch (error) {
        console.error('Fehler beim Laden der Medien:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <section className="py-24 bg-alpine-50/30" id="gallery">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 space-y-3">
          <span className="text-sunshine-600 font-serif italic text-lg md:text-xl block">
            Visuelle Einblicke
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-alpine-800 tracking-tight font-bold">
            Atmosphäre & Impressionen
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-alpine-200 border-t-alpine-800 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {media.map((item, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden rounded-3xl shadow-lg group relative border border-white bg-alpine-150 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.url}
                      muted
                      loop
                      autoPlay
                      playsInline
                      webkit-playsinline="true"
                      x5-playsinline="true"
                      preload="metadata"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 video-no-controls"
                    />
                    {/* Floating Video Tag */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white rounded-full p-2 shadow-md">
                      <Play className="w-3 h-3 fill-current" />
                    </div>
                  </>
                ) : (
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    fetchpriority="low"
                  />
                )}
                {/* Translucent overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-alpine-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/galerie"
            className="inline-flex items-center gap-3 bg-alpine-800 text-white px-8 py-3.5 rounded-full font-semibold tracking-wider hover:bg-alpine-700 active:bg-alpine-900 transition-all duration-300 shadow-md hover:shadow-xl group text-xs uppercase"
          >
            <ImageIcon className="w-4 h-4 mr-1 text-sunshine-300" />
            Zur Bildergalerie
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
