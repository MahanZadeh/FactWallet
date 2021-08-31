import React, { PureComponent } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, signInWithEmailAndPassword, signInWithGoogle, db } from "../firebase/firebase";

import Navigation from './navigation';

import styled from 'styled-components';


class Fact extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      next: false,
    };
  }


  componentDidMount() {

    // const requestOptions = {
    //     method: 'GET',
    //     headers: {
    //         'accept': "application/json",
    //         'x-rapidapi-host': "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
    //         'x-rapidapi-key': "287bb744e2msh06023a70a90dc5cp1b7209jsn23df725e6649"
    //         }};           
    // fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", requestOptions)

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
          console.log(result[0]["fact"])
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
    this.componentDidMount();
  }

  saveFact = (e) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid)
    db.collection("savedFacts").add({
      date: new Date,
      fact: this.state.items,
      uid: user.uid,
    }).then((docRef) => {
      alert("Data Successfully Submitted");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
  })
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

    // const card = styled.a` 
    //   transition: "box-shadow .3s",
    //   width: "300px",
    //   height: "500px",
    //   margin: "50px",
    //   borderRadius: "10px",
    //   border: "1px solid #ccc",
    //   background: "#fff",
    //   float: "left",
    //   "&:hover": {
    //     backgroundColor: "blue",
    //   }`;

    const card = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
  color: blue;

  &:hover {
    color: red; // <Thing> when hovered
  }

  & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }

  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`
    
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <>
        <div>
          <Card onClick={this.handleClick} style={mystyle}>
            <Card.Body>
              <Card.Title style={{ color: 'navy' }}>Click for a random fun fact!</Card.Title>
              {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
              <Card.Text>
                {items}
              </Card.Text>
              <Card.Link href="#" onClick={this.handleClick} >New Fact!</Card.Link>
              <Card.Link href="#" onClick={this.saveFact}>Save it to your profile!</Card.Link>
            </Card.Body>
          </Card>        
        </div>
      </>
      );
    }
  }
}

export default Fact;


{/* <ul style={mystyle}>
<li>{items}</li>
<Button style={button} onClick={this.handleClick}></Button>
</ul> */}