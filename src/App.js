import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import AddReciepts from './AddReciepts';
import OldReciepts from './OldReciepts';
import Update from './Update'; 
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




const App = () => {
  return (
    <Router>
      <div className="App">
      
        
        <Navbar />
        <div className="content">
          <Switch>
          <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/logout">
              <Logout />
            </Route>


            <Route path="/add">
              <AddReciepts />
            </Route>
            
            
            <Route path="/update/:id">
              <Update />
            </Route>
            
            <Route path="/">
              <OldReciepts />
            </Route>

            

            
          </Switch>
        </div>
        <Footer />

         
        
      
      </div>
    </Router>
  );
};

export default App;
