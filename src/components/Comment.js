import React, { Component } from "react";
//import { Col, Row } from "react-bootstrap";
import { Button, Form, FormGroup } from "react-bootstrap";
import firebase from "../config/firebaseConfig";
// import CommentsDisplay from "./CommentsDisplay";
const firestore = firebase.firestore();

class Comment extends Component {
  state = {
    comment: "",
    uid: ""
  };

  handleChange = e => {
    // console.log("in handle change");

    this.setState({
      [e.target.id]: e.target.value
    });
    // console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log("in handle submit :");
    // console.log( this.props.bookDetails);
    const bookId = this.props.bookDetails;
    const userId = this.props.userId;
    let refreshParent = this.props.refreshParent;
    this.state.uid = userId;
    // console.log(this.state);

    var comm = [];
    firestore
      .collection("comments")
      .doc(bookId)
      .get()
      .then(snapshot => {
        if (snapshot.data()) {
          // console.log(snapshot.data().comments);
          snapshot.data().comments.forEach(element => {
            comm.push(element);
          });
        }
        comm.push(this.state);
        firestore
          .collection("comments")
          .doc(bookId)
          .set({ comments: comm });
        // console.log(comm);
      })
      .then(() => {
        // this.setState({ books: books });
        console.log("comment Added!!");
        this.setState({ comment: "" });
        refreshParent();
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
              value={this.state.comment}
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
