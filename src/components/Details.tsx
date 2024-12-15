import { Bed, Flame, Droplets, WifiOff } from 'lucide-react';

const amenities = [
  {
    icon: Bed,
    title: "Schlafplätze",
    description: "7 Einzelbetten in 2 Zimmern + Heuboden"
  },
  {
    icon: Flame,
    title: "Grillplatz",
    description: "Lagerfeuer und Grillmöglichkeit"
  },
  {
    icon: Droplets,
    title: "Quellwasser",
    description: "Frisches Bergquellwasser"
  },
  {
    icon: WifiOff,
    title: "Digital Detox",
    description: "Kein Strom & kein Mobilfunk"
  }
];

export default function Details() {
  return (
    <section className="py-20 bg-stone-100" id="details">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl text-center mb-12">Ausstattung</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {amenities.map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className="w-12 h-12 mx-auto mb-4 text-green-800" />
              <h3 className="font-serif text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
