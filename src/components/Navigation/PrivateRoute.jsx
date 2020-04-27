import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    console.log("asdasd")
    return (<Route {...rest} render={(props) => (
      authed === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />)   
    }

export default PrivateRoute;
