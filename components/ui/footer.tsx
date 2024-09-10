import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 py-4 bg-gray-100 text-center text-sm text-gray-600">
      <p>Made with ❤️ by Pizza Demokratie Team</p>
      <p>&copy; {currentYear} pizza-demokratie.ch. Alle Rechte vorbehalten.</p>
      <p>
        <a href="#" className="text-blue-600 hover:underline">Impressum</a> | 
        <a href="#" className="text-blue-600 hover:underline ml-2">Datenschutz</a>
      </p>
    </footer>
  );
};

export default Footer;