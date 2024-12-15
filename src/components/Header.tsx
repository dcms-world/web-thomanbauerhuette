import { ChevronDown } from 'lucide-react';
import { IMAGES } from '../constants/images';

export default function Header() {
  return (
    <header className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${IMAGES.HEADER}")`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl text-center mb-6">
          <span className="block sm:inline">Auszeit auf der</span>{' '}
          <span className="block sm:inline">Thomanbauerhütte</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-12 text-center">
          1700m · Nockberge · Naturerlebnis
        </p>
        <ChevronDown className="animate-bounce w-8 h-8" />
      </div>
    </header>
  );
}
