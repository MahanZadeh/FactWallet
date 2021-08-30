import React from "react";
import './App.css';
// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase/firebase";

import Joke from "./components/joke";

import Login from "./components/login";





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

function SingleFact(props){
  const { text, uid } = props.fact;

  return <p>{text}</p>
}


// function Facts() {
//   const factRef = firestore.collection('facts');
//   const query = factRef.orderBy('savedAt');
//   const [facts] = useCollectionData(query, {idField: 'id'});

//   return (
//     <>
//       <div>
//           {facts && facts.map( fact => <SingleFact key={fact.id} fact={fact}/>)}
//       </div>
//       <div>

//       </div>
//     </>
//   )
// }


function App() {
  
  const [user] = useAuthState(auth);
  console.log(user)

  return (
    <div className="App">
      {/* <header className="App-header">

      </header> */}
      <section>
        <h1>HIIII</h1>
        <SignOut/>
        {user ? <Joke/> : <Login/>}
      </section>
    </div>
  );
}

export default App;
