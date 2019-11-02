import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home/home';
import admin from './components/admin/admin'
import auth from './components/auth/auth'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
          <Route exact path ='/' component ={Home}/>
          <Route path ='/login' component={auth}/> 
          <Route path ='/stock' component={admin}/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
