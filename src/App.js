import React from "react";
import './App.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase/firebase";

import Fact from "./components/facts";

import Login from "./components/login-og";

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

  const [user] = useAuthState(auth);

  return (
    <div className="App">
              <SignOut />

      <section>
        <Navigation/>
        {/* {user ? <Fact /> : <Login />} */}
        {/* <Fact/> */}
      </section>
    </div>
  );
}

export default App;


// function SingleFact(props){
//   const { text, uid } = props.fact;

//   return <p>{text}</p>
// }


// function Facts() {
//   const factRef = firestore.collection('savedFacts');
//   const query = factRef.orderBy('date');
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