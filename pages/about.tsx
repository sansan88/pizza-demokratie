import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/ui/footer';
import "../app/globals.css";


const About = () => {

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
          <h1 className="text-4xl font-bold mb-4">Über uns</h1>
          <p className="text-xl">Demokratie ist ein Grundpfeiler unserer Gesellschaft – doch wie viel kostet es eigentlich, eine Initiative oder ein Referendum in der Schweiz zu lancieren? Unser Demokratie-Kostenrechner schafft Transparenz und zeigt, mit welchen Mitteln politische Mitbestimmung erkauft werden kann. </p>
        </div>
      </div>


      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold">Unsere Mission</h2>
            <p>Democracy Watch ist eine unabhängige, gemeinnützige Organisation mit einem klaren Ziel: Transparenz in der direkten Demokratie der Schweiz schaffen. Wir glauben, dass politische Mitbestimmung für alle zugänglich sein sollte – doch in der Realität spielen oft finanzielle Mittel eine entscheidende Rolle.

              Mit unserem Demokratie-Kostenrechner machen wir sichtbar, wie Geld den Prozess der Unterschriftensammlung beeinflusst und welche Kosten hinter Initiativen und Referenden stehen. Unser Ziel ist es, kritisches Bewusstsein zu schaffen und öffentliche Debatten über Fairness und Chancengleichheit in der Politik anzuregen.

              Wir verkaufen keine Dienstleistungen und vertreten keine parteipolitischen Interessen. Stattdessen setzen wir uns dafür ein, dass die Schweizer Demokratie offen, nachvollziehbar und für alle verständlich bleibt.

            </p>
            {/* Fügen Sie hier weiteren Inhalt über Ihr Projekt ein */}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;