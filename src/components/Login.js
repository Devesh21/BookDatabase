import React, { Component } from "react";
import { Button, FormGroup, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { signIn } from "../../src/store/actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    console.log("In Login: ", this.state);
    this.props.signIn(this.state);
    // this.props.history.push("/user");
  };

  render() {
    const { authError } = this.props;
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <Form.Label style={{ float: "left" }}>Email address</Form.Label>
            <Form.Control
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup controlId="password">
            <Form.Label style={{ float: "left" }}>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button block disabled={!this.validateForm()} type="submit">
            Log In
          </Button>
          <div className="error">{authError ? <p>{authError}</p> : null}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
