import React, { useCallback, useState } from 'react';
import {BrowserRouter,Redirect,Switch,Route} from 'react-router-dom'

import List from './Pages/card/cards';
import Nav from './Pages/Navigation/nav';
import Home from './Pages/home'
import Login from './Pages/login'
import Signup from './Pages/findMatch'
import {AuthContext} from './context/UserContext'
import About from './Pages/about'
import Rules from './Pages/rules';

function App() {

  const [isLogedIn,setLogedIn]=useState(false);
  const [UserId,setUserID]=useState(null);
  const [Phonen,setPhone]=useState(null);
  const [Playerss,setPlayers]=useState([]);

  const Log=useCallback((id,phone,players)=>{
    console.log("Login fuction in app.js");
    setUserID(id);
    console.log(id+' is id '+phone+' '+players);
    setLogedIn(true);
    setPhone(phone);
    setPlayers(players);
    console.log("after setting "+isLogedIn);
  } )

  return (
    
    <div>   
    <AuthContext.Provider value={{isLogedIn:isLogedIn,userID:UserId,Phone:Phonen,Players:Playerss,LOGIN:Log}} >
      <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact>
            <Login/>
          </Route>
          <Route path='/register' exact>
            <Signup/>
          </Route>
          <Route path='/about' exact>
            <About />
          </Route>
          <Route path='/rules' exact>
            <Rules />
          </Route>
          <Route path='/' >
            <Home/>
            <Nav />
            <List />
          </Route>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
      </React.Fragment>
       </AuthContext.Provider>
      </div> 
    
  );
  }

export default App;
