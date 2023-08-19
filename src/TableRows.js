// TableRows.js

import React from 'react';

const TableRows = ({ fis }) => {
  return (
    <tr>
      <td>{fis.tarih.toDateString()}</td>
      <td>{fis.no}</td>
      <td>{fis.kimden}</td>
      <td>{fis.tur}</td>
      <td>{fis.tutar}</td>
      <td>
        <button className="updatebutton" id="updatebtn" data-doc={fis._id}>
          <a href={`/update/${fis._id}`}>
            <i className="fa fa-pencil-square-o"></i>
          </a>
        </button>
        <button className="deletebutton" id="deletebtn" data-doc={fis._id}>
          <i className="fa fa-trash-o"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRows;
