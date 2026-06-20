import { Euro, Calendar, Sparkles, AlertCircle, Trash2 } from 'lucide-react';

export default function Pricing() {
  return (
    <section className="pt-12 pb-24 bg-white" id="pricing">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-16 space-y-3">
          <span className="text-sunshine-600 font-serif italic text-lg md:text-xl block">
            Faire Angebote für unvergessliche Tage
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-alpine-800 tracking-tight font-bold">
            Mietpreise & Konditionen
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Kurzaufenthalt */}
            <div className="relative group bg-alpine-50/30 border border-alpine-150 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:bg-white hover:border-alpine-200 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-alpine-500 mb-2 block">Auszeit</span>
                <h3 className="font-serif text-2xl font-bold text-alpine-850 mb-6">Kurzaufenthalt</h3>
                
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-alpine-800 tracking-tight">110</span>
                  <Euro className="w-5 h-5 text-alpine-600 self-start mt-1 ml-0.5" />
                  <span className="text-alpine-600 text-sm ml-2 font-medium">/ pro Nacht</span>
                </div>
                
                <ul className="space-y-3 text-alpine-900/80 mb-8 text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <span className="text-sunshine-600 font-bold">✓</span> Mindestaufenthalt 3 Nächte
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-sunshine-600 font-bold">✓</span> Personenunabhängiger Festpreis
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-sunshine-600 font-bold">✓</span> Komplette Hütte zu Ihrer Verfügung
                  </li>
                </ul>
              </div>
            </div>

            {/* Wochenaufenthalt */}
            <div className="relative group bg-alpine-800 border border-alpine-900 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl shadow-xl flex flex-col justify-between text-white overflow-hidden">
              {/* Popularity Badge */}
              <div className="absolute top-0 right-0 bg-sunshine-500 text-alpine-950 text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-bl-2xl shadow-sm">
                Beliebt & Günstig
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-sunshine-300 mb-2 block">Urlaub</span>
                <h3 className="font-serif text-2xl font-bold mb-6">Wochenaufenthalt</h3>
                
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold tracking-tight text-white">550</span>
                  <Euro className="w-5 h-5 text-sunshine-300 self-start mt-1 ml-0.5" />
                  <span className="text-sunshine-200 text-sm ml-2 font-medium">/ für 7 Nächte</span>
                </div>
                
                <ul className="space-y-3 text-alpine-100/90 mb-8 text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <span className="text-sunshine-400 font-bold">✓</span> Vergünstigter Wochenpreis
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-sunshine-400 font-bold">✓</span> Personenunabhängiger Festpreis
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-sunshine-400 font-bold">✓</span> Komplette Hütte zu Ihrer Verfügung
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Additional Info Banner */}
          <div className="bg-alpine-50/50 border border-alpine-150 rounded-3xl p-8 sm:p-10 space-y-6">
            <h3 className="font-serif text-xl font-bold text-alpine-850">
              Zusätzliche Informationen & Konditionen
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-alpine-900/95">
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-alpine-100 rounded-full p-2 text-alpine-800 mt-0.5">
                    <Euro className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-alpine-850">2,85 € Tourismus- & Mobilitätsabgabe</p>
                    <p className="text-xs text-alpine-600">Pro Person und Nacht (fällig ab dem vollendeten 15. Lebensjahr).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-alpine-100 rounded-full p-2 text-alpine-800 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-alpine-850">10,00 € pro Hund und Nacht</p>
                    <p className="text-xs text-alpine-600">Hunde sind herzlich willkommen. Bitte beachten Sie die Leinenpflicht im Hüttenbereich.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-alpine-100 rounded-full p-2 text-alpine-800 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-alpine-850">Hütte bitte besenrein verlassen</p>
                    <p className="text-xs text-alpine-600">Wir übergeben die Hütte sauber und bitten darum, diese vor Abreise grundlegend zu reinigen.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-alpine-100 rounded-full p-2 text-alpine-800 mt-0.5">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-alpine-850">Eigenständige Müllentsorgung</p>
                    <p className="text-xs text-alpine-600">Ausreichend Müllsäcke sind vor Ort vorhanden. Bitte entsorgen Sie Ihren gesammelten Müll selbst bei Abreise.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
