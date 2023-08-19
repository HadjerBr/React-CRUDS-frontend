

import React from 'react';
// import Head from './partials/Head';
// import Header from './partials/Header';
import AlertMessage from './AlertMessage';
import TableRows from './TableRows';
import Footer from './Footer';

const EskiFislerPage = ({ fisler, message }) => {
  return (
    <html>
      
      <body>
        
        <section className="eski-fisler-sayfa">
          <h3>Eski Fisler Tablosu</h3>
          {message && <AlertMessage message={message} />}
          <form action="/" method="post" className="searchCon" id="searchConIndex">
            {/* Form content */}
          </form>
          <table className="fislerTablosu1">
            <thead>
              <tr>
                {/* Table headers */}
              </tr>
            </thead>
            <tbody>
              {fisler.map(fis => (
                <TableRows key={fis._id} fis={fis} />
              ))}
            </tbody>
          </table>
          {/* Additional content */}
        </section>
        <Footer />
        {/* <script src="eskiFisler.js"></script> */}   
      </body>
    </html>
  );
};

export default EskiFislerPage;
