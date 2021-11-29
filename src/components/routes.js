import React from "react";

import { Route, Redirect } from "react-router-dom";



//const isLogged = window.localStorage.getItem("profile");


const PrivateRoute = props => {
    const isLogged = !!localStorage.getItem('profile')
    return isLogged ? <Route {...props}/> : <Redirect to="/"/>
}

export default PrivateRoute