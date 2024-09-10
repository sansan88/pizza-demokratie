import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-8 py-4 bg-gray-100 text-center text-sm text-gray-600">
      <p>Made with ❤️ by Pizza Demokratie Team</p>
      <p>&copy; {currentYear} pizza-demokratie.ch. Alle Rechte vorbehalten.</p>
      <p>
        <Link href="/impressum" className="text-blue-600 hover:underline">
          Impressum
        </Link> |
        <Link href="/datenschutz" className="text-blue-600 hover:underline ml-2">
          Datenschutz
        </Link>
      </p>
    </footer>
  );
};

export default Footer;