import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import Favourite from "./Favourite.js";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Sample Book",
      author: "Sample Author",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab amet consectetur delectus, dolorem eligendi explicabo iste iusto laborum, laudantium maxime modi nostrum numquam obcaecati officiis quo, similique sint tempora?",
      rating: 5,
      image: "BookCover.png"
    }; // the book's thumbnail needs to be pulled from the first page of the book's pdf
  }

  render() {
    var comments = [
      ["user1", "comment1", "5"],
      ["user2", "comment2", "4"],
      ["user3", "comment3", "5"],
      ["user4", "comment4", "4"]
    ];

    // console.log(this.props.auth);

    if (!this.props.auth.uid) return <Redirect to="/" />;

    return (
      <Row>
        <Col style={{ border: "solid" }}>
          <Row className="BookDescription">
            <Col xs={12} md={3} lg={3}>
              <Image
                src={require("../image/" + this.state.image)}
                alt="BookCover"
                style={{ maxwidth: "100%" }}
              />
            </Col>
            <Col style={{ textAlign: "left" }}>
              <h1>{this.state.name}</h1>
              <p>Author: {this.state.author}</p>
              <p>Rating: {this.state.rating}</p>
              <p>Description: {this.state.description}</p>
            </Col>
          </Row>
          <Row className="Comments">
            <Col style={{ textAlign: "left" }}>
              <h3>Comments</h3>
              {comments.map(function(comment, index) {
                return (
                  <div>
                    <div>User: {comment[0]}</div>
                    <div>Rating: {comment[2]}</div>
                    <div>Comment: {comment[1]}</div>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Col>
        <Favourite />
      </Row>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Book);
