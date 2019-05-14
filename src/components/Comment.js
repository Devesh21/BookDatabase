import React, { Component } from "react";
//import { Col, Row } from "react-bootstrap";
import { Button, Form, FormGroup } from "react-bootstrap";
import firebase from "../config/firebaseConfig";
const firestore = firebase.firestore();

class Comment extends Component {
  state = {
    comment: ""
  };

  handleChange = e => {
    console.log("in handle change");

    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("in handle submit :");
    // console.log( this.props.bookDetails);
    const bookId = this.props.bookDetails;
    console.log(this.state);
    firestore.collection('comments').doc(bookId).set({comment : this.state.comment})
    .then(()=>{
      console.log("comment added!");
    });
    
  };
  render() {
    return (
      <div className="AddBook" style={{ margin: "50px" }}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Form.Label style={{ float: "left" }}>Comment</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              id="comment"
              onChange={this.handleChange}
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
