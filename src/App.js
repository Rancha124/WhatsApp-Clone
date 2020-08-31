import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";
import Login from "./components/Login/Login";
import {useStateValue} from './stateProvider'
function App() {

  const [{user, loginStatus} ,dispatch] = useStateValue();
  //console.log("Check login Status",loginStatus)
  //const[loginStatus ,dispatch] = useStateValue();
    return (
    <div className="app">
     
      {user || loginStatus ? (
        <div className="app__body">
          <Router>
            <SideBar />
            <Switch>
              <Route path="/rooms/:roomID" exact>
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
export default App;
