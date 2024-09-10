'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Footer from '@/components/ui/footer';

type CantonKeys =
    'ZH' | 'BE' | 'LU' | 'UR' | 'SZ' | 'OW' | 'NW' | 'GL' | 'ZG' | 'FR' |
    'SO' | 'BS' | 'BL' | 'SH' | 'AR' | 'AI' | 'SG' | 'GR' | 'AG' | 'TG' |
    'TI' | 'VD' | 'VS' | 'NE' | 'GE' | 'JU';

const cantonData: Record<CantonKeys, {
    name: string;
    population: number;
    eligibleVoters: number;
    initiative: number;
    referendum: number;
    active: boolean;
    cities: { name: string; population: number; eligibleVoters: number; initiative: number; referendum: number; active: boolean }[];
}> = {
    'ZH': {
        name: 'Zürich',
        population: 1539275,
        eligibleVoters: 1026700,
        initiative: 6000,
        referendum: 3000,
        active: true,
        cities: [
            { name: 'Zürich', population: 415367, eligibleVoters: 277000, initiative: 3000, referendum: 2000, active: true },
            { name: 'Winterthur', population: 111851, eligibleVoters: 74600, initiative: 1000, referendum: 800, active: false },
            { name: 'Uster', population: 35000, eligibleVoters: 23300, initiative: 800, referendum: 600, active: false }
        ]
    },
    'SH': {
        name: 'Schaffhausen',
        population: 82348,
        eligibleVoters: 52330,
        initiative: 1000,
        referendum: 800,
        active: true,
        cities: [
            { name: 'Schaffhausen', population: 36000, eligibleVoters: 22900, initiative: 800, referendum: 600, active: true },
            { name: 'Neuhausen am Rheinfall', population: 10000, eligibleVoters: 6350, initiative: 400, referendum: 300, active: false },
            { name: 'Stein am Rhein', population: 3400, eligibleVoters: 2160, initiative: 200, referendum: 150, active: false }
        ]
    },
    'VD': {
        name: 'Waadt',
        population: 805098,
        eligibleVoters: 537000,
        initiative: 12000,
        referendum: 12000,
        active: false,
        cities: [
            { name: 'Lausanne', population: 139111, eligibleVoters: 92700, initiative: 2000, referendum: 2000, active: false },
            { name: 'Yverdon-les-Bains', population: 30143, eligibleVoters: 20100, initiative: 1000, referendum: 1000, active: false },
            { name: 'Montreux', population: 26574, eligibleVoters: 17700, initiative: 800, referendum: 800, active: false }
        ]
    },
    'BE': {
        name: 'Bern',
        population: 1034977,
        eligibleVoters: 690200,
        initiative: 15000,
        referendum: 10000,
        active: true,
        cities: [
            { name: 'Bern', population: 133883, eligibleVoters: 89200, initiative: 2000, referendum: 1500, active: true },
            { name: 'Biel', population: 55000, eligibleVoters: 36700, initiative: 1000, referendum: 800, active: false },
            { name: 'Thun', population: 43500, eligibleVoters: 29000, initiative: 800, referendum: 600, active: false }
        ]
    },
    'LU': {
        name: 'Luzern',
        population: 413120,
        eligibleVoters: 275600,
        initiative: 4000,
        referendum: 3000,
        active: false,
        cities: [
            { name: 'Luzern', population: 81500, eligibleVoters: 54300, initiative: 1500, referendum: 1000, active: false },
            { name: 'Emmen', population: 30000, eligibleVoters: 20000, initiative: 800, referendum: 600, active: false },
            { name: 'Kriens', population: 27000, eligibleVoters: 18000, initiative: 700, referendum: 500, active: false }
        ]
    },
    'UR': {
        name: 'Uri',
        population: 36703,
        eligibleVoters: 24500,
        initiative: 600,
        referendum: 450,
        active: false,
        cities: [
            { name: 'Altdorf', population: 9400, eligibleVoters: 6300, initiative: 300, referendum: 200, active: false },
            { name: 'Bürglen', population: 4000, eligibleVoters: 2700, initiative: 200, referendum: 150, active: false },
            { name: 'Schattdorf', population: 5300, eligibleVoters: 3500, initiative: 250, referendum: 180, active: false }
        ]
    },
    'SZ': {
        name: 'Schwyz',
        population: 160480,
        eligibleVoters: 107000,
        initiative: 2000,
        referendum: 1000,
        active: false,
        cities: [
            { name: 'Schwyz', population: 14900, eligibleVoters: 9900, initiative: 500, referendum: 250, active: false },
            { name: 'Freienbach', population: 16000, eligibleVoters: 10700, initiative: 550, referendum: 275, active: false },
            { name: 'Einsiedeln', population: 15000, eligibleVoters: 10000, initiative: 525, referendum: 260, active: false }
        ]
    },
    'OW': {
        name: 'Obwalden',
        population: 37930,
        eligibleVoters: 25300,
        initiative: 500,
        referendum: 100,
        active: false,
        cities: [
            { name: 'Sarnen', population: 10000, eligibleVoters: 6700, initiative: 200, referendum: 50, active: false },
            { name: 'Kerns', population: 6200, eligibleVoters: 4100, initiative: 150, referendum: 30, active: false },
            { name: 'Alpnach', population: 5900, eligibleVoters: 3900, initiative: 140, referendum: 28, active: false }
        ]
    },
    'NW': {
        name: 'Nidwalden',
        population: 43087,
        eligibleVoters: 28700,
        initiative: 500,
        referendum: 250,
        active: false,
        cities: [
            { name: 'Stans', population: 8000, eligibleVoters: 5300, initiative: 150, referendum: 75, active: false },
            { name: 'Hergiswil', population: 5700, eligibleVoters: 3800, initiative: 120, referendum: 60, active: false },
            { name: 'Buochs', population: 5500, eligibleVoters: 3700, initiative: 115, referendum: 58, active: false }
        ]
    },
    'GL': {
        name: 'Glarus',
        population: 40590,
        eligibleVoters: 27100,
        initiative: 1,
        referendum: 1,
        active: false,
        cities: [
            { name: 'Glarus', population: 12500, eligibleVoters: 8300, initiative: 1, referendum: 1, active: false },
            { name: 'Glarus Nord', population: 18000, eligibleVoters: 12000, initiative: 1, referendum: 1, active: false },
            { name: 'Glarus Süd', population: 9700, eligibleVoters: 6500, initiative: 1, referendum: 1, active: false }
        ]
    },
    'ZG': {
        name: 'Zug',
        population: 127642,
        eligibleVoters: 85100,
        initiative: 2000,
        referendum: 1500,
        active: false,
        cities: [
            { name: 'Zug', population: 30500, eligibleVoters: 20300, initiative: 700, referendum: 525, active: false },
            { name: 'Baar', population: 24000, eligibleVoters: 16000, initiative: 600, referendum: 450, active: false },
            { name: 'Cham', population: 16000, eligibleVoters: 10700, initiative: 450, referendum: 340, active: false }
        ]
    },
    'FR': {
        name: 'Freiburg',
        population: 321783,
        eligibleVoters: 214500,
        initiative: 6000,
        referendum: 6000,
        active: false,
        cities: [
            { name: 'Freiburg', population: 38000, eligibleVoters: 25300, initiative: 1200, referendum: 1200, active: false },
            { name: 'Bulle', population: 23000, eligibleVoters: 15300, initiative: 800, referendum: 800, active: false },
            { name: 'Villars-sur-Glâne', population: 12000, eligibleVoters: 8000, initiative: 500, referendum: 500, active: false }
        ]
    },
    'SO': {
        name: 'Solothurn',
        population: 275247,
        eligibleVoters: 183500,
        initiative: 3000,
        referendum: 1500,
        active: false,
        cities: [
            { name: 'Solothurn', population: 16700, eligibleVoters: 11100, initiative: 600, referendum: 300, active: false },
            { name: 'Olten', population: 18000, eligibleVoters: 12000, initiative: 650, referendum: 325, active: false },
            { name: 'Grenchen', population: 16500, eligibleVoters: 11000, initiative: 600, referendum: 300, active: false }
        ]
    },
    'BS': {
        name: 'Basel-Stadt',
        population: 195844,
        eligibleVoters: 130600,
        initiative: 3000,
        referendum: 2000,
        active: true,
        cities: [
            { name: 'Basel', population: 170000, eligibleVoters: 113300, initiative: 2500, referendum: 1800, active: true },
            { name: 'Riehen', population: 20000, eligibleVoters: 13300, initiative: 600, referendum: 400, active: false },
            { name: 'Bettingen', population: 1200, eligibleVoters: 800, initiative: 100, referendum: 80, active: false }
        ]
    },
    'BL': {
        name: 'Basel-Landschaft',
        population: 289468,
        eligibleVoters: 193000,
        initiative: 1500,
        referendum: 1500,
        active: false,
        cities: [
            { name: 'Liestal', population: 14200, eligibleVoters: 9500, initiative: 300, referendum: 300, active: false },
            { name: 'Allschwil', population: 20500, eligibleVoters: 13700, initiative: 400, referendum: 400, active: false },
            { name: 'Reinach', population: 18700, eligibleVoters: 12500, initiative: 375, referendum: 375, active: false }
        ]
    },
    'AR': {
        name: 'Appenzell Ausserrhoden',
        population: 55234,
        eligibleVoters: 36800,
        initiative: 300,
        referendum: 300,
        active: false,
        cities: [
            { name: 'Herisau', population: 15000, eligibleVoters: 10000, initiative: 150, referendum: 150, active: false },
            { name: 'Teufen', population: 6000, eligibleVoters: 4000, initiative: 75, referendum: 75, active: false },
            { name: 'Speicher', population: 4200, eligibleVoters: 2800, initiative: 60, referendum: 60, active: false }
        ]
    },
    'AI': {
        name: 'Appenzell Innerrhoden',
        population: 16145,
        eligibleVoters: 10800,
        initiative: 1,
        referendum: 200,
        active: false,
        cities: [
            { name: 'Appenzell', population: 5800, eligibleVoters: 3900, initiative: 1, referendum: 100, active: false },
            { name: 'Oberegg', population: 1900, eligibleVoters: 1300, initiative: 1, referendum: 50, active: false },
            { name: 'Rüte', population: 3500, eligibleVoters: 2300, initiative: 1, referendum: 75, active: false }
        ]
    },
    'SG': {
        name: 'St. Gallen',
        population: 510734,
        eligibleVoters: 340500,
        initiative: 6000,
        referendum: 4000,
        active: false,
        cities: [
            { name: 'St. Gallen', population: 75000, eligibleVoters: 50000, initiative: 1500, referendum: 1000, active: false },
            { name: 'Rapperswil-Jona', population: 26000, eligibleVoters: 17300, initiative: 800, referendum: 550, active: false },
            { name: 'Wil', population: 23000, eligibleVoters: 15300, initiative: 750, referendum: 500, active: false }
        ]
    },
    'GR': {
        name: 'Graubünden',
        population: 199021,
        eligibleVoters: 132700,
        initiative: 3000,
        referendum: 1500,
        active: false,
        cities: [
            { name: 'Chur', population: 35000, eligibleVoters: 23300, initiative: 900, referendum: 450, active: false },
            { name: 'Davos', population: 11000, eligibleVoters: 7300, initiative: 400, referendum: 200, active: false },
            { name: 'Landquart', population: 8800, eligibleVoters: 5900, initiative: 350, referendum: 175, active: false }
        ]
    },
    'AG': {
        name: 'Aargau',
        population: 685845,
        eligibleVoters: 457200,
        initiative: 3000,
        referendum: 3000,
        active: false,
        cities: [
            { name: 'Aarau', population: 21000, eligibleVoters: 14000, initiative: 500, referendum: 500, active: false },
            { name: 'Baden', population: 19000, eligibleVoters: 12700, initiative: 450, referendum: 450, active: false },
            { name: 'Wettingen', population: 20000, eligibleVoters: 13300, initiative: 475, referendum: 475, active: false }
        ]
    },
    'TG': {
        name: 'Thurgau',
        population: 279547,
        eligibleVoters: 186400,
        initiative: 4000,
        referendum: 2000,
        active: false,
        cities: [
            { name: 'Frauenfeld', population: 25000, eligibleVoters: 16700, initiative: 800, referendum: 400, active: false },
            { name: 'Kreuzlingen', population: 21000, eligibleVoters: 14000, initiative: 700, referendum: 350, active: false },
            { name: 'Arbon', population: 14000, eligibleVoters: 9300, initiative: 500, referendum: 250, active: false }
        ]
    },
    'TI': {
        name: 'Tessin',
        population: 350986,
        eligibleVoters: 234000,
        initiative: 7000,
        referendum: 7000,
        active: false,
        cities: [
            { name: 'Lugano', population: 62000, eligibleVoters: 41300, initiative: 2000, referendum: 2000, active: false },
            { name: 'Bellinzona', population: 42000, eligibleVoters: 28000, initiative: 1500, referendum: 1500, active: false },
            { name: 'Locarno', population: 15000, eligibleVoters: 10000, initiative: 700, referendum: 700, active: false }
        ]
    },
    'VS': {
        name: 'Wallis',
        population: 345525,
        eligibleVoters: 230350,
        initiative: 5000,
        referendum: 3000,
        active: false,
        cities: [
            { name: 'Sion', population: 34710, eligibleVoters: 23140, initiative: 800, referendum: 500, active: false },
            { name: 'Martigny', population: 18325, eligibleVoters: 12220, initiative: 600, referendum: 400, active: false },
            { name: 'Brig-Glis', population: 13180, eligibleVoters: 8790, initiative: 500, referendum: 300, active: false }
        ]
    },
    'NE': {
        name: 'Neuenburg',
        population: 176496,
        eligibleVoters: 117660,
        initiative: 4500,
        referendum: 3000,
        active: false,
        cities: [
            { name: 'Neuenburg', population: 33355, eligibleVoters: 22240, initiative: 1000, referendum: 700, active: false },
            { name: 'La Chaux-de-Fonds', population: 37452, eligibleVoters: 24970, initiative: 1200, referendum: 800, active: false },
            { name: 'Le Locle', population: 10320, eligibleVoters: 6880, initiative: 500, referendum: 300, active: false }
        ]
    },
    'GE': {
        name: 'Genf',
        population: 499480,
        eligibleVoters: 332990,
        initiative: 8000,
        referendum: 5000,
        active: false,
        cities: [
            { name: 'Genf', population: 201818, eligibleVoters: 134550, initiative: 3000, referendum: 2000, active: false },
            { name: 'Vernier', population: 35132, eligibleVoters: 23420, initiative: 1000, referendum: 700, active: false },
            { name: 'Lancy', population: 33000, eligibleVoters: 22000, initiative: 900, referendum: 600, active: false }
        ]
    },
    'JU': {
        name: 'Jura',
        population: 73584,
        eligibleVoters: 49060,
        initiative: 2000,
        referendum: 1000,
        active: false,
        cities: [
            { name: 'Delsberg', population: 12500, eligibleVoters: 8330, initiative: 500, referendum: 300, active: false },
            { name: 'Pruntrut', population: 6700, eligibleVoters: 4470, initiative: 300, referendum: 200, active: false },
            { name: 'Bassecourt', population: 3500, eligibleVoters: 2330, initiative: 200, referendum: 100, active: false }
        ]
    }
};

// Farbschemata definieren
const colorSchemes: Record<CantonKeys | 'default' | 'national' | 'kantonal', { primary: string; secondary: string }> = {
    default: { primary: '#111827', secondary: '#374151' },
    national: { primary: '#D50000', secondary: '#FF1744' },
    kantonal: { primary: '#1E88E5', secondary: '#42A5F5' },
    'ZH': { primary: '#0F62FE', secondary: '#78A9FF' },
    'BE': { primary: '#FF0000', secondary: '#FFED00' },
    'LU': { primary: '#0000FF', secondary: '#FFFFFF' },
    'UR': { primary: '#FFCC00', secondary: '#000000' },
    'SZ': { primary: '#FF0000', secondary: '#FFFFFF' },
    'OW': { primary: '#FF0000', secondary: '#FFFFFF' },
    'NW': { primary: '#FF0000', secondary: '#FFFFFF' },
    'GL': { primary: '#FF0000', secondary: '#000000' },
    'ZG': { primary: '#FFFFFF', secondary: '#76B2DD' },
    'FR': { primary: '#000000', secondary: '#FFFFFF' },
    'SO': { primary: '#FF0000', secondary: '#FFFFFF' },
    'BS': { primary: '#000000', secondary: '#FFFFFF' },
    'BL': { primary: '#FF0000', secondary: '#FFFFFF' },
    'SH': { primary: '#000000', secondary: '#FFFF00' },
    'AR': { primary: '#000000', secondary: '#FFFFFF' },
    'AI': { primary: '#000000', secondary: '#FFFFFF' },
    'SG': { primary: '#00FF00', secondary: '#FFFFFF' },
    'GR': { primary: '#4B4B4B', secondary: '#A8A8A8' },
    'AG': { primary: '#0000FF', secondary: '#000000' },
    'TG': { primary: '#00FF00', secondary: '#FFFFFF' },
    'TI': { primary: '#FF0000', secondary: '#0000FF' },
    'VD': { primary: '#00FF00', secondary: '#FFFFFF' },
    'VS': { primary: '#FF0000', secondary: '#FFFFFF' },
    'NE': { primary: '#00FF00', secondary: '#FFFFFF' },
    'GE': { primary: '#FF0000', secondary: '#FFFF00' },
    'JU': { primary: '#FF0000', secondary: '#FFFFFF' }
};

// Wappen-Pfade definieren (ersetzen Sie dies durch die tatsächlichen Pfade zu Ihren Bildern)
const coatOfArms = {
    default: './images/pizza.png',
    national: '/images/swiss.svg',
    kantonal: {
        'ZH': '/images/zh.svg',
        'BE': '/images/be.svg',
        'SH': '/images/sh.svg',
        'VD': '/images/vd.svg',
        'VS': '/images/pizza.png',
        'GE': '/images/pizza.png',
        'NE': '/images/pizza.png',
        'JU': '/images/pizza.png',
        'LU': '/images/pizza.png',
        'UR': '/images/pizza.png',
        'SZ': '/images/pizza.png',
        'OW': '/images/pizza.png',
        'NW': '/images/pizza.png',
        'GL': '/images/pizza.png',
        'ZG': '/images/pizza.png',
        'FR': '/images/pizza.png',
        'SO': '/images/pizza.png',
        'BS': '/images/pizza.png',
        'BL': '/images/pizza.png',
        'AR': '/images/pizza.png',
        'AI': '/images/pizza.png',
        'SG': '/images/pizza.png',
        'GR': '/images/pizza.png',
        'AG': '/images/pizza.png',
        'TG': '/images/pizza.png',
        'TI': '/images/pizza.png',
    },
};

const productOptions = [
    { id: 'basic', name: 'Nur Unterschriften', description: 'Basispaket für die Unterschriftensammlung', pricePerSignature: 2.5 },
    { id: 'authenticated', name: 'Mit Beglaubigung', description: 'Inkl. Beglaubigung der gesammelten Unterschriften', pricePerSignature: 4.0 },
    { id: 'fullService', name: 'Full Service', description: 'Komplettpaket mit Echtheitsgarantie', pricePerSignature: 7.5 },
];


const PizzaDemokratieCalculator = () => {
    const [level, setLevel] = useState('');
    const [canton, setCanton] = useState<CantonKeys | ''>('');
    const [city, setCity] = useState('');
    const [product, setProduct] = useState('authenticated');
    const [pricePerSignature, setPricePerSignature] = useState(4.0);

    const [expressDelivery, setExpressDelivery] = useState(false);
    const [basePrice, setBasePrice] = useState(0);
    const [voterSurcharge, setVoterSurcharge] = useState(0);
    const [expressSurcharge, setExpressSurcharge] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [signatures, setSignatures] = useState(0);
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [isServiceAvailable, setIsServiceAvailable] = useState(true);

    const [colorScheme, setColorScheme] = useState(colorSchemes.default);

    // const [initiativeType, setInitiativeType] = useState('initiative');
    const [initiativeType, setInitiativeType] = useState<'initiative' | 'referendum'>('initiative');

    const [currentCoatOfArms, setCurrentCoatOfArms] = useState(coatOfArms.default);

    const getStepNumber = (currentStep: string) => {
        if (!level) {
            switch (currentStep) {
                case 'level':
                    return 1;
                case 'initiativeType':
                    return 2;
                case 'product':
                    return 3;
                default:
                    return 1;
            }
        }

        if (level === 'national') return currentStep === 'level' ? 1 : currentStep === 'initiativeType' ? 2 : 3;
        if (level === 'kantonal') return currentStep === 'level' ? 1 : currentStep === 'canton' ? 2 : currentStep === 'initiativeType' ? 3 : 4;
        if (level === 'kommunal') return currentStep === 'level' ? 1 : currentStep === 'canton' ? 2 : currentStep === 'city' ? 3 : currentStep === 'initiativeType' ? 4 : 5;
        return 1; // Fallback
    };
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsEmailValid(isValidEmail(newEmail));
    };
    const [isEmailValid, setIsEmailValid] = useState(false);

    // Funktion zur Generierung eines eindeutigen Klassennamens basierend auf der Farbe
    const getColorClass = (color: string, prefix: string) => {
        return `${prefix}-[${color.replace('#', '')}]`;
    };

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

    useEffect(() => {
        // Set the default product to 'authenticated' (second option)
        setProduct('authenticated');
    }, []);
    useEffect(() => {
        if (level !== 'kommunal') {
            setCity('');
        }
    }, [level]);

    useEffect(() => {
        if (level === 'national') {
            setColorScheme(colorSchemes.national);
            setCurrentCoatOfArms(coatOfArms.national);
        } else if ((level === 'kantonal' || level === 'kommunal') && canton) {
            setColorScheme(colorSchemes[canton as CantonKeys] || colorSchemes.kantonal);
            setCurrentCoatOfArms(coatOfArms.kantonal[canton as CantonKeys] || coatOfArms.default);
        } else {
            setColorScheme(colorSchemes.default);
            setCurrentCoatOfArms(coatOfArms.default);
        }
    }, [level, canton]);

    useEffect(() => {
        if (level === 'national') {
            setIsServiceAvailable(true);
        } else if (canton) {
            const cantonIsActive = cantonData[canton].active;

            const cityIsActive = level === 'kommunal' ? cantonData[canton].cities.find(c => c.name === city)?.active : true;
            setIsServiceAvailable(!!(cantonIsActive && cityIsActive));
        }
    }, [level, canton, city]);

    // Neuer useEffect-Hook für die dynamische Anpassung der Ring-Farbe
    useEffect(() => {
        document.documentElement.style.setProperty('--tw-ring-color', colorScheme.primary, '!important');
    }, [colorScheme]);

    useEffect(() => {
        const selectedProduct = productOptions.find(p => p.id === product);
        if (selectedProduct) {
            setPricePerSignature(selectedProduct.pricePerSignature);
        }
    }, [product]);

    useEffect(() => {
        if (level) {
            let baseSignatures;
            let population;
            let eligibleVoters;

            if (level === 'national') {
                baseSignatures = initiativeType === 'initiative' ? 100000 : 50000;
                eligibleVoters = Object.values(cantonData).reduce((sum, canton) => sum + canton.eligibleVoters, 0);
                population = Object.values(cantonData).reduce((sum, canton) => sum + canton.population, 0);
            } else if (level === 'kantonal' && canton) {
                // baseSignatures = cantonData[canton][initiativeType];
                baseSignatures = cantonData[canton][initiativeType as 'initiative' | 'referendum'];
                eligibleVoters = cantonData[canton].eligibleVoters;
                population = cantonData[canton].population;
            } else if (level === 'kommunal' && canton && city) {
                const selectedCity = cantonData[canton].cities.find(c => c.name === city);
                if (selectedCity) {
                    baseSignatures = selectedCity[initiativeType as 'initiative' | 'referendum'];
                    eligibleVoters = selectedCity.eligibleVoters;
                    population = selectedCity.population;
                } else {
                    return; // Stadt nicht gefunden, Berechnung abbrechen
                }
            } else {
                return; // Nicht genug Informationen für Berechnung
            }

            const calculatedSignatures = Math.min(baseSignatures, eligibleVoters * 0.1);
            setSignatures(Math.ceil(calculatedSignatures));

            const calculatedBasePrice = calculatedSignatures * pricePerSignature;
            setBasePrice(Math.round(calculatedBasePrice));

            // Calculate voter surcharge
            const ratio = eligibleVoters / population;
            const surchargePercentage = (1 - ratio) * 100;
            const calculatedVoterSurcharge = calculatedBasePrice * (surchargePercentage / 100);
            setVoterSurcharge(Math.round(calculatedVoterSurcharge));

            // Calculate express surcharge
            const calculatedExpressSurcharge = expressDelivery ? calculatedBasePrice * 0.5 : 0;
            setExpressSurcharge(Math.round(calculatedExpressSurcharge));

            // Calculate total price
            const calculatedTotalPrice = calculatedBasePrice + calculatedVoterSurcharge + calculatedExpressSurcharge;
            setTotalPrice(Math.round(calculatedTotalPrice));
        } else {
            setSignatures(0);
            setBasePrice(0);
            setVoterSurcharge(0);
            setExpressSurcharge(0);
            setTotalPrice(0);
        }
    }, [level, canton, city, initiativeType, product, expressDelivery, pricePerSignature]);

    /*const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (isServiceAvailable) {
            console.log('Sending quote to email:', email);
            if (newsletter) {
                console.log('Subscribing to newsletter');
            }
            // Here you would typically send this data to your backend
        }
    };*/
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isServiceAvailable) {
            const message = `Ihre Offerte:
            Ebene: ${level}
            Kanton: ${canton}
            Stadt: ${city}
            Typ: ${initiativeType}
            Produkt: ${product}
            Expresslieferung: ${expressDelivery ? 'Ja' : 'Nein'}
            Gesamtpreis: ${totalPrice} CHF`;

            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, message, newsletter }),
                });

                if (response.ok) {
                    alert('Offerte wurde erfolgreich gesendet!');
                } else {
                    throw new Error('Failed to send email');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Es gab einen Fehler beim Senden der Offerte. Bitte versuchen Sie es später erneut.');
            }
        }
    };

    /*const handleNotifyMe = () => {
        console.log('Notify me when service is available in:', level === 'national' ? 'Switzerland' : canton, level === 'kommunal' ? city : '');
        // Here you would typically send this data to your backend
    };*/
    const handleNotifyMe = async () => {
        const location = level === 'national' ? 'Switzerland' : level === 'kommunal' ? `${city}, ${canton}` : canton;
        const message = `Bitte benachrichtigen Sie mich, wenn der Service verfügbar ist in: ${location}`;

        try {
            const response = await fetch('/api/send-email-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message, newsletter: false }),
            });
            console.log(response.status)

            if (response.ok) {
                alert('Wir werden Sie benachrichtigen, sobald der Service verfügbar ist!');
            } else {
                throw new Error('Failed to send notification request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Es gab einen Fehler bei der Verarbeitung Ihrer Anfrage. Bitte versuchen Sie es später erneut.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src="/images/pizza.png" alt="Pizza Logo" className="h-8 w-8" />
                        <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Pizza Demokratie</h1>
                    </div>
                    <img src={currentCoatOfArms} alt="Wappen" className={`h-10 transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
                </div>
            </header>

            <div className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-gray-700 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Berechnen Sie die Kosten für Ihr Volksbegehren</h2>
                    <p className="text-xl">Unser innovativer Rechner ermöglicht es Ihnen, schnell und einfach die Kosten für Ihr demokratisches Anliegen zu ermitteln.</p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <Card className="w-full max-w-2xl mx-auto shadow-lg" style={{ borderColor: colorScheme.secondary }}>
                    <CardContent className="space-y-6 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label>Schritt {getStepNumber('level')}: Wo möchtest du dein Volksbegehren lancieren?</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setLevel(value);
                                        if (value === 'national') {
                                            setCanton('');
                                            setCity('');
                                        } else if (value === 'kantonal') {
                                            setCity('');
                                        }
                                        // Wenn auf 'kommunal' gewechselt wird, behalten wir den Kanton bei und setzen nur die Stadt zurück
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Wähle die Ebene" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="national">National</SelectItem>
                                        <SelectItem value="kantonal">Kantonal</SelectItem>
                                        <SelectItem value="kommunal">Kommunal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(level === 'kantonal' || level === 'kommunal') && (
                                <div>
                                    <Label>Schritt {getStepNumber('canton')}: In welchem Kanton?</Label>
                                    <Select onValueChange={(value) => { setCanton(value as CantonKeys); setCity(''); }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Wähle deinen Kanton" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(cantonData).map(([code, data]) => (
                                                <SelectItem
                                                    key={code}
                                                    value={code}
                                                    active={data.active}
                                                >
                                                    {data.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {level === 'kommunal' && canton && (
                                <div>
                                    <Label>Schritt {getStepNumber('city')}: In welcher Stadt?</Label>
                                    <Select onValueChange={setCity}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Wähle deine Stadt" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cantonData[canton].cities.map((city) => (
                                                <SelectItem
                                                    key={city.name}
                                                    value={city.name}
                                                    active={city.active}
                                                >
                                                    {city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {!isServiceAvailable && (level === 'national' || canton) && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        In diesem {level === 'kommunal' ? 'Ort' : level === 'kantonal' ? 'Kanton' : 'Land'} ist der Service leider noch nicht verfügbar.
                                    </AlertDescription>
                                    <Button onClick={handleNotifyMe} className="mt-2">
                                        Bitte informieren Sie mich, wenn der Service verfügbar ist
                                    </Button>
                                </Alert>
                            )}

                            <div>
                                <Label>Schritt {getStepNumber('initiativeType')}: Wähle die Art des Volksbegehrens aus:</Label>

                                <RadioGroup onValueChange={(value) => setInitiativeType(value as 'initiative' | 'referendum')} value={initiativeType}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="initiative" id="initiative" />
                                        <Label htmlFor="initiative">Initiative</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="referendum" id="referendum" />
                                        <Label htmlFor="referendum">Referendum</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                <Label className="text-lg font-semibold mb-4 block">Schritt {getStepNumber('product')}: Wähle dein Produkt</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {productOptions.map((option, index) => (
                                        <Card
                                            key={option.id}
                                            className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${product === option.id
                                                ? `ring-2 ring-offset-2 ${getColorClass(colorScheme.primary, 'ring')} ${getColorClass(colorScheme.secondary, 'bg')} bg-opacity-20 transform scale-105`
                                                : 'hover:bg-gray-50'
                                                }`}
                                            onClick={() => setProduct(option.id)}
                                        >
                                            <CardHeader>
                                                <CardTitle className={`text-lg ${index === 1 ? getColorClass(colorScheme.primary, 'text') : ''}`}>
                                                    {option.name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm mb-2">{option.description}</p>
                                                <p className={`text-xl font-bold ${getColorClass(colorScheme.primary, 'text')}`}>
                                                    CHF {option.pricePerSignature.toFixed(2)}
                                                </p>
                                                <p className="text-xs text-gray-500">pro Unterschrift</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="express"
                                    checked={expressDelivery}
                                    onCheckedChange={(checked) => setExpressDelivery(checked === true)}
                                />
                                <Label htmlFor="express">Expresslieferung (innerhalb eines Monats)</Label>
                            </div>

                            <div className="mt-6 p-4 bg-gray-100 rounded-md">
                                <h3 className="text-lg font-semibold mb-2">Zusammenfassung:</h3>
                                <p>Benötigte Unterschriften: {signatures > 0 ? signatures.toLocaleString() : '-'}</p>
                                <p>Preis pro Unterschrift: CHF {pricePerSignature.toFixed(2)}</p>
                                <p>Basispreis: {basePrice > 0 ? basePrice.toLocaleString() + ' CHF' : '-'}</p>
                                <p>Zuschlag für Stimmberechtigte: {voterSurcharge > 0 ? voterSurcharge.toLocaleString() + ' CHF' : '-'}</p>
                                {expressDelivery && (
                                    <>
                                        <p>Expresslieferung: Ja</p>
                                        <p>Zuschlag für Expresslieferung: {expressSurcharge > 0 ? expressSurcharge.toLocaleString() + ' CHF' : '-'}</p>
                                    </>
                                )}
                                <p className="text-xl font-bold mt-2">Gesamtpreis: {totalPrice > 0 ? totalPrice.toLocaleString() + ' CHF' : '-'}</p>
                            </div>
                            <div>
                                <Label htmlFor="email">E-Mail für Offerte</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                {email && !isEmailValid && (
                                    <p className="text-red-500 text-sm mt-1">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="newsletter"
                                    checked={newsletter}
                                    onCheckedChange={(checked) => setNewsletter(checked === true)}
                                />
                                <Label htmlFor="newsletter">Für Newsletter anmelden</Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-3 text-lg font-semibold transition-all duration-300 hover:shadow-lg"
                                style={{
                                    backgroundColor: colorScheme.primary,
                                    color: 'white',
                                }}
                                disabled={!isServiceAvailable || !level || (level !== 'national' && !canton) || (level === 'kommunal' && !city) || !product || !isEmailValid}
                            >
                                Offerte anfordern
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
};

export default PizzaDemokratieCalculator;