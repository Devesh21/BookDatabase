import React, {Component} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    this.props.signUp(this.state);
  };

  render() {

    const { authError } = this.props;

    return (
      <div className="Signup" style={{ padding: "15px 0px"}}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="firstName">
            <Form.Label style={{"float": "left"}}>First Name</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.firstName}
              onChange={this.handleChange}
              type="text"
              placeholder="First Name"
            />
          </FormGroup>
          <FormGroup controlId="lastName">
            <Form.Label style={{"float": "left"}}>Last Name</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.lastName}
              onChange={this.handleChange}
              type="text"
              placeholder="Last Name"
            />
          </FormGroup>
          <FormGroup controlId="email">
            <Form.Label style={{"float": "left"}}>Email address</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup controlId="password">
            <Form.Label style={{"float": "left"}}>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          
          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign Up
          </Button>

          <div className="error">
            { authError ? <p>{authError}</p> : null}
          </div>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
