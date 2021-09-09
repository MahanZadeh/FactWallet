import React, { PureComponent } from 'react';
import { Card } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';

import { auth, db } from "../firebase/firebase";
import { arrayUnion } from "firebase/firestore";


import Navigation from './navigation';


import buffer from './buffer.gif';


class Fact extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      next: false,
      loggedIn: false,
    };
  }


  componentDidMount() {
    fetch("https://facts-by-api-ninjas.p.rapidapi.com/v1/facts", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "facts-by-api-ninjas.p.rapidapi.com",
        "x-rapidapi-key": "287bb744e2msh06023a70a90dc5cp1b7209jsn23df725e6649"
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result[0]["fact"]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  handleClick = (e) => {
    fetch("https://facts-by-api-ninjas.p.rapidapi.com/v1/facts", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "facts-by-api-ninjas.p.rapidapi.com",
        "x-rapidapi-key": "287bb744e2msh06023a70a90dc5cp1b7209jsn23df725e6649"
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result[0]["fact"]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )  }

  saveFact = (e) => {
    e.preventDefault();
    onAuthStateChanged(auth, (user) => {
      if (user) {
    db.collection("savedFacts").doc(user.uid).set({
      fact: arrayUnion(this.state.items),
      uid: user.uid,
    }, { merge: true })
    .then((docRef) => {
      alert("Data Successfully Submitted");
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
    const mystyle = {
      color: "white",
      backgroundColor: "#8A9EAB",
      padding: "10px",
      fontFamily: "Arial",
      height: "100vh",
      overflow: "hidden",
    };

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
      backgroundColor: "#fff",
      zIndex: "99",
  }

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div style={bufferDiv}>
          <img src={buffer} style={bufferImage}></img>
        </div>
      )
    } else {
      return (
      <>
      <Navigation />
        <div>
          <Card style={mystyle}>
            <Card.Body>
              <Card.Title style={{ color: '#1D2428' }}>Did you know?</Card.Title>
              <Card.Text style={{fontSize: "3vh", color: "#1D2428"}}>
                {items}
              </Card.Text>
              <Card.Link href="#" onClick={(e) => {this.handleClick(e)}} style={{color: "#1D2428",}}>New fact!</Card.Link>
              <Card.Link href="#" onClick={(e) => {this.saveFact(e)}} style={{color: "#1D2428",}}>Save this fact!</Card.Link>
            </Card.Body>
          </Card>        
        </div>
      </>
      );
    }
  }
}

export default Fact;
