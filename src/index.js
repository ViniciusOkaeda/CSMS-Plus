import ReactDOM from 'react-dom';

import './index.css';
import Login from './pages/login';
import PreLoad from './pages/preLoad';
import Teste from './pages/teste';
import Dashboard from './pages/dashboard';
import Users from './pages/dashboard/users';
import Motv from './pages/dashboard/motv';
import Vendors from './pages/dashboard/vendors';
import PrivateRoute from './components/routes';
import NotFound from './pages/notFound';
import React from "react";
import {
  BrowserRouter, Switch,
  Route, Redirect
} from "react-router-dom";

const profile = window.localStorage.getItem("profile");

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route  exact path="/preload" component={PreLoad} />
    <Route  exact path="/" component={Login} />
    <Route  path="/teste/" component={Teste} />
    <Route  path="/notfound" component={NotFound} />



    <PrivateRoute path="/dashboard" component={Dashboard}/>
    <PrivateRoute path="/motv" component={Motv}/>
    
    { profile === "1" ?
    <PrivateRoute path="/users" component={Users}/> 
    : <Redirect to="/notfound" />}

    { profile === "1" ?
    <PrivateRoute path="/vendors" component={Vendors}/> 
    : <Redirect to="/notfound" />}


    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

