import React from 'react';

const AlertMessage = ({ type, message }) => {
  return (
    <div id={`${type}-alert`} className={`alert alert-${type}`} role="alert">
      <strong>{type === 'danger' ? 'Error!' : 'Success!'}</strong> {message}
    </div>
  );
};

export default AlertMessage;
