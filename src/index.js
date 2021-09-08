import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import App from './App';
import Login from './components/login'
import Fact from './components/facts';
import Profile from './components/profile';
import UpdateProfile from './components/updateProfile';
import SavedFacts from './components/savedFacts';
import signUp from './components/signUp';
import Register from './components/register';
import Reset from './components/reset';

import firebase from 'firebase/compat/app';
import { auth } from '../src/firebase/firebase';

ReactDOM.render( 
      <BrowserRouter>
        <Switch>
          <Route exact path="/app" component={App} >
          </Route>
          <Route exact path="/" component={Login} >
          </Route>
          <Route exact path="/login" component={Login} >
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/fact" component={Fact}>
          </Route>
          <Route exact path="/profile" component={Profile}>
          </Route>
          <Route exact path="/updateProfile" component={UpdateProfile}>
          </Route>
          <Route exact path="/savedFacts" component={SavedFacts}>
          </Route>
          <Route exact path="/signUp" component={signUp}>
          </Route>
        </Switch>
      </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();


