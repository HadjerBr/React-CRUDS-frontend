

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer">&copy; {currentYear} Hadjer Brioua</div>
    </footer>
  );
};

export default Footer;
