import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
 




function AddReciepts() {

  const showMessage = () => {
    // const danger = document.getElementById("danger-alert");
    
      const timeoutId = setTimeout(() => {
        setMessage("");
        
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    
  }
  const showSuccessMessage = () => {
    // const danger = document.getElementById("danger-alert");
    
      const timeoutId = setTimeout(() => {
        setMessage("");
        
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    
  }


    const [title, setTitle] = useState();
    const [message, setMessage] = useState([]);
    const [successMessage, setsuccessMessage] = useState([]);
    const history = useHistory();

    const getTitle = ()  => {
        Axios.get('https://reciepts-backend.onrender.com/add').then(resp => {

            setTitle(resp.data.title);
            setMessage(resp.data.message);
            // showMessage();
        });
    }

    const [table1Values, setTable1Values] = useState(Array.from({ length: 20 }).map(() => ({ tarih: '', no: '', kimden: '', tur: '', tutar:'' })));
    const [table2Values, setTable2Values] = useState(Array.from({ length: 20 }).map(() => ({ tarih: '', no: '', kimden: '', tur: '', tutar:'' })));
  
    const handleTable1InputChange = (index, fieldName, value) => {
      const newTable1Values = [...table1Values];
      newTable1Values[index][fieldName] = value;
      setTable1Values(newTable1Values);
    };
  
    const handleTable2InputChange = (index, fieldName, value) => {
      const newTable2Values = [...table2Values];
      newTable2Values[index][fieldName] = value;
      setTable2Values(newTable2Values);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const requestData = {
        table1: table1Values,
        table2: table2Values,
      };
      console.log('Table 1 values submitted:', table1Values);
      console.log('Table 2 values submitted:', table2Values);
      try {
        const response = await Axios.post(`https://reciepts-backend.onrender.com`, requestData);
    
        if (response.status === 200) {
          
          if(response.data.message === "Reciept could not be created. Please fill at least one row.") {
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
          setMessage(response.data.message);
          showMessage();
          
          console.log(requestData);
          console.log('error');
        }
      } catch (error) {
        
        
        console.error('Error updating data:', error);
      }
    };
    

    
    
  


    const [totals, setTotals] = useState({
      total1: '0.00',
      total2: '0.00',
      stutar: '0.00',
      gidtutar: '0.00',
      giytutar: '0.00',
      ktutar: '0.00',
      etutar: '0.00',
      toplamtutar: '0.00',
      toplamS: '0.00',
      toplamGid: '0.00',
      toplamGiy: '0.00',
      toplamK: '0.00',
      toplamE: '0.00',
      toplamAdet: '0.00',
    });

   
  
    const getTutar1 = () => {
      let total1 = 0;
      let stutar = 0;
      let gidtutar = 0;
      let giytutar = 0;
      let ktutar = 0;
      let etutar = 0;
  
      const tablo1 = document.getElementById("table1");
      for (let i = 0; i < tablo1.rows.length - 1; i++) {
        let cell = tablo1.rows[i].querySelector(".tutar input");
        let turCell = tablo1.rows[i].querySelector(".tur select");
  
        if (cell) {
          let cellValue = parseFloat(cell.value);
          if (!isNaN(cellValue)) {
            total1 += cellValue;
            if (turCell) {
              let turCellValue = turCell.value;
              if (turCellValue) {
                if (turCellValue === "saglik") {
                  stutar += cellValue;
                } else if (turCellValue === "gida") {
                  gidtutar += cellValue;
                } else if (turCellValue === "giyim") {
                  giytutar += cellValue;
                } else if (turCellValue === "kira") {
                  ktutar += cellValue;
                } else if (turCellValue === "egitim") {
                  etutar += cellValue;
                }
              }
            }
          }
        }
      }
  
      setTotals((prevTotals) => ({
        ...prevTotals,
        total1: total1.toFixed(2),
        stutar: stutar.toFixed(2),
        gidtutar: gidtutar.toFixed(2),
        giytutar: giytutar.toFixed(2),
        ktutar: ktutar.toFixed(2),
        etutar: etutar.toFixed(2),
      }));
    };
  
const getTutar2 = () => {
      let total2 = 0;
      let stutar = 0;
      let gidtutar = 0;
      let giytutar = 0;
      let ktutar = 0;
      let etutar = 0;
  
      const tablo2 = document.getElementById("table2");
      for (let i = 0; i < tablo2.rows.length - 1; i++) {
        let cell = tablo2.rows[i].querySelector(".tutar input");
        let turCell = tablo2.rows[i].querySelector(".tur select");
  
        if (cell) {
          let cellValue = parseFloat(cell.value);
          if (!isNaN(cellValue)) {
            total2 += cellValue;
            if (turCell) {
              let turCellValue = turCell.value;
              if (turCellValue) {
                if (turCellValue === "saglik") {
                  stutar += cellValue;
                } else if (turCellValue === "gida") {
                  gidtutar += cellValue;
                } else if (turCellValue === "giyim") {
                  giytutar += cellValue;
                } else if (turCellValue === "kira") {
                  ktutar += cellValue;
                } else if (turCellValue === "egitim") {
                  etutar += cellValue;
                }
              }
            }
          }
        }
      }
  
      setTotals((prevTotals) => ({
        ...prevTotals,
        total2: total2.toFixed(2),
        stutar: stutar.toFixed(2),
        gidtutar: gidtutar.toFixed(2),
        giytutar: giytutar.toFixed(2),
        ktutar: ktutar.toFixed(2),
        etutar: etutar.toFixed(2),
      }));
};

  



  
const countingTur = () => {
    const tablo1 = document.getElementById("table1");
    const tablo2 = document.getElementById("table2");
    let saglik = 0;
    let gida = 0;
    let giyim = 0;
    let kira = 0;
    let egitim = 0;
    let adet = 0;
    let stutar = 0;
    let gidtutar = 0;
    let giytutar = 0;
    let ktutar = 0;
    let etutar = 0;

    for (let i = 0; i < tablo1.rows.length - 1; i++) {
      let cell = tablo1.rows[i].querySelector(".tur select");
      let tutarCell = tablo1.rows[i].querySelector(".tutar input");

      if (cell) {
        let cellValue = cell.value;
        if (cellValue === "saglik") {
          saglik++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              stutar += tutarCellValue;
            }
          }
        } else if (cellValue === "gida") {
          gida++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              gidtutar += tutarCellValue;
            }
          }
        } else if (cellValue === "giyim") {
          giyim++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              giytutar += tutarCellValue;
            }
          }
        } else if (cellValue === "kira") {
          kira++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              ktutar += tutarCellValue;
            }
          }
        } else if (cellValue === "egitim") {
          egitim++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              etutar += tutarCellValue;
            }
          }
        }
      }
    }

    for (let i = 0; i < tablo2.rows.length - 1; i++) {
      let cell = tablo2.rows[i].querySelector(".tur select");
      let tutarCell = tablo2.rows[i].querySelector(".tutar input");

      if (cell) {
        let cellValue = cell.value;
        if (cellValue === "saglik") {
          saglik++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              stutar += tutarCellValue;
            }
          }
        } else if (cellValue === "gida") {
          gida++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              gidtutar += tutarCellValue;
            }
          }
        } else if (cellValue === "giyim") {
          giyim++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              giytutar += tutarCellValue;
            }
          }
        } else if (cellValue === "kira") {
          kira++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              ktutar += tutarCellValue;
            }
          }
        } else if (cellValue === "egitim") {
          egitim++;
          if (tutarCell) {
            let tutarCellValue = parseFloat(tutarCell.value);
            if (!isNaN(tutarCellValue)) {
              etutar += tutarCellValue;
            }
          }
        }
      }
    }

    adet = saglik + gida + giyim + kira + egitim;
    setTotals((prevTotals) => ({
      ...prevTotals,
      toplamS: saglik.toFixed(2),
      toplamGid: gida.toFixed(2),
      toplamGiy: giyim.toFixed(2),
      toplamK: kira.toFixed(2),
      toplamE: egitim.toFixed(2),
      toplamAdet: adet.toFixed(2),
      stutar: stutar.toFixed(2),
      gidtutar: gidtutar.toFixed(2),
      giytutar: giytutar.toFixed(2),
      ktutar: ktutar.toFixed(2),
      etutar: etutar.toFixed(2),
      
    }));
    
};
  
useEffect(() => {

    getTitle();
    
      
    const tablo1 = document.getElementById("table1");
    tablo1.addEventListener("input", getTutar1);
    tablo1.addEventListener("input", countingTur);
    // tablo1.addEventListener("input", genelToplam);
  
    const tablo2 = document.getElementById("table2");
    tablo2.addEventListener("input", getTutar2);
    tablo2.addEventListener("input", countingTur);
    // tablo2.addEventListener("input", genelToplam);

    
    

    
  
    

    
}, []);


   
  
  return (
    <section>
      <form onSubmit={handleSubmit}>
      <div className="button_and_title_container">

          <h3 className="yeni-title">{title}</h3>
          <div className="buttons">
            <input id='sbmt' className="button" type="submit" name="sbmt" value="Submit"  />
            <input id='reset' className="button" type="reset" value="Reset" />
          </div>
        </div>
        <div id='danger-alert' className="alert alert-danger">{message}</div> 
        <div id="success-alert" className="alert alert-success" role="alert">
          {successMessage}
          
        </div>
        
        <div className="addTables">
          <table id="table1">
          <thead>
  <tr className="headRow">
    <th rowSpan="2">Sıra</th>
    <th colSpan="5">Vergi İadesine Esas Belgenin</th>
  </tr>
  <tr className="headRow">
    <th>Tarihi</th>
    <th>No</th>
    <th>Kimden Alındığı</th>
    <th>Türü</th>
    <th>Tutarı</th>
  </tr>
</thead>
<tbody>
{table1Values.map((row, i) => (
    <tr key={i}>
      <td className="sira">{i + 1}</td>
      <td className="tarih">
        <input type="date" name={"tarih${i}"} onChange={(e) => handleTable1InputChange(i, 'tarih', e.target.value)} />
      </td>
      <td className="no">
        <input type="number" name={"no${i}"}  onChange={(e) => handleTable1InputChange(i, 'no', e.target.value)}/>
      </td>
      <td className="kimden">
        <input type="text" name={"kimden${i}"} onChange={(e) => handleTable1InputChange(i, 'kimden', e.target.value)}/>
      </td>
      <td className="tur">
        <select name={"tur${i}"} id={`tur${i + 1}`} onChange={(e) => handleTable1InputChange(i, 'tur', e.target.value)}>
          <option></option>
          <option value="egitim">egitim</option>
          <option value="saglik">saglik</option>
          <option value="gida">gida</option>
          <option value="giyim">giyim</option>
          <option value="kira">kira</option>
        </select>
      </td>
      <td className="tutar">
        <input type="number" name={"tutar${i}"} onChange={(e) => handleTable1InputChange(i, 'tutar', e.target.value)} />
      </td>
    </tr>
  ))}
  <tr>
    <td className="toplamL" colSpan="5">Toplam</td>
    <td className="toplam1" id="toplam1">
      <input type="number" name="toplam1" value={totals.total1}  />
    </td>
  </tr>
</tbody>

          </table>
          <table id="table2">
          <thead>
  <tr className="headRow">
    <th className="radius" rowSpan="2">Sıra</th>
    <th colSpan="5">Vergi İadesine Esas Belgenin</th>
  </tr>
  <tr>
    <th>Tarihi</th>
    <th>No</th>
    <th>Kimden Alındığı</th>
    <th>Türü</th>
    <th className="radius">Tutarı</th>
  </tr>
</thead>
<tbody>
{table2Values.map((row, index) => (
    <tr key={index}>
      <td className="sira">{index + 1}</td>
      <td className="tarih">
        <input type="date" name={`tarih${index}`} onChange={(e) => handleTable2InputChange(index, 'tarih', e.target.value)}/>
      </td>
      <td className="no">
        <input type="number" name={`no${index}`} onChange={(e) => handleTable2InputChange(index, 'no', e.target.value)}/>
      </td>
      <td className="kimden">
        <input type="text" name={`kimden${index}`} onChange={(e) => handleTable2InputChange(index, 'kimden', e.target.value)}/>
      </td>
      <td className="tur">
        <select name={`tur${index}`} id={`tur${index}`} onChange={(e) => handleTable2InputChange(index, 'tur', e.target.value)}>
          <option></option>
          <option value="egitim">egitim</option>
          <option value="saglik">saglik</option>
          <option value="gida">gida</option>
          <option value="giyim">giyim</option>
          <option value="kira">kira</option>
        </select>
      </td>
      <td className="tutar">
        <input type="number" name={`tutar${index}`} onChange={(e) => handleTable2InputChange(index, 'tutar', e.target.value)}/>
      </td>
    </tr>
  ))}
  <tr>
    <td className="toplamL" colSpan="5">Toplam</td>
    <td className="toplam2" id="toplam2">
      <input type="number" name="toplam2" value={totals.total2}/>
    </td>
  </tr>
</tbody>

          </table>
          
        </div>
        <div className="resultTable">
          <table id="table3">
          <thead>
  <tr className="headRow">
    <th className="empty">Toplamlar</th>
    <th>Adet</th>
    <th>Tutar</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="genel">Genel Toplam</td>
    <td className="genel1" id="toplamAdet">
      <input type="number" name="adet" value={totals.toplamAdet}/>
    </td>
    <td className="genel1" id="toplamtutar">
      <input type="number" name="toplamtutar" value={parseFloat(totals.total1) + parseFloat(totals.total2)} />
    </td>
  </tr>
  <tr>
    <td className="genel">Eğitim</td>
    <td className="genel1" id="toplamE">
      <input type="number" name="toplamE" value={totals.toplamE} />
    </td>
    <td id="etutar" className="genel1">
      <input type="number" name="etutar" value={totals.etutar}/>
    </td>
  </tr>
  <tr>
    <td className="genel">Sağlık</td>
    <td className="genel1" id="toplamS">
      <input type="number" name="toplamS" value={totals.toplamS}/>
    </td>
    <td id="stutar" className="genel1">
      <input type="number" name="stutar" value={totals.stutar} />
    </td>
  </tr>
  <tr>
    <td className="genel">Gıda</td>
    <td className="genel1" id="toplamGid">
      <input type="number" name="toplamGid" value={totals.toplamGid} />
    </td>
    <td id="gidtutar" className="genel1">
      <input type="number" name="gidtutar" value={totals.gidtutar}/>
    </td>
  </tr>
  <tr>
    <td className="genel">Giyim</td>
    <td className="genel1" id="toplamGiy">
      <input type="number" name="toplamGiy" value={totals.toplamGiy} />
    </td>
    <td id="giytutar" className="genel1">
      <input type="number" name="giytutar" value={totals.giytutar} />
    </td>
  </tr>
  <tr>
    <td className="genel">Kira</td>
    <td className="genel1" id="toplamK">
      <input type="number" name="toplamK" value={totals.toplamK} />
    </td>
    <td id="ktutar" className="genel1">
      <input type="number" name="ktutar" value={totals.ktutar} />
    </td>
  </tr>
</tbody>

          </table>
        </div>
      </form>
      
    </section>
  );
}


export default AddReciepts;
