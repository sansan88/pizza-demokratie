// pages/impressum.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/ui/footer';
import "../app/globals.css";

const Impressum = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <img src="/images/pizza.png" alt="Democracy Watch Logo" className="h-8 w-8" />
              <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Democracy Watch</h1>
            </a>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Impressum</h1>
          <p className="text-xl">Rechtliche Informationen zu Democracy Watch</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardContent className="space-y-6 p-6">
            {/* Fügen Sie hier den Inhalt des Impressums ein */}
            <h2 className="text-2xl font-semibold">Angaben gemäss Schweizer Recht</h2>

            <section>
              <h3 className="text-lg font-semibold mb-2">Verantwortlich für den Inhalt:</h3>
              <p>IG Democracy Watch</p>
              <p>c/o liitu consulting gmbh</p>
              <p>Villenstrasse 4</p>
              <p>CH-8200 Schaffhausen</p>
              <p>Schweiz</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Kontakt:</h3>
              <p>Telefon: +41 79 403 36 13</p>
              <p>E-Mail: info@democracy-watch.ch</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Haftungsausschluss:</h3>
              <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Urheberrecht:</h3>
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Datenschutz:</h3>
              <p>Informationen zur Erhebung und Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung.</p>
            </section>

            <p className="text-sm text-gray-500 mt-6">Letzte Aktualisierung: 10.09.2024</p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;