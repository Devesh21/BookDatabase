import React, { Component } from "react";
//import { Col, Row } from "react-bootstrap";
import { Button, Form, FormGroup } from "react-bootstrap";

class Comment extends Component {
  state = {
    comment: null
  };

  handleChange = e => {
    // console.log("in handle change");

    this.setState({
      [e.target.id]: e.target.value
    });
    console.log();
  };

  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="AddBook" style={{ margin: "50px" }}>
        <form>
          <FormGroup>
            <Form.Label style={{ float: "left" }}>Comment</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              id="Comments"
              //   onChange={this.handleChange}
              placeholder="Post Comments"
              required
            />
          </FormGroup>

          <Button
            type="submit"
            style={{
              position: "left",
              display: "block",
              padding: "10px 20px",
              clear: "both"
            }}
          >
            Post
          </Button>
        </form>
      </div>
    );
  }
}

export default Comment;
