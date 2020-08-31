import React from "react";
import App from './App'
import ReactDOM from "react-dom";
import "./index.css";
import reducer,{initialState} from './reducer'
import {StateProvider} from './stateProvider'
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState = {initialState}
    reducer = {reducer}
    >
    
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


