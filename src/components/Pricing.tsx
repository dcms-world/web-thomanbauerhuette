import { Euro } from 'lucide-react';

export default function Pricing() {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl text-center mb-12">Preise</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-100 p-8 rounded-lg">
              <h3 className="font-serif text-2xl mb-4">Kurzaufenthalt</h3>
              <div className="flex items-center mb-4">
                <Euro className="w-6 h-6 text-green-800 mr-2" />
                <span className="text-3xl font-semibold">100</span>
                <span className="text-gray-600 ml-2">pro Nacht</span>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Mindestaufenthalt 3 Nächte</li>
                <li>• Personenunabhängiger Preis</li>
                <li>• Komplette Hütte zur Verfügung</li>
              </ul>
            </div>
            <div className="bg-stone-100 p-8 rounded-lg">
              <h3 className="font-serif text-2xl mb-4">Wochenaufenthalt</h3>
              <div className="flex items-center mb-4">
                <Euro className="w-6 h-6 text-green-800 mr-2" />
                <span className="text-3xl font-semibold">500</span>
                <span className="text-gray-600 ml-2">für 7 Nächte</span>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Vergünstigter Wochenpreis</li>
                <li>• Personenunabhängiger Preis</li>
                <li>• Komplette Hütte zur Verfügung</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="p-6 bg-stone-100 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Zusätzliche Kosten</h3>
              <ul className="space-y-3">
                <li className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <div className="flex items-center">
                    <Euro className="w-5 h-5 text-green-800 mr-2" />
                    <span className="text-xl font-semibold">80</span>
                  </div>
                  <span className="text-gray-600">Endreinigung (einmalig)</span>
                </li>
                <li className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <div className="flex items-center">
                    <Euro className="w-5 h-5 text-green-800 mr-2" />
                    <span className="text-xl font-semibold">2,35</span>
                  </div>
                  <span className="text-gray-600">Tourismusabgabe pro Person/Nacht (ab 15 Jahren)</span>
                </li>
                <li className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <div className="flex items-center">
                    <Euro className="w-5 h-5 text-green-800 mr-2" />
                    <span className="text-xl font-semibold">10</span>
                  </div>
                  <span className="text-gray-600">pro Hund/Nacht</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
