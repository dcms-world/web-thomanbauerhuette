import { useState } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone } from 'lucide-react';

export default function Legal() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const emailName = 'huette';
  const emailDomain = 'thomanbauer.at';
  const phonePrefix = '+43';
  const phonePart1 = '664';
  const phonePart2 = '6355';
  const phonePart3 = '929';

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-alpine-50/20 pt-20">
        <div className="container mx-auto px-4 max-w-3xl py-20 prose prose-stone lg:prose-lg">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-12 pb-6 border-b border-alpine-150">
            <h1 className="font-serif text-3xl sm:text-4xl m-0 font-bold text-alpine-850">Impressum & Datenschutz</h1>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 bg-alpine-800 text-white px-5 py-2.5 rounded-full hover:bg-alpine-700 active:bg-alpine-900 transition-colors shadow-md text-sm font-semibold"
            >
              <Home className="w-4 h-4 text-sunshine-300" />
              Zur Startseite
            </Link>
          </div>
          
          <section className="mb-12 bg-white border border-alpine-150 rounded-3xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl mb-6 text-alpine-800 font-bold">Impressum</h2>
            <p className="text-base text-alpine-900 leading-relaxed font-light">
              <strong>Webseitenbetreiber:</strong> Leonhard Kendlbacher<br />
              Thomanbauerhütte<br />
              Machein 31<br />
              5591 Ramingstein<br /><br />
              <strong>Telefon:</strong> {showPhone ? (
                <a href={`tel:${phonePrefix}${phonePart1}${phonePart2}${phonePart3}`} className="text-alpine-800 hover:text-sunshine-600 font-semibold underline decoration-sunshine-400">
                  {phonePrefix} {phonePart1} {phonePart2} {phonePart3}
                </a>
              ) : (
                <button 
                  onClick={() => setShowPhone(true)}
                  className="text-sunshine-600 hover:text-sunshine-700 font-semibold focus:underline outline-none"
                >
                  Telefonnummer anzeigen
                </button>
              )}<br />
              <strong>E-Mail:</strong> {showEmail ? (
                <a href={`mailto:${emailName}@${emailDomain}`} className="text-alpine-800 hover:text-sunshine-600 font-semibold underline decoration-sunshine-400">
                  {emailName}@{emailDomain}
                </a>
              ) : (
                <button 
                  onClick={() => setShowEmail(true)}
                  className="text-sunshine-600 hover:text-sunshine-700 font-semibold focus:underline outline-none"
                >
                  E-Mail anzeigen
                </button>
              )}
            </p>
          </section>

          <section>
            <h3 className="font-serif text-xl mb-4">Erklärung zur Informationspflicht</h3>
            <p className="text-center"><strong>Datenschutzerklärung</strong></p>
            <p>
              In folgender Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung 
              im Rahmen unserer Webseite. Wir erheben und verarbeiten personenbezogene Daten nur auf Grundlage der gesetzlichen 
              Bestimmungen (Datenschutzgrundverordnung, Telekommunikationsgesetz 2003).
            </p>
            <p>
              Sobald Sie als Benutzer auf unsere Webseite zugreifen oder diese besuchen wird Ihre IP-Adresse, Beginn sowie Beginn 
              und Ende der Sitzung erfasst. Dies ist technisch bedingt und stellt somit ein berechtigtes Interesse iSv Art 6 Abs 1 lit f DSGVO.
            </p>

            <h5 className="font-serif text-lg mt-6 mb-2">Kontakt mit uns</h5>
            <p>
              Wenn Sie uns, entweder über unser Kontaktformular auf unserer Webseite, oder per Email kontaktieren, 
              dann werden die von Ihnen an uns übermittelten Daten zwecks Bearbeitung Ihrer Anfrage oder für den Fall von weiteren 
              Anschlussfragen für sechs Monate bei uns gespeichert. Es erfolgt, ohne Ihre Einwilligung, keine Weitergabe Ihrer übermittelten Daten.
            </p>

            <h5 className="font-serif text-lg mt-6 mb-2">Google Fonts</h5>
            <p>
              Unsere Website verwendet Schriftarten von „Google Fonts". Der Dienstanbieter dieser Funktion ist:
            </p>
            <ul className="list-disc pl-5">
              <li>Google Ireland Limited Gordon House, Barrow Street Dublin 4. Ireland</li>
            </ul>
            <p>Tel: +353 1 543 1000</p>
            <p>
              Beim Aufrufen dieser Webseite lädt Ihr Browser Schriftarten und speichert 
              diese in den Cache. Da Sie, als Besucher der Webseite, Daten des 
              Dienstanbieters empfangen kann Google unter Umständen Cookies auf Ihrem 
              Rechner setzen oder analysieren.
            </p>
            <p>
              Die Nutzung von „Google-Fonts" dient der Optimierung unserer Dienstleistung 
              und der einheitlichen Darstellung von Inhalten. Dies stellt ein 
              berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
            </p>
            <p>Weitere Informationen zu Google Fonts erhalten Sie unter folgendem Link:</p>
            <ul className="list-disc pl-5">
              <li>
                <a 
                  href="https://developers.google.com/fonts/faq" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  https://developers.google.com/fonts/faq
                </a>
              </li>
            </ul>
            <p>Weitere Informationen über den Umgang mit Nutzerdaten von Google können Sie der Datenschutzerklärung entnehmen:</p>
            <ul className="list-disc pl-5">
              <li>
                <a 
                  href="https://policies.google.com/privacy?hl=de" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  https://policies.google.com/privacy?hl=de
                </a>
                .
              </li>
            </ul>
            <p>
              Google verarbeitet die Daten auch in den USA, hat sich jedoch dem 
              EU-US Privacy-Shield unterworfen.
            </p>
            <p>
              <a 
                href="https://www.privacyshield.gov/EU-US-Framework" 
                className="text-blue-600 hover:text-blue-800"
              >
                https://www.privacyshield.gov/EU-US-Framework
              </a>
            </p>

            <h5 className="font-serif text-lg mt-6 mb-2">Server-Log Files</h5>
            <p>
              Diese Webseite und der damit verbundene Provider erhebt im Zuge der 
              Webseitennutzung automatisch Informationen im Rahmen sogenannter 
              „Server-Log Files". Dies betrifft insbesondere:
            </p>
            <ul className="list-disc pl-5">
              <li>IP-Adresse oder Hostname</li>
              <li>den verwendeten Browser</li>
              <li>Aufenthaltsdauer auf der Webseite sowie Datum und Uhrzeit</li>
              <li>aufgerufene Seiten der Webseite</li>
              <li>Spracheinstellungen und Betriebssystem</li>
              <li>„Leaving-Page" (auf welcher URL hat der Benutzer die Webseite verlassen)</li>
              <li>ISP (Internet Service Provider)</li>
            </ul>
            <p>
              Diese erhobenen Informationen werden nicht personenbezogen verarbeitet oder 
              mit personenbezogenen Daten in Verbindung gebracht.
            </p>
            <p>
              Der Webseitenbetreiber behält es sich vor, im Falle von Bekanntwerden 
              rechtswidriger Tätigkeiten, diese Daten auszuwerten oder zu überprüfen.
            </p>

            <h5 className="font-serif text-lg mt-6 mb-2">Ihre Rechte als Betroffener</h5>
            <p>
              Sie als Betroffener haben bezüglich Ihrer Daten, welche bei uns gespeichert sind grundsätzlich ein Recht auf:
            </p>
            <ul className="list-disc pl-5">
              <li>Auskunft</li>
              <li>Löschung der Daten</li>
              <li>Berichtigung der Daten</li>
              <li>Übertragbarkeit der Daten</li>
              <li>Wiederruf und Widerspruch zur Datenverarbeitung</li>
              <li>Einschränkung</li>
            </ul>
            <p>
              Wenn sie vermuten, dass im Zuge der Verarbeitung Ihrer Daten Verstöße gegen das Datenschutzrecht passiert sind, 
              so haben Sie die Möglichkeit sich bei uns ({emailName}@{emailDomain}) oder der Datenschutzbehörde zu beschweren.
            </p>

            <p className="mt-8">
              Quelle: <a 
                href="https://www.fairesrecht.at/kostenlos-datenschutzerklaerung-erstellen-generator.php" 
                className="text-blue-600 hover:text-blue-800"
              >
                Datenschutzgenerator Österreich DSGVO
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
