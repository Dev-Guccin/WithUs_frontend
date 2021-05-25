import { Route, BrowserRouter as Router } from "react-router-dom";
import React, { Component } from 'react'; 
import { Redirect } from 'react-router-dom';

const isLogin = () => {
  if(JSON.parse(localStorage.getItem('login_check'))) {
    return true;
  } else {
    return false;
  }
}
const LoginFalse = () => {
  alert("로그인이 필요합니다.");
  return <Redirect to="/Login" />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /login page
      <Route
        {...rest}
        render={(props) => (isLogin() ? <Component {...props} /> : LoginFalse())}
      />
    );
  };
  
  export default PrivateRoute;