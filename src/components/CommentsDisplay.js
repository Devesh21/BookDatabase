import React, { Component } from "react";
import firebase from "../config/firebaseConfig";
import { Col, Row } from "react-bootstrap";
const firestore = firebase.firestore();

class CommentsDisplay extends Component {
  state = {
    comments: [],
    bookFromDatabase: false
  };

  componentDidMount() {
    this.props.refreshParent.do = () => {
      this.refreshComments();
    };
    this.refreshComments();
  }

  refreshComments() {
    const bId = this.props.bookDetails;
    // console.log(bId);

    firestore
      .collection("comments")
      .doc(bId)
      .get()
      .then(snapshots => {
        if (snapshots.data()) {
          this.setState({ bookFromDatabase: true });
          // console.log(snapshots.data().comments);
          this.setState({ comments: snapshots.data().comments });
          // console.log(this.state);
        }
      });
  }

  render() {
    let comments = null;
    let body = null;

    if (this.state.bookFromDatabase) {
      if (this.state.comments) {
        comments = this.state.comments;

        body = (
          <Col
            className="Favourite"
            lg="3"
            //   style={{ border: "solid", margin: "0px 10px" }}
          >
            <Row>
              {comments.map(function(item, index) {
                return (
                  <Col xs={6} md={4} lg={12} key={index}>
                    {"Comment " + (index + 1) + " : " + item.comment}
                  </Col>
                );
              })}
            </Row>
          </Col>
        );
      }
    } else {
      body = (
        <Col className="Favourite">
          <Row>No Comments Yet..!!</Row>
        </Col>
      );
    }

    return body;
    // <div>display comments here!!</div>;
  }
}
export default CommentsDisplay;
