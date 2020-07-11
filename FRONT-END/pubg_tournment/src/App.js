import React from 'react';
import {BrowserRouter,Redirect,Switch,Route} from 'react-router-dom'

import List from './Pages/card/cards';
import Nav from './Pages/Navigation/nav';
import Home from './Pages/home'
import Login from './Pages/login'
import Signup from './Pages/findMatch'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact>
            <Login/>
          </Route>
          <Route path='/register' exact>
            <Signup/>
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
  );
}

export default App;
