import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const hutAddress = 'Hinteralm 121, 5591 Ramingstein, Österreich';
const mapsQuery = encodeURIComponent(hutAddress);
const isAppleDevice = /Macintosh|iPhone|iPad|iPod/.test(navigator.userAgent);
const locationUrl = isAppleDevice
  ? `https://maps.apple.com/?address=${mapsQuery}`
  : `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Herzlichen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.'
        });
        setFormData({ 
          name: '', 
          email: '', 
          message: '' 
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Ein Fehler ist aufgetreten beim Absenden der Nachricht.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({
        type: 'error',
        message: 'Es konnte keine Verbindung aufgebaut werden. Bitte versuchen Sie es später erneut.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-alpine-50/20" id="contact">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16 space-y-3">
          <span className="text-sunshine-600 font-serif italic text-lg md:text-xl block">
            Wir freuen uns auf Ihre Nachricht
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-alpine-800 tracking-tight font-bold">
            Kontakt & Buchungsanfrage
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Contact Details Card (Left) */}
          <div className="lg:col-span-5 bg-alpine-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-alpine-700 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/3" />
            
            <div className="space-y-8 relative z-10">
              <h3 className="font-serif text-2xl font-bold tracking-wide">
                Direkter Kontakt
              </h3>
              
              <p className="text-alpine-250 text-sm leading-relaxed font-light">
                Haben Sie Fragen zur Ausstattung, zur Anreise oder möchten Sie einen individuellen Belegungszeitraum anfragen? 
                Wir sind jederzeit gerne für Sie da.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="bg-alpine-700/60 rounded-full p-3 text-sunshine-400 group-hover:bg-sunshine-500 group-hover:text-alpine-950 transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-alpine-300 uppercase tracking-widest font-semibold">Telefonisch</p>
                    <a href="tel:+436642260300" className="text-base font-bold hover:text-sunshine-300 transition-colors">
                      +43 664 226 0300
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="bg-alpine-700/60 rounded-full p-3 text-sunshine-400 group-hover:bg-sunshine-500 group-hover:text-alpine-950 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-alpine-300 uppercase tracking-widest font-semibold">Per E-Mail</p>
                    <a href="mailto:huette@thomanbauer.at" className="text-base font-bold hover:text-sunshine-300 transition-colors">
                      huette@thomanbauer.at
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-alpine-700/60 rounded-full p-3 text-sunshine-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-alpine-300 uppercase tracking-widest font-semibold">Lage der Hütte</p>
                    <a
                      href={locationUrl}
                      className="text-base font-bold text-alpine-100 hover:text-sunshine-300 transition-colors"
                      aria-label={`${hutAddress} in der Karten-App öffnen`}
                    >
                      Hinteralm 121<br />
                      5591 Ramingstein, Österreich
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-alpine-700 text-xs text-alpine-300 relative z-10">
              Antworten auf E-Mail-Anfragen erfolgen in der Regel innerhalb von 24 Stunden.
            </div>
          </div>
          
          {/* Request Form (Right) */}
          <form 
            onSubmit={handleSubmit} 
            className="lg:col-span-7 bg-white border border-alpine-150 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-6"
            noValidate
          >
            {status.type && (
              <div 
                className={`p-5 rounded-2xl border text-sm leading-relaxed ${
                  status.type === 'success' 
                    ? 'bg-alpine-50 border-alpine-200 text-alpine-800' 
                    : 'bg-red-50 border-red-150 text-red-800'
                }`}
                role="alert"
              >
                <strong>{status.type === 'success' ? 'Erfolg: ' : 'Fehler: '}</strong>
                {status.message}
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-alpine-800">
                  Ihr Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-alpine-50/50 border border-alpine-150 rounded-2xl text-alpine-950 placeholder-alpine-400 focus:bg-white focus:ring-2 focus:ring-alpine-700/20 focus:border-alpine-800 transition-all duration-300 outline-none text-base font-medium"
                  placeholder="Max Mustermann"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  autoComplete="name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-alpine-800">
                  Ihre E-Mail-Adresse
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-alpine-50/50 border border-alpine-150 rounded-2xl text-alpine-950 placeholder-alpine-400 focus:bg-white focus:ring-2 focus:ring-alpine-700/20 focus:border-alpine-800 transition-all duration-300 outline-none text-base font-medium"
                  placeholder="max@beispiel.de"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-alpine-800">
                Ihre Nachricht (inkl. Wunschtermin & Personenanzahl)
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-alpine-50/50 border border-alpine-150 rounded-2xl text-alpine-950 placeholder-alpine-400 focus:bg-white focus:ring-2 focus:ring-alpine-700/20 focus:border-alpine-800 transition-all duration-300 outline-none text-base font-medium resize-y min-h-[120px]"
                placeholder="Ich interessiere mich für den Zeitraum vom TT.MM. bis TT.MM. für X Personen..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-alpine-800 text-white font-extrabold py-4 rounded-full hover:bg-alpine-700 active:scale-[0.98] disabled:opacity-50 transition-all duration-300 shadow-md uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Wird gesendet...' : (
                <>
                  Anfrage senden
                  <Send className="w-4 h-4 ml-1 text-sunshine-300" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
