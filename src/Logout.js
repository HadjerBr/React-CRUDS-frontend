import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // You may use Axios or another HTTP library

function Logout() {
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      try {
        
        const response = await axios.get('https://reciepts-backend.onrender.com/logout');

        const data = response.data;
        
        history.push('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logout();
  }, [history]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;
