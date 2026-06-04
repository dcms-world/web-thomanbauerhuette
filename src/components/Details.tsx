import { Bed, Flame, Droplets, WifiOff, Sparkles } from 'lucide-react';

const amenities = [
  {
    icon: Bed,
    title: "Schlafplätze",
    description: "7 gemütliche Einzelbetten aufgeteilt auf 2 urige Zimmer, plus Schlafmöglichkeit im Heuboden."
  },
  {
    icon: Flame,
    title: "Grill- & Lagerfeuerplatz",
    description: "Eigener Grillplatz im Freien für gemütliche Abende am prasselnden Lagerfeuer."
  },
  {
    icon: Droplets,
    title: "Frisches Quellwasser",
    description: "Kristallklares, erfrischendes Bergquellwasser direkt aus dem eigenen Hüttenbrunnen."
  },
  {
    icon: WifiOff,
    title: "Echtes Digital Detox",
    description: "Kein Internet und kein Mobilfunkempfang – die perfekte Gelegenheit, komplett abzuschalten."
  }
];

const comfortItems = [
  "Spültoilette",
  "Solardusche im Außenbereich",
  "Kühlschrank & Filterkaffeemaschine",
];

export default function Details() {
  return (
    <section className="py-24 bg-white" id="details">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 space-y-3">
          <span className="text-sunshine-600 font-serif italic text-lg md:text-xl block">
            Komfort trifft auf Bergurigkeit
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-alpine-800 tracking-tight font-bold">
            Die Ausstattung der Hütte
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {amenities.map((item, index) => (
            <div
              key={index}
              className={`group bg-alpine-50/40 border border-alpine-100 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white hover:border-alpine-200 ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-alpine-100 text-alpine-800 rounded-2xl flex items-center justify-center shadow-inner transition-colors duration-300 group-hover:bg-sunshine-100 group-hover:text-sunshine-800">
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-alpine-850 mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-alpine-900 text-sm leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}

          {/* Komfort-Karte */}
          <div className="group bg-alpine-50/40 border border-alpine-100 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white hover:border-alpine-200 md:col-span-2 lg:col-span-3">
            <div className="w-16 h-16 mx-auto mb-6 bg-alpine-100 text-alpine-800 rounded-2xl flex items-center justify-center shadow-inner transition-colors duration-300 group-hover:bg-sunshine-100 group-hover:text-sunshine-800">
              <Sparkles className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-bold text-alpine-850 mb-4 tracking-wide">
              Komfort
            </h3>
            <ul className="space-y-1">
              {comfortItems.map((item) => (
                <li key={item} className="text-alpine-900 text-sm font-light">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
