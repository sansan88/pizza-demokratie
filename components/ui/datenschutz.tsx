import React from 'react';

const Datenschutz = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Datenschutzerklärung</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mt-4 mb-2">1. Datenschutz auf einen Blick</h2>
        <h3 className="text-lg font-semibold mt-3 mb-1">Allgemeine Hinweise</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mt-4 mb-2">2. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3 className="text-lg font-semibold mt-3 mb-1">Datenschutz</h3>
        <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mt-4 mb-2">3. Datenerfassung auf dieser Website</h2>
        <h3 className="text-lg font-semibold mt-3 mb-1">Cookies</h3>
        <p>Wir verwenden keine Cookies auf unserer Webseite.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mt-4 mb-2">4. Analyse-Tools und Tools von Drittanbietern</h2>
        <p>Unsere Webseite nutzt keine Analyse-Tools oder Tools von Drittanbietern.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mt-4 mb-2">5. Formular-Daten</h2>
        <p>Wenn Sie unseren Rechner nutzen, können Sie Ihre E-Mail Adresse eigeben um sich für einen Newsletter, Mehr Informationen oder eine Offerte zu registrieren. Die Eingabe der E-Mail Adresse ist für die Verwendugn des Rechners nicht notwendig. Wir speichern Ihre E-Mail Adresse nicht auf einem Drittsystem und Sie können sich jederzeit via info@pizza-demokratie.ch bei uns melden um Ihre Daten zu löschen.</p>
      </section>

      <p className="mt-4">Letzte Aktualisierung: 10.09.2024</p>
    </div>
  );
};

export default Datenschutz;