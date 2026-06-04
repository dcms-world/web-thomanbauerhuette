import { useState, useEffect } from 'react';

const slideshowImages = [
  { 
    url: "/images/impressions/huette-ganz-aussen.jpg", 
    label: "Hüttenidylle", 
    desc: "Ein Refugium der reinen Entspannung" 
  },
  { 
    url: "/images/impressions/bach-bruecke.jpg", 
    label: "Natur pur", 
    desc: "Plätschernde Gebirgsbäche direkt vor der Tür" 
  },
  { 
    url: "/images/impressions/holzstapel.jpg", 
    label: "Urige Wärme", 
    desc: "Holz vor der Hütte für gemütliche Ofenstunden" 
  },
  { 
    url: "/images/impressions/kuehe_strasse.jpg", 
    label: "Almleben", 
    desc: "Traditionelle Landwirtschaft hautnah erleben" 
  },
  { 
    url: "/images/impressions/umgebung-10.jpg", 
    label: "Bergpanorama", 
    desc: "Wunderbarer Weitblick auf 1700 Meter Höhe" 
  }
];

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play cycle every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  return (
    <section 
      className="py-24 bg-alpine-50/50" 
      id="about" 
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Content (Left side on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="block text-sunshine-600 font-serif italic text-xl md:text-2xl">
                Erholung auf 1700 Meter Seehöhe
              </span>
              <h2 
                id="about-heading" 
                className="font-serif text-3xl sm:text-5xl text-alpine-800 tracking-tight font-bold"
              >
                Über die Thomanbauerhütte
              </h2>
            </div>
            
            <div className="text-alpine-900 text-base sm:text-lg leading-relaxed space-y-6 font-sans">
              <p className="text-xl text-alpine-700 font-serif leading-relaxed border-l-4 border-sunshine-400 pl-4 py-1 italic">
                Inmitten des herrlichen Bergpanoramas der Nockberge und umgeben von zahlreichen Gewässern wurde die Thomanbauerhütte errichtet. Das Ziel: Einen Ort der Ruhe und Erholung zu schaffen, fernab von Alltag und Stress.
              </p>
              <p>
                Mit zwei Schlafzimmern und insgesamt sieben gemütlichen Einzelbetten bietet die Hütte die perfekte Unterkunft für Familien und kleinere Gruppen. Wer das Abenteuer sucht, kann auch traditionell auf dem Heuboden nächtigen.
              </p>
              <p>
                Die urige Wohnstube mit großem Esstisch und einem rustikalen Holzofen lädt zum gemeinsamen Verweilen, Kochen und Genießen ein. Ausreichend Stauraum für Ihr Gepäck ist im Vorraum und in den Schlafräumen vorhanden.
              </p>
              <p className="bg-alpine-100/50 p-4 rounded-xl border border-alpine-200/50 text-sm sm:text-base text-alpine-850">
                <strong>Autarke Stromversorgung:</strong> Die Hütte verfügt über eine kleine Photovoltaikanlage, die eine umweltfreundliche Stromversorgung für Beleuchtung und das Laden kleinerer Geräte ermöglicht.
              </p>
            </div>
          </div>

          {/* Visual Showcase Card with Interactive Carousel (Right side on desktop) */}
          <div className="lg:col-span-5 relative group">
            {/* Background design glow */}
            <div className="absolute inset-0 bg-sunshine-400 rounded-3xl rotate-3 scale-[1.02] opacity-20 transition-transform duration-500 group-hover:rotate-1" />
            
            {/* Carousel Container */}
            <div 
              onClick={nextImage}
              className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/20 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] cursor-pointer select-none"
              aria-label="Nächstes Bild anzeigen"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  nextImage();
                }
              }}
            >
              {slideshowImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={image.url} 
                    alt={image.desc}
                    className="w-full h-full object-cover transform transition-transform duration-[5000ms] ease-out scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-alpine-950/70 via-alpine-950/10 to-transparent" />
                  
                  {/* Labels on slide */}
                  <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                    <p className="text-xs uppercase tracking-wider font-semibold text-sunshine-300 mb-1">
                      {image.label}
                    </p>
                    <p className="font-serif text-lg sm:text-xl font-medium drop-shadow-md">
                      {image.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Page Indicator Dots */}
              <div className="absolute top-4 left-6 flex space-x-1.5 z-30 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
                {slideshowImages.map((_, idx) => (
                  <span 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-sunshine-400 w-3.5' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Tooltip helper */}
              <div className="absolute top-4 right-6 z-30 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-white/90 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Nächstes Foto ➔
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
