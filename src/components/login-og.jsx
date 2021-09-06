import React, { useEffect, useState, PureComponent } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/login.css";

import SignUp from "./signUp";

class Login2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showSignUpform: false,


    }
  }

showSignUpform = (e) => {
    this.setState({
      showSignUpform: !this.state.showSignUpform,
    })
}

  setEmail = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  setPassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  render(){
    return (
      <div className="login">
        <div className="login__container">
        <p style={{fontSize: "3vh"}}>Welcome to <i>FactWallet!</i></p>

          <input
            type="text"
            className="login__textBox"
            value={this.state.email}
            onChange={this.setEmail}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={this.state.password}
            onChange={this.setPassword}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => signInWithEmailAndPassword(this.state.email, this.state.password)}
          >
            Login
          </button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
          {/* <div>
            <Link to="/reset">Forgot Password</Link>
          </div> */}
          {/* <div>
            Don't have an account? <Link to="#" onClick={this.showSignUpform}>Register</Link> now.
          </div>
          {this.state.showSignUpform ? <SignUp/> : <p></p>} */}
          
        </div>
      </div>
    );
  }
}

export default Login2;