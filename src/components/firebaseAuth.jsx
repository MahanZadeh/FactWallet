// // Import FirebaseAuth and firebase.
// import React from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// // import firebase from 'firebase';
// import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase";
// import firebase from 'firebase/compat/app';



// // import firebase from 'firebase/compat/app';
// import firebaseConfig from './firebaseConfig';

// // const app = firebase.initializeApp(firebaseConfig);
// // const auth = app.auth();
// // const db = app.firestore();

// // const googleProvider = new firebase.auth.GoogleAuthProvider();

// firebase.initializeApp(firebaseConfig);

// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/signedIn',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   ],
// };

// function SignInScreen() {
//   return (
//     <div>
//       <h1>My App</h1>
//       <p>Please sign-in:</p>
//       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//     </div>
//   );
// }

// export default SignInScreen;
