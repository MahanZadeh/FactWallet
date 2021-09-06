import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { updateEmail, updateProfile, updatePassword } from "firebase/auth";


import { auth, db, } from "../firebase/firebase";



class UpdateProfile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
        }
    }

    componentDidMount = () => {
        this.populateUser();
    }

    populateUser = () => {
        onAuthStateChanged(auth, (somebody) => {
            // console.log(auth.currentUser())
            if (somebody) {

                db.collection("users")
                    .doc(somebody.uid)
                    .get()
                    .then((result) => {
                        console.log(somebody.displayName)
                        console.log(somebody.email)
                        console.log(somebody.photoURL)

                        this.setState({
                            name: somebody.displayName,
                            email: somebody.email,
                            // pic: somebody.photoURL,
                        })
                    }).catch(function (error) {
                        console.log(error)
                    })
            }
        })
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

    updatePass = (e) => {
        if (e.target.value.length > 6) {
            this.setState({
                password: e.target.value
            })
        } else {

        }
    }


    updateEmailDb = () => {
        // if(this.state.email.length )
        updateEmail(auth.currentUser, this.state.email).then(() => {
            alert("Email updated")
        }).catch((error) => {
            alert("Error updating email ", error)
        });
    }

    updateDisplayName = () => {
        updateProfile(auth.currentUser, {
            displayName: this.state.name,
        }).then(() => {

        }).catch((error) => {
            alert("Error updating name: ", error)
        });
    }

    updatePasswordDb = (e) => {
        const user = auth.currentUser;
        const newPassword = this.state.password;

        if (newPassword.length > 6) {

            updatePassword(user, newPassword).then(() => {
                alert("Password updated")
            }).catch((error) => {

                alert("Error updating password: ", error)
            });
        } else {
            alert("Failed to update password. Password needs to be at least 6 charachters long")
        }
    }

    updateDB = (e) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                try {
                    this.updateEmailDb();
                    this.updateDisplayName();
                    this.updatePasswordDb();
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
                                    <Form.Control onChange={this.updateName} type="text" placeholder="Enter Name" defaultValue={this.state.name} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.updateEmail} type="email" placeholder="Enter email" defaultValue={this.state.email} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.updatePass} type="password" placeholder="Enter Password" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { this.props.hideComponent(); this.updateDB(); this.props.populateUser() }} variant="secondary">Submit</Button>
                            <Button onClick={this.props.hideComponent} variant="secondary">Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                }</>
        )
    }
}

export default UpdateProfile;