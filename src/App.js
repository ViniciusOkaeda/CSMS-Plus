import './App.css';
import Login from './pages/login';
import PreLoad from './pages/preLoad';
import Teste from './pages/teste';
import Dashboard from './pages/dashboard';
import Users from './pages/dashboard/users';

import PrivateRoute from './components/routes';
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import {history} from './history'


export default class App extends Component {
  render() {
      return (
              <Router  history={history}>
                <Route  path="/preload" component={PreLoad} />
                <Route  path="/login" component={Login} />
                <Route  path="/teste/" component={Teste}               
                />
                <Route path="/dashboard" component={Dashboard}/>
               {/* <PrivateRoute path="/dashboard" component={Dashboard}/> */} 
                <PrivateRoute path="/users" component={Users}/>
    
              </Router>
      );
  }
}


