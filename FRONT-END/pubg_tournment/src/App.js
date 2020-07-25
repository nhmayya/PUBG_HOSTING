import React, { useCallback, useState } from 'react';
import {BrowserRouter,Redirect,Switch,Route} from 'react-router-dom'

import List from './Pages/card/cards';
import Nav from './Pages/Navigation/nav';
import Home from './Pages/home'
import Login from './Pages/login'
import Signup from './Pages/findMatch'
import {AuthContext} from './context/AuthContext'
import About from './Pages/about'
import Rules from './Pages/rules';

function App() {

  
  const [UserId,setUserID]=useState(null);
  const [Phonen,setPhone]=useState(null);
  const [Playerss,setPlayers]=useState([]);
  const [isLogedIn,SetLogedIn]=useState(false);
   

  const Login1 = useCallback((id,phone,players)=>{
    console.log(id+" "+phone+" "+players);
    setUserID(id);
    SetLogedIn(true);
    setPhone(phone);
    setPlayers(players)
  },[]);

  
  return (
    
    <div>   
    <AuthContext.Provider value={{isLogedIn:isLogedIn,UserId:UserId,Phone:Phonen,Players:Playerss,LOGIN:Login1}} >
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
