import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {Button, Form, FormGroup} from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
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
  };

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <Form.Label style={{"float": "left"}}>User Name</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              placeholder="Enter username"
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <Form.Label style={{"float": "left"}}>Email address</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <Form.Label style={{"float": "left"}}>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup controlId="password2" bsSize="large">
            <Form.Label style={{"float": "left"}}>Repeat Password</Form.Label>
            <Form.Control
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
              placeholder="Repeat Password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

export default Signup;
