import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Calendar, Info } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    arrivalDate: '',
    departureDate: ''
  });

  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const arrivalDateRef = useRef<HTMLInputElement>(null);
  const departureDateRef = useRef<HTMLInputElement>(null);

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

  const emailName = 'thomanbauerhuette';
  const emailDomain = 'hotmail.com';

  useEffect(() => {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    
    let firstPossibleArrival = new Date(oneWeekFromNow.getFullYear(), 4, 1); // 1. Mai
    
    if (oneWeekFromNow > firstPossibleArrival) {
      firstPossibleArrival = new Date(oneWeekFromNow.getFullYear(), 4, 1);
    }
    
    while (firstPossibleArrival.getMonth() < 5 || firstPossibleArrival.getMonth() > 9) {
      firstPossibleArrival = new Date(firstPossibleArrival.getFullYear(), firstPossibleArrival.getMonth() + 1, 1);
    }

    if (arrivalDateRef.current) {
      arrivalDateRef.current.value = firstPossibleArrival.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        arrivalDate: firstPossibleArrival.toISOString().split('T')[0]
      }));
    }
  }, []);

  const isValidSeason = (date: Date) => {
    const month = date.getMonth();
    return month >= 4 && month <= 9; // Mai bis Oktober
  };

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

    const arrival = arrivalDateRef.current?.value;
    const departure = departureDateRef.current?.value;

    if (!arrival || !departure) {
      setStatus({
        type: 'error',
        message: 'Bitte geben Sie An- und Abreisedatum an.'
      });
      return;
    }

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    const daysDifference = Math.ceil((departureDate.getTime() - arrivalDate.getTime()) / (1000 * 3600 * 24));

    if (daysDifference < 3) {
      setStatus({
        type: 'error',
        message: 'Der Mindestaufenthalt beträgt 3 Nächte.'
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
          arrivalDate: arrival,
          departureDate: departure,
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
          message: '', 
          arrivalDate: '', 
          departureDate: '' 
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

  const today = new Date();
  const oneWeekFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const minDate = oneWeekFromNow.toISOString().split('T')[0];
  
  const maxDate = new Date(today.getFullYear() + 2, 11, 31).toISOString().split('T')[0];

  const minDepartureDate = formData.arrivalDate 
    ? new Date(new Date(formData.arrivalDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : minDate;

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl text-center mb-12">Kontakt</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Phone and Email Contact Section */}
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
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {status.type && (
              <div className={`p-4 rounded ${
                status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {status.message}
              </div>
            )}
            
            {/* Name Input */}
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
            
            {/* Email Input */}
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
            
            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-4">
              {/* Arrival Date */}
              <div>
                <label htmlFor="arrivalDate" className="block mb-2 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" /> Anreise
                </label>
                <input
                  type="date"
                  id="arrivalDate"
                  ref={arrivalDateRef}
                  className="w-full p-2 border rounded"
                  min={minDate}
                  max={maxDate}
                  value={formData.arrivalDate}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    if (isValidSeason(selectedDate)) {
                      // Clear previous error if a valid season is selected
                      if (status.type === 'error' && status.message.includes('Mai und Oktober')) {
                        setStatus({ type: null, message: '' });
                      }
                      
                      setFormData({
                        ...formData, 
                        arrivalDate: e.target.value,
                        departureDate: '' // Reset departure when arrival changes
                      });
                    } else {
                      setStatus({
                        type: 'error',
                        message: 'Bitte wählen Sie ein Datum zwischen Mai und Oktober.'
                      });
                      e.target.value = '';
                    }
                  }}
                  required
                />
              </div>
              
              {/* Departure Date */}
              <div>
                <label htmlFor="departureDate" className="block mb-2 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" /> Abreise
                </label>
                <input
                  type="date"
                  id="departureDate"
                  ref={departureDateRef}
                  className="w-full p-2 border rounded"
                  min={minDepartureDate}
                  max={maxDate}
                  value={formData.departureDate}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    if (isValidSeason(selectedDate)) {
                      // Clear previous error if a valid season is selected
                      if (status.type === 'error' && status.message.includes('Mai und Oktober')) {
                        setStatus({ type: null, message: '' });
                      }
                      
                      setFormData({...formData, departureDate: e.target.value});
                    } else {
                      setStatus({
                        type: 'error',
                        message: 'Bitte wählen Sie ein Datum zwischen Mai und Oktober.'
                      });
                      e.target.value = '';
                    }
                  }}
                  disabled={!formData.arrivalDate}
                  required
                />
              </div>
            </div>
            
            {/* Seasonal Information */}
            <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
              <Info className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <p className="text-yellow-800 text-sm">
                Bitte beachten Sie: Die Hütte ist nur von Anfang Mai bis Ende Oktober buchbar. 
                Ihr gewünschter Reisezeitraum muss persönlich mit uns bestätigt werden, 
                da die Verfügbarkeit nicht garantiert werden kann.
              </p>
            </div>
            
            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block mb-2">Nachricht</label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-2 border rounded"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
            
            {/* reCAPTCHA */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="DEIN_RECAPTCHA_SITE_KEY"
            />
            
            {/* Submit Button */}
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
