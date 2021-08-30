import React, {PureComponent} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, signInWithEmailAndPassword, signInWithGoogle, db } from "../firebase/firebase";

class Joke extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          next: false,
        };
      }
      
    
      componentDidMount() {
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'accept': "application/json",
                'x-rapidapi-host': "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
                'x-rapidapi-key': "287bb744e2msh06023a70a90dc5cp1b7209jsn23df725e6649"
                }};           
        fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result["value"]
              });
            console.log(result["value"])
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      writeToFirebase = async(e) => {
        // const { uid, photoUrl } = auth.currentUser;
        // await factRef
        db.collection("savedFacts").add({
          date: new Date,
          fact: this.state.items,
        })
      }

      handleClick = (e) => {
        //   this.setState({next:true});
          console.log("click")
          db.collection("savedFacts").add({
            date: new Date,
            fact: this.state.items,
          }).then((docRef) => {
            alert("Data Successfully Submitted");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    
          this.componentDidMount();

      }




    
      render() {
        const mystyle = {
          color: "white",
          backgroundColor: "DodgerBlue",
          padding: "10px",
          fontFamily: "Arial"
        };
        const button = {
          backgroundColor: "red",
          padding: "15px",
        };
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <ul style={mystyle}>
                <li>{items}</li>
                <Button style={button} onClick={this.handleClick}></Button>
            </ul>
          );
        }
      }
    }

export default Joke;