import { useState, useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handlePhoneClick = () => {
    setShowPhone(true);
  };

  const handleEmailClick = () => {
    setShowEmail(true);
  };

  const phonePrefix = '+43';
  const phonePart1 = '664';
  const phonePart2 = '226';
  const phonePart3 = '0300';

  const emailName = 'contact';
  const emailDomain = 'example.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setStatus({
        type: 'error',
        message: 'Bitte bestätigen Sie, dass Sie kein Roboter sind.'
      });
      return;
    }

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptcha: recaptchaValue
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Ihre Anfrage wurde erfolgreich gesendet!'
        });
        setFormData({ 
          name: '', 
          email: '', 
          message: '' 
        });
        recaptchaRef.current?.reset();
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Ein Fehler ist aufgetreten.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      });
    }
  };

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl text-center mb-12">Kontakt</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-6">Kontaktieren Sie uns</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                {showPhone ? (
                  <a href={`tel:${phonePrefix}${phonePart1}${phonePart2}${phonePart3}`} className="hover:text-green-800">
                    {phonePrefix} {phonePart1} {phonePart2} {phonePart3}
                  </a>
                ) : (
                  <button 
                    onClick={handlePhoneClick}
                    className="text-left hover:text-green-800"
                  >
                    Telefonnummer anzeigen
                  </button>
                )}
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                {showEmail ? (
                  <a href={`mailto:${emailName}@${emailDomain}`} className="hover:text-green-800">
                    {emailName}@{emailDomain}
                  </a>
                ) : (
                  <button 
                    onClick={handleEmailClick}
                    className="text-left hover:text-green-800"
                  >
                    E-Mail Adresse anzeigen
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {status.type && (
              <div className={`p-4 rounded ${
                status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {status.message}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2">E-Mail</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2">Nachricht</label>
              <textarea
                id="message"
                rows={6}
                className="w-full p-2 border rounded"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
            
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            />
            
            <button
              type="submit"
              className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Anfrage senden
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
