import './App.css';

import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navber from './Components/NavBer/Navber';
import Home from './Components/Home/Home';
import LogIn from './Components/LogIn/LogIn';
import Destination from './Components/Destination/Destination';
import Pick from './Components/Pick/Pick';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext= createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
     <p>name:{loggedInUser.name}</p>
    <Router>
      <Navber></Navber>
      <Switch>
        <Route path="/home">
        <Home /> 
        </Route>
        <Route  path="/login">
         <LogIn />
        </Route>
        <PrivateRoute  path="/pick">
         <Pick />
        </PrivateRoute>
        <PrivateRoute  path="/destination">
         <Destination />
        </PrivateRoute>
        <Route exact path="/*">
          <Home></Home>
        </Route>
      </Switch>
     </Router>
  </UserContext.Provider>
  );
}

export default App;
