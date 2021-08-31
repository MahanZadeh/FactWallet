import React, { useEffect, useState, PureComponent } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/login.css";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",


    }
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
          {/* <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div> */}
        </div>
      </div>
    );
  }
}

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, loading, error] = useAuthState(auth);
//   const history = useHistory();

// //   useEffect(() => {
// //     if (loading) {
// //       // maybe trigger a loading screen
// //       return;
// //     }
// //     if (user) history.replace("/dashboard");
// //   }, [user, loading]);

//   return (
//     <div className="login">
//       <div className="login__container">
//         <input
//           type="text"
//           className="login__textBox"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="E-mail Address"
//         />
//         <input
//           type="password"
//           className="login__textBox"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button
//           className="login__btn"
//           onClick={() => signInWithEmailAndPassword(email, password)}
//         >
//           Login
//         </button>
//         <button className="login__btn login__google" onClick={signInWithGoogle}>
//           Login with Google
//         </button>
//         {/* <div>
//           <Link to="/reset">Forgot Password</Link>
//         </div>
//         <div>
//           Don't have an account? <Link to="/register">Register</Link> now.
//         </div> */}
//       </div>
//     </div>
//   );
// }

export default Login;