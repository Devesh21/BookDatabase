import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Favourite from "./Favourite";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ login: !this.state.login });
  }

  rishtSide() {
    var text = this.state.login ? "Sign Up" : "Log In";
    var loginSignup = this.state.login ? <Login /> : <Signup />;
    if (this.props.auth.uid) {
      return <Favourite />;
    } else {
      return (
        <Col lg="3">
          {loginSignup}
          <Button block onClick={this.handleClick}>
            {text}
          </Button>
        </Col>
      );
    }
  }

  render() {
    if (this.props.auth.uid) {
      return <Redirect to="/user" />;
    }

    return (
      <Container className="Home" style={{ maxWidth: "100%", "padding":"0px 15px 0px 0px"}}>
        <Row>
          <Col>
            <header className="App-header">
              <div className="App-Title" >
                <h1 className="App-title">Your partner in learning</h1>
                <p>Find and read books of your choice!</p>
              </div>
            </header>
          </Col>
          {this.rishtSide()}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Home);
