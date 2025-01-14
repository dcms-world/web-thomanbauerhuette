export default function About() {
  return (
    <section 
      className="py-20 bg-stone-100" 
      id="about" 
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        <h2 
          id="about-heading" 
          className="font-serif text-4xl text-center mb-12"
        >
          Über uns
        </h2>
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
          <p>
            Auf einer Höhe von 1700 Metern, inmitten des herrlichen Bergpanoramas der Nockberge und umgeben von
            zahlreichen Gewässern und Bächen wurde die Thomanbauer Hütte errichtet. Das Ziel: Einen Ort der Ruhe und
            Erholung zu schaffen, fernab von allen Alltagsproblemen und Stress.
          </p>
          <p>
            Mit zwei Schlafzimmern und insgesamt sieben Einzelbetten ist die Hütte die perfekte Unterkunft für Familien,
            aber auch kleinere Gruppen. Es besteht zusätzlich die Möglichkeit, im Heuboden zu schlafen.
          </p>
          <p>
            In der Wohnstube mit Esstisch und rustikalem Holzofen lässt es sich hervorragend entspannen. Der Vorraum
            und die Zimmer sind mit Kästen ausgestattet, sodass ausreichend Platz zum Verstauen vom Gepäck vorhanden ist.
          </p>
        </div>
      </div>
    </section>
  );
}
