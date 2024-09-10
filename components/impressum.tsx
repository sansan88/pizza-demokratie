import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Impressum = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-gray-700 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Impressum</h1>
                    <p className="text-xl">Rechtliche Informationen zu Pizza Demokratie</p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <Card className="w-full max-w-2xl mx-auto shadow-lg">
                    <CardContent className="space-y-6 p-6">
                        <h2 className="text-2xl font-semibold">Angaben gemäss Schweizer Recht</h2>
                        
                        <section>
                            <h3 className="text-lg font-semibold mb-2">Verantwortlich für den Inhalt:</h3>
                            <p>IG Pizza Demokratie</p>
                            <p>c/o liitu consulting gmbh</p>
                            <p>Villenstrasse 4</p>
                            <p>CH-8200 Schaffhausen</p>
                            <p>Schweiz</p>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold mb-2">Kontakt:</h3>
                            <p>Telefon: +41 79 403 36 13</p>
                            <p>E-Mail: info@pizza-demokratie.ch</p>
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
        </div>
    );
};

export default Impressum;