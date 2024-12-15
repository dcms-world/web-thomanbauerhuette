export default function Booking() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-green-800 text-white" id="booking">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl mb-8">Buchungszeitraum</h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl mb-6">
            Die Hütte kann von Mai bis Oktober gemietet werden.
            Die genauen Termine sind wetterabhängig.
          </p>
          <button 
            onClick={scrollToContact}
            className="bg-white text-green-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-100 transition-colors"
          >
            Jetzt anfragen
          </button>
        </div>
      </div>
    </section>
  );
}
