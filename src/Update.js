

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom'; 
import { useHistory } from 'react-router-dom';





function Update() {

  const showMessage = () => {
    
    
      const timeoutId = setTimeout(() => {
        setMessage("");
        
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    
  }
  const showSuccessMessage = () => {
    
    
      const timeoutId = setTimeout(() => {
        setMessage("");
        
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    
  }
    
    const { id } = useParams();
    const history = useHistory();
    const [fis, setFis] = useState([]);
    const [title, setTitle] = useState([]);
    const dateObject = new Date(fis.tarih);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [message, setMessage] = useState([]);
    const [successMessage, setsuccessMessage] = useState([]);

    const fetchData =  () => {
      Axios.get('https://reciepts-backend.onrender.com/update/' + id).then(resp => {
          
          setFis(resp.data.fis);
          setTitle(resp.data.title);
          
          
      });
      
    };

    const [formValues, setFormValues] = useState({
    tarih: fis.tarih,
    no: fis.no,
    kimden: fis.kimden,
    tur: fis.tur,
    tutar: fis.tutar,
  });

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
    
     
    
      try {
        const response = await Axios.post(`https://reciepts-backend.onrender.com/update/${id}`, formValues);
    
        if (response.status === 200) {
          if(response.data.message === "Error updating receipt, try again") {
            setMessage(response.data.message);
            showMessage();
          }
          else {
            setsuccessMessage(response.data.message);
            showSuccessMessage();
            const timeoutId = setTimeout(() => {
              history.push('/');
              
            }, 2000);
            
            return () => clearTimeout(timeoutId);
          }
          
        } else {
          console.log('error');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };
    
  

  


  useEffect(() => {
    fetchData();
    
  }, []);


  return (
    <section id="update_section">
      <div id='danger-alert' className="alert alert-danger">{message}</div> 
        <div id="success-alert" className="alert alert-success" role="alert">
          {successMessage}
          
        </div>
    <form className="responsive-form" id="updateForm" onSubmit={handleFormSubmit}>
      <h2 id="updateTitle">{title}</h2>
      <label htmlFor="tarih">Tarih</label>
      <input type="date" name="tarih" id="tarih"  defaultValue={formattedDate}  onChange={handleInputChange}  required />
      <label htmlFor="no">No</label>
      <input type="number" name="no" id="no" defaultValue={fis.no}  onChange={handleInputChange} required />
      <label htmlFor="kimden">Kimden</label>
      <input type="text" name="kimden" id="kimden" defaultValue={fis.kimden}  onChange={handleInputChange} required />
      <label htmlFor="tur">Tur</label>
      <select name="tur" id="tur"  onChange={handleInputChange}>
        <option >{fis.tur}</option>
        <option value="egitim" >egitim</option>
        <option value="saglik">saglik</option>
        <option value="gida">gida</option>
        <option value="giyim">giyim</option>
        <option value="kira">kira</option>
      </select>
      <label htmlFor="tutar">Tutar</label>
      <input type="number" name="tutar" id="tutar" defaultValue={fis.tutar}  onChange={handleInputChange} required />
      <div className="updateButtons">
        <button className="cancelUpdate" id="cancelupdatebtn">
          <Link to="/">Cancel</Link>
        </button>
        <button className="confirmUpdate" id="confirmupdatebtn" type="submit">
          Update
        </button>
      </div>
    </form>
  </section>
    
     

        

   
  );
}

export default Update;
