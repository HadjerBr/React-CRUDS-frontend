import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 





function OldReceipts() {

  const showMessage = () => {
    
    
      const timeoutId = setTimeout(() => {
        setMessage("");
        
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    
  }


  const [fisler, setFisler] = useState([]);
  const [title, setTitle] = useState([]);
  const [message, setMessage] = useState([]);
  
  

  const fetchData =  () => {
    Axios.get('http://localhost:5000/').then(resp => {
        
        setFisler(resp.data.fisler);
        setTitle(resp.data.title);
        setMessage(resp.data.message);
    });
    
  };

  const [searchValue, setSearchValue] = useState({
    search: "",
  });

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
  };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
    
     
    
      try {
        const response = await Axios.post(`http://localhost:5000/search/`, {
          search: searchValue.search 
        });
    
        if (response.status === 200) {
          const searchData = response.data; 
          setFisler(searchData.fisler);
          setTitle(searchData.title);
          setMessage(searchData.message);
        } else {
          console.log('error');
        }
      } catch (error) {
        console.error('Error searching data:', error);
      }
    };

    

  const handleDelete = (itemId) => {
    

    Axios.delete(`http://localhost:5000/${itemId}`)
      .then(response => {
        console.log(response.data.message);
        
        setMessage(response.data.message);
        showMessage();
        showMessage();
          const timeoutId = setTimeout(() => {
            fetchData();
            
          }, 1000);
        
        
        
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
    }

  


  useEffect(() => {
    fetchData();
    showMessage();
    
  }, []);

  return (
    <section className="eski-fisler-sayfa">
      <h3>{title}</h3>
      
      
      
        <div id="success-alert" className="alert alert-success" role="alert">
          {message}
          
        </div>
       
      
      <form onSubmit={handleFormSubmit}  className="searchCon">

                    
                    <input type="text" name="search" id="search" placeholder="Search (for date: format: 2023/4/29)..." onChange={handleInputChange}></input>
                    <button id="sbmtSrch" type="submit"><FontAwesomeIcon icon={faSearch} /></button>

                </form>
     

      
      <table className="fislerTablosu1">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>No</th>
            <th>Kimden</th>
            <th>Tur</th>
            <th>Tutar</th>
            <th>Update / Delete</th>
          </tr>
        </thead>
        <tbody>
          {fisler.map((fis) => (
            <tr key={fis._id}>
              <td>{new Date(fis.tarih).toDateString()}</td>
              <td>{fis.no}</td>
              <td>{fis.kimden}</td>
              <td>{fis.tur}</td>
              <td>{fis.tutar}</td>
              <td>
                <button className="updatebutton" id="updatebtn" >
                <Link to={`/update/${fis._id}`}>
                  <FontAwesomeIcon icon={faPencilSquare} />
                  </Link>
                </button>
                <button className="deletebutton" id="deletebtn" onClick={() => handleDelete(fis._id)} >
                <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id="returnToMain"><a href="/">All Reciepts</a></button>
    </section>
  );
}

export default OldReceipts;
