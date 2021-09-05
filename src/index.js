// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import { Provider } from 'react-redux';
// import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import configureStore from './store';
// import reportWebVitals from './reportWebVitals';
// import UserContainer from './containers/UserContainer';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import App from './App';


// ReactDOM.render(
//     <Provider store={configureStore()}>
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" component={UserContainer} >
//         </Route>
//       </Switch>
//     </BrowserRouter>
//     </Provider>
// ,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



//////////////////////////////////below works!!!/////////////
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import App from './App';
// import Login from './components/login-og';
import Login from './components/login'
import Fact from './components/facts';
import Profile from './components/profile';
import UpdateProfile from './components/updateProfile';
import SavedFacts from './components/savedFacts';
import signUp from './components/signUp';
import Register from './components/register';
import Reset from './components/reset';
import Dashboard from './components/dashboard';

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
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/fact" component={Fact}>
          </Route>
          <Route exact path="/profile" component={Profile}>
          </Route>
          <Route exact path="/updateProfile" component={UpdateProfile}>
          </Route>
          
          {/* {firebase.auth().currentUser?            */}
          <Route exact path="/savedFacts" component={SavedFacts}>
          </Route> 
          {/*   : null } */}

          <Route exact path="/signUp" component={signUp}>
          </Route>
        </Switch>
      </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


