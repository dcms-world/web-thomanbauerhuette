import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants/images';

export default function Gallery() {
  return (
    <section className="py-20" id="gallery">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl text-center mb-12">Impressionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {IMAGES.GALLERY.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/galerie"
            className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Zur Bildergalerie
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
