import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-12 bg-stone-100">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <img
            src="/images/team/gastgeber.jpg"
            alt="Leo & Alexandra"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h3 className="font-serif text-2xl mb-2">Leo & Alexandra</h3>
          <p className="text-gray-600">Ihre Gastgeber auf der Thomanbauerhütte</p>
        </div>
        <div className="mb-4">
          <Link to="/rechtliches" className="text-sm text-gray-500 hover:text-green-800">
            Impressum & Datenschutz
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Thomanbauerhütte. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
