import React from "react";
import './App.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from "./firebase/firebase";

import Navigation from "./components/navigation";


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  )
}


function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function App() {

  // const [user] = useAuthState(auth);

  return (
    <div className="App">
      <SignOut />

      <section>
        <Navigation />
      </section>
    </div>
  );
}

export default App;
