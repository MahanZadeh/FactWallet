import React from "react";
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyDHj6bckLNKC9QM561wyPnWVoyC5M0EZVs",
  authDomain: "factswallet-bbf90.firebaseapp.com",
  projectId: "factswallet-bbf90",
  storageBucket: "factswallet-bbf90.appspot.com",
  messagingSenderId: "592394552215",
  appId: "1:592394552215:web:529dd4e38d0ae51259bad2",
  measurementId: "G-37PF0YTJ12"})

const auth = firebase.auth();
const firestore = firebase.firestore();



function SignIn() {

  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }


  return (
      <button onClick={signInWithGoogle}>Sign In With Google</button>
  )
}


function App() {
  
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
        {user ? <Facts /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
