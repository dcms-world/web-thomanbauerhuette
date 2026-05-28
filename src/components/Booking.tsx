export default function Booking() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-alpine-800 text-white relative overflow-hidden" id="booking">
      {/* Decorative backdrop graphics */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-alpine-700 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunshine-500 rounded-full blur-3xl opacity-10 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-sunshine-300 font-serif italic text-lg md:text-xl block">
            Planen Sie Ihre Auszeit
          </span>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Mietzeitraum & Buchung
          </h2>
          
          <p className="text-lg sm:text-xl text-alpine-100 font-light leading-relaxed max-w-xl mx-auto">
            Unsere Hütte steht Ihnen von <strong className="font-semibold text-sunshine-300">Mai bis Oktober</strong> zur Verfügung. 
            Die genauen Termine zur Saisoneröffnung und -schließung hängen von der jeweiligen Wetterlage ab.
          </p>

          <div className="pt-4">
            <button 
              onClick={scrollToContact}
              className="bg-sunshine-500 text-alpine-950 px-10 py-4 rounded-full text-base font-extrabold tracking-wider uppercase hover:bg-sunshine-400 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 shadow-lg"
            >
              Jetzt unverbindlich anfragen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
