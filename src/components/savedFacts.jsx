import React, { PureComponent } from 'react';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { arrayRemove } from "firebase/firestore";
import firebase from 'firebase/compat/app';

import { auth, db, } from "../firebase/firebase";

import Navigation from './navigation';
import buffer from './buffer.gif';
import FactItem from './fact/Fact';



class SavedFacts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            facts: [],
            uid: "",
            delete: "",
            loading: true,
        };
    }


    async UNSAFE_componentWillMount() {
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
                            facts: allFacts[0],
                            uid: user.uid,
                        })
                        this.setState({
                            loading: false,
                        })

                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        })
    }

    //FIRST DROP THE DUPLICATES IN THE SAVE PART, THEN FIND A WAY TO DELETE THEM HERE 
    //FIRST DROP THE DUPLICATES IN THE SAVE PART, THEN FIND A WAY TO DELETE THEM HERE 
    deleteFact = (e) => {
        this.removeFromDB(e);
        this.updateState(e);
    }

    // updateState = (e) => {
    //     console.log("should set state")
    //     this.setState({facts: this.state.facts.filter(function(facts) { 
    //         return facts !== e
    //     })});
    //     console.log(this.state.facts)
    // }


    // updateState = (e) => {
    //    //copy  
    //     let array = [ ...this.state.facts];
    //     //index shoud be value
    //     let index = e
    //     // console.log(index, " index")
    //     if (index >= 0){

    //         array.splice(index, 1);
    //         this.setState({facts: array});
    //      }
    // }

    updateState = (e) => {
        this.setState({
            facts: this.state.facts.filter(function (facts) {
                return facts !== e
            })
        });
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
        if (!this.state.loading) {
            if (this.state.facts.length == 0) {
                return (
                    <>
                        <Navigation />

                        <div>You have no saved Facts!</div>
                    </>
                )
            } else {

                return (
                    <>
                        <Navigation />
                        {facts.map((fact, i) => (

                            <>
                              <FactItem
                                key={i}
                                fact={fact}
                                deleteFact={this.deleteFact}
                              />
                            </>
                        ))}
                    </>
                )
            }
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
