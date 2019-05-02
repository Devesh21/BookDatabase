import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Home extends Component {
  render() {
    return(
      <header className="App-header">
        <div className="App-Title">
          <h1 className="App-title">Your partner in learning</h1>
          <p>Find and read books of your choice!</p>
        </div>
      </header>
    )
  }
}

export default Home;