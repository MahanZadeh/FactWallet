import React, { PureComponent } from 'react';
import { Modal, Button, Form, Card, Nav } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, updateEmail, updateProfile, updatePassword } from "firebase/auth";


import { auth, signInWithEmailAndPassword, signInWithGoogle, db, retrieveUserInfo } from "../firebase/firebase";

import { collection, query, where } from "firebase/firestore";



class UpdateProfile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    hideSignUp = (e) => {
        this.props.showSignUp();
    }

    updateName = (e) => {
        this.setState({
            name: e.target.value
        })
    }


    updateEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    updatePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }


    updateEmailDb = () => {
        updateEmail(auth.currentUser, this.state.email).then(() => {
            console.log("email updated")
        }).catch((error) => {
            console.log(error)
        });
    }

    updateDisplayName = () => {
        updateProfile(auth.currentUser, {
            displayName: this.state.name,
        }).then(() => {

            console.log("name updated")
        }).catch((error) => {
            console.log("Error updating name: ", error)
        });
    }

    updatePassword = (e) => {
        const user = auth.currentUser;
        const newPassword = this.state.password;

        updatePassword(user, newPassword).then(() => {
            console.log("password updatd")
        }).catch((error) => {
            // An error ocurred
            // ...
            console.log("Error updating password: ", error)
        });
    }

    updateDB = (e) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                try {
                    this.updateEmailDb();
                    this.updateDisplayName();
                    this.updatePassword();
                }
                catch (error) {
                    alert("Please sign in again to perform this operation")
                }
            }

        })
    }



    render() {
        const showSignUp = this.props.showSignUp;
        return (
            <>
                {showSignUp &&
                    <Modal
                        size="md"
                        show={showSignUp}
                        onHide={this.props.hideComponent}
                        aria-labelledby="example-modal-sizes-title-md"
                    >
                        <Modal.Header>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Update Profile
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={this.updateName} type="text" placeholder="Enter your name" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={this.updateLastName} type="text" placeholder="Enter Last Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.updateEmail} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.updatePassword} type="password" placeholder="Enter Password" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { this.props.hideComponent(); this.updateDB(); this.props.populateUser()}} variant="secondary">Submit</Button>
                            <Button onClick={this.props.hideComponent} variant="secondary">Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                }</>
        )
    }
}

export default UpdateProfile;