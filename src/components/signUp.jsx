import React, { PureComponent } from 'react';
import { Modal, Button,Form } from 'react-bootstrap';


class SignUp extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passswordConfirmation: '',
            showSignUp: true,
        }
    }

    hideSignUp = (e) => {
        this.props.showSignUp();
    }

    updateFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    updateLastName = (e) => {
        this.setState({
            lastName: e.target.value
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

    updatePasswordConfirmation = (e) => {
        this.setState({
            passswordConfirmation: e.target.value
        })
    }


    // signUpNow = (e) => {
    //     e.preventDefault();
    //     const {firstName, lastName, email, password, passswordConfirmation} = this.state
    //     this.props.createUser(firstName, lastName, email, password, passswordConfirmation);
    // }

    


    render(){
        const showSignUp = this.props.showSignUp;

        return(
            <>

            <Modal
                size="md"
                show={this.state.showSignUp}
                onHide={this.props.hideComponent}
                aria-labelledby="example-modal-sizes-title-md"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.updateFirstName} type="text" placeholder="First &amp; last name" />
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
                        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control onChange={this.updatePasswordConfirmation} type="password" placeholder="Enter Password Confirmation" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group> */}
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.hideComponent} variant="secondary">Submit</Button>
                    {/* <Button onClick={this.signUpNow} variant="primary">Sign Up!!</Button> */}
                </Modal.Footer>
            </Modal></>
        )
    }
} 

export default SignUp;