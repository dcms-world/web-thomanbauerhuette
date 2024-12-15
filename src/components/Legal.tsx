import { useState } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone } from 'lucide-react';

export default function Legal() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const emailName = 'thomanbauerhuette';
  const emailDomain = 'hotmail.com';
  const phonePrefix = '+43';
  const phonePart1 = '664';
  const phonePart2 = '6355';
  const phonePart3 = '929';

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white pt-16">
        <div className="container mx-auto px-4 max-w-4xl py-20 prose">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-4xl m-0">Impressum & Datenschutz</h1>
            <Link 
              to="/" 
              className="flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Zur Startseite
            </Link>
          </div>
          
          <section className="mb-12">
            <h2 className="font-serif text-2xl mb-4">Impressum</h2>
            <p>
              Webseitenbetreiber: Leonhard Kendlbacher<br />
              Thomanbauerhütte<br />
              Ramingstein, Österreich<br />
              Telefon: {showPhone ? (
                <a href={`tel:${phonePrefix}${phonePart1}${phonePart2}${phonePart3}`} className="hover:text-green-800">
                  {phonePrefix} {phonePart1} {phonePart2} {phonePart3}
                </a>
              ) : (
                <button 
                  onClick={() => setShowPhone(true)}
                  className="text-blue-600 hover:text-blue-800 underline flex items-center"
                >
                  <Phone className="w-4 h-4 mr-1" /> Telefonnummer anzeigen
                </button>
              )}<br />
              E-Mail: {showEmail ? (
                <a href={`mailto:${emailName}@${emailDomain}`} className="hover:text-green-800">
                  {emailName}@{emailDomain}
                </a>
              ) : (
                <button 
                  onClick={() => setShowEmail(true)}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  E-Mail anzeigen
                </button>
              )}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Erklärung zur Informationspflicht</h2>
            
            <h3 className="font-serif text-xl mb-2">Datenschutzerklärung</h3>
            <p>
              In folgender Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Webseite. 
              Wir erheben und verarbeiten personenbezogene Daten nur auf Grundlage der gesetzlichen Bestimmungen (Datenschutzgrundverordnung, Telekommunikationsgesetz 2003).
            </p>

            <h3 className="font-serif text-xl mb-2 mt-6">Datenerfassung beim Websitebesuch</h3>
            <p>
              Sobald Sie als Benutzer auf unsere Webseite zugreifen oder diese besuchen, wird Ihre IP-Adresse, Beginn sowie Ende der Sitzung erfasst. 
              Dies ist technisch bedingt und stellt somit ein berechtigtes Interesse iSv Art 6 Abs 1 lit f DSGVO dar.
            </p>

            <h3 className="font-serif text-xl mb-2 mt-6">Kontakt mit uns</h3>
            <p>
              Wenn Sie uns über unser Kontaktformular auf unserer Webseite oder per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten 
              zwecks Bearbeitung Ihrer Anfrage oder für den Fall von weiteren Anschlussfragen für sechs Monate bei uns gespeichert. 
              Es erfolgt ohne Ihre Einwilligung keine Weitergabe Ihrer übermittelten Daten.
            </p>

            <h3 className="font-serif text-xl mb-2 mt-6">Google Fonts</h3>
            <p>
              Unsere Website verwendet Schriftarten von „Google Fonts". Der Dienstanbieter dieser Funktion ist:
            </p>
            <p>
              Google Ireland Limited<br />
              Gordon House, Barrow Street<br />
              Dublin 4, Ireland<br />
              Tel: +353 1 543 1000
            </p>
            <p>
              Beim Aufrufen dieser Webseite lädt Ihr Browser Schriftarten und speichert diese in den Cache. 
              Da Sie als Besucher der Webseite Daten des Dienstanbieters empfangen, kann Google unter Umständen Cookies auf Ihrem Rechner setzen oder analysieren.
            </p>
            <p>
              Die Nutzung von „Google-Fonts" dient der Optimierung unserer Dienstleistung und der einheitlichen Darstellung von Inhalten. 
              Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
            </p>
            <p>
              Weitere Informationen:
              <ul>
                <li>
                  <a 
                    href="https://developers.google.com/fonts/faq" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Google Fonts FAQ
                  </a>
                </li>
                <li>
                  <a 
                    href="https://policies.google.com/privacy?hl=de" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Google Datenschutzerklärung
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.privacyshield.gov/EU-US-Framework" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    EU-US Privacy Shield
                  </a>
                </li>
              </ul>
            </p>

            <h3 className="font-serif text-xl mb-2 mt-6">Server-Log Files</h3>
            <p>
              Diese Webseite und der damit verbundene Provider erhebt im Zuge der Webseitennutzung automatisch Informationen im Rahmen sogenannter „Server-Log Files". Dies betrifft insbesondere:
            </p>
            <ul>
              <li>IP-Adresse oder Hostname</li>
              <li>Verwendeter Browser</li>
              <li>Aufenthaltsdauer auf der Webseite sowie Datum und Uhrzeit</li>
              <li>Aufgerufene Seiten der Webseite</li>
              <li>Spracheinstellungen und Betriebssystem</li>
              <li>„Leaving-Page" (auf welcher URL hat der Benutzer die Webseite verlassen)</li>
              <li>ISP (Internet Service Provider)</li>
            </ul>
            <p>
              Diese erhobenen Informationen werden nicht personenbezogen verarbeitet oder mit personenbezogenen Daten in Verbindung gebracht.
            </p>
            <p>
              Der Webseitenbetreiber behält es sich vor, im Falle von Bekanntwerden rechtswidriger Tätigkeiten, diese Daten auszuwerten oder zu überprüfen.
            </p>

            <h3 className="font-serif text-xl mb-2 mt-6">Ihre Rechte als Betroffener</h3>
            <p>
              Sie als Betroffener haben bezüglich Ihrer Daten, welche bei uns gespeichert sind, grundsätzlich ein Recht auf:
            </p>
            <ul>
              <li>Auskunft</li>
              <li>Löschung der Daten</li>
              <li>Berichtigung der Daten</li>
              <li>Übertragbarkeit der Daten</li>
              <li>Wiederruf und Widerspruch zur Datenverarbeitung</li>
              <li>Einschränkung</li>
            </ul>
            <p>
              Wenn Sie vermuten, dass im Zuge der Verarbeitung Ihrer Daten Verstöße gegen das Datenschutzrecht passiert sind, 
              so haben Sie die Möglichkeit, sich bei uns unter der angegeben Emailadresse oder der Datenschutzbehörde zu beschweren.
            </p>
          </section>

          <p className="mt-8 text-sm text-gray-600">
            Stand: {new Date().toLocaleDateString('de-AT')}<br />
            Quelle: <a 
              href="https://www.fairesrecht.at/kostenlos-datenschutzerklaerung-erstellen-generator.php" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800"
            >
              Datenschutz Österreich DSGVO
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
