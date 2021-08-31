import React, { PureComponent } from 'react';
import { Modal, Button,Form } from 'react-bootstrap';


class UpdateProfile extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passswordConfirmation: '',
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


    signUpNow = (e) => {
        e.preventDefault();
        const {firstName, lastName, email, password, passswordConfirmation} = this.state
        this.props.createUser(firstName, lastName, email, password, passswordConfirmation);
    }

    


    render(){
        const showSignUp = this.props;
        console.log(showSignUp["showSignUp"])

        return(
            <>
            {showSignUp &&
            <Modal
                size="md"
                show={showSignUp["showSignUp"]}
                onHide={this.hideSignUp}
                aria-labelledby="example-modal-sizes-title-md"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={this.updateFirstName} type="text" placeholder="Enter First Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={this.updateLastName} type="text" placeholder="Enter Last Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
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
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control onChange={this.updatePasswordConfirmation} type="password" placeholder="Enter Password Confirmation" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.hideSignUp} variant="secondary">Close</Button>
                    <Button onClick={this.signUpNow} variant="primary">Sign Up!!</Button>
                </Modal.Footer>
            </Modal>
    }</>
        )
    }
} 

export default UpdateProfile;