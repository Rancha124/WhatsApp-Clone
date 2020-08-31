import React, { useState } from "react";
import "./login.css";
import { Button, Accordion, Card } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../stateProvider";
function Login() {
  const [{ user, loginStatus }, dispatch] = useStateValue();
  //console.log("before login", loginStatus);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        //console.log(result);
        //console.log("new user ?", result.additionalUserInfo.isNewUser);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
          loginStatus: true,
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
    
      <h3>RunChat Run welcomes you</h3>
      <h6>Here you can live chat with anyone, go ahead and sign in, create a new room and start chatting already</h6>
      <div className="card card__box">
        <div class="card-body login__text">
          <h5 class="card-title">RunChat Run</h5>
          <p class="card-text">
           Live Chat rooms 
          </p>
          <Button onClick={signIn}>Sign In with Google</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
