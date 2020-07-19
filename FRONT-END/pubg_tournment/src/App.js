import React, { useState,useCallback } from 'react';
import {BrowserRouter,Redirect,Switch,Route} from 'react-router-dom'

import List from './Pages/card/cards';
import Nav from './Pages/Navigation/nav';
import Home from './Pages/home'
import Login from './Pages/login'
import Signup from './Pages/findMatch'
import {AuthContext} from './context/UserContext'
import About from './Pages/about'
import Model from './UIElements/Model'
import Rules from './Pages/rules';

function App() {

  const [isLogedIn,SetLogedIn]=useState(false);
  const [UserId,setUserID]=useState(null);
  const [Phone,setPhone]=useState(null);
  const [Players,setPlayers]=useState([]);

  const Log=useCallback((id,phone,players)=>{
    setUserID(id);
    SetLogedIn(true);
    setPhone(phone);
    setPlayers(players);
  } ,[]);

  return (
    
    <div>   
    <AuthContext.Provider value={{isLogedIn:isLogedIn,userID:UserId,Phone:Phone,Players:Players,LOGIN:Log}} >
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
            <Model show = {true} >
            <Rules />
            </Model>
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
