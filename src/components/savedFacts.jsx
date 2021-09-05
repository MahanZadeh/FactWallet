import React, { PureComponent } from 'react';
import { Modal, Button, Form, Card, Nav } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import firebase from 'firebase/compat/app';

import { auth, signInWithEmailAndPassword, signInWithGoogle, db, } from "../firebase/firebase";

import Navigation from './navigation';

import { collection, query, where } from "firebase/firestore";
import Fact from './facts';
import buffer from './buffer.gif';



class SavedFacts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            facts: [],
            uid: "",
            delete: "",
        };
    }


    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            let allFacts = [];
            if (user) {
                db.collection("savedFacts")
                    .where("uid", "==", user.uid)
                    .get()
                    .then(function (snapshot) {
                        snapshot.forEach(function (doc) {
                            allFacts.push(doc.data().fact)
                        })
                        return allFacts;
                    }).then((allFacts) => {
                        this.setState({
                            facts: allFacts,
                            uid: user.uid,
                        })
                       
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        })
    }

    //FIRST DROP THE DUPLICATES IN THE SAVE PART, THEN FIND A WAY TO DELETE THEM HERE 
    deleteFact = (e) => {
        console.log(e);
        this.removeFromDB(e);
        this.componentDidMount();
        this.getFacts();
    }

    removeFromDB = (e) => {
        let user = firebase.auth().currentUser;
        if (user) {
            db.collection("savedFacts")
            .doc(user.uid)
            .update({
                fact: arrayRemove(e)
            })
        }
    }

        //FIRST DROP THE DUPLICATES IN THE SAVE PART, THEN FIND A WAY TO DELETE THEM HERE 
        // deleteFact = (e) => {
        //     console.log("render")
            // onAuthStateChanged(auth, (user) => {
            //     if (user) {
            //         console.log(user.uid)
            //     db.collection("savedFacts").doc(user.uid).set({
            //       fact: this.state.facts[0],
            //       uid: user.uid,
            //     }, { merge: true })
            //     .then((docRef) => {
            //     //   alert("Data Successfully Deleted");
            //     //   console.log(this.state.facts[0])
            //       console.log("Data Successfully Deleted")
            //     })
            //             .catch(function (error) {
            //                 console.log(error)
            //             })
    
            //     }
            // })
            // console.log(item)
// }


    getFacts = (e) => {
        let allFacts = [];

        onAuthStateChanged(auth, (user) => {
          if (user) {

        db.collection("savedFacts").doc(user.uid).get()
        .then(function (doc) {
            let test = doc.data();
        })
          .catch((error) => {
            console.error("Error adding document: ", error);
          })
        } 
    
        else {
            alert("You need to be signed in to perfom this operation!")
          }
        })
        }




    render() {
        const bufferImage = {
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "0 auto",
            zIndex: "100",
        }
      
        const bufferDiv = {
            position: "fixed",
            display: "block",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            textAlign: "center",
            /* opacity: 0.7; */
            backgroundColor: "#fff",
            zIndex: "99",
        }

        const facts = this.state.facts;
        const deleteText = "";
        console.log(facts, "here")
        if (this.state.facts.length != "0") {
            return (
                <>
                    <Navigation />
                    {facts[0].map((fact,i) => (
                        
                        <>
                            <div className="facts" key={i} style={{ width: "100%", display: "inline-block", textAlign: "center", marginBottom: "10px", boxShadow: "10px 5px 5px #3A4750", textAlign:"left"}}>
                                {fact}
                                <button style={{float: "right", height: "3vh", width:"5vh", fontSize:"10px", backgroundColor:"#495964", marginRight:"1vw"}} onClick={() => this.deleteFact(fact)}>Delete</button>

                            </div>
                        </>
                    ))}
                </>
            )
        } else {
            return (
                <div style={bufferDiv}>
                  <img src={buffer} style={bufferImage}></img>
                </div>
              )
        }
    }
}

export default SavedFacts;
