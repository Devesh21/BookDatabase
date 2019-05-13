import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import Favourite from "./Favourite.js";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      loading: false
      // name: "Sample Book",
      // author: "Sample Author",
      // description:
      //   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab amet consectetur delectus, dolorem eligendi explicabo iste iusto laborum, laudantium maxime modi nostrum numquam obcaecati officiis quo, similique sint tempora?",
      // rating: 5,
      // image: "BookCover.png"
    }; // the book's thumbnail needs to be pulled from the first page of the book's pdf
  }

  componentWillMount() {
    this.searchBookDetails();
  }

  async searchBookDetails() {
    this.setState({
      loading: true
    });
    let url = null;
    if (this.props.match.params.id) {
      let api = "https://www.googleapis.com/books/v1/volumes/";
      // let page = this.state.page;
      // if (page === 0 || page === undefined) {
      //   url = api + this.state.searchTerm + "&startIndex=0&maxResults=20";
      // } else {
      url = api + this.props.match.params.id;
    }
    try {
      const response = await axios.get(url);
      console.log(response);
      this.setState({ data: response.data, loading: false });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  render() {
    let body = null;

    var comments = [
      ["user1", "comment1", "5"],
      ["user2", "comment2", "4"],
      ["user3", "comment3", "5"],
      ["user4", "comment4", "4"]
    ];

    console.log(this.props.match.params.id);

    if (!this.props.auth.uid) return <Redirect to="/" />;

    if (this.state.loading) {
      body = (
        <div>
          <h1>BOOK DETAILS</h1>
          <br />
          Loading...
        </div>
      );
    } else if (this.state.error) {
      body = (
        <div>
          <h1>404: Book not found</h1>
        </div>
      );
    } else if (this.state.data) {
      let img = null;
      img = (
        <img
          alt="BookCover"
          src={this.state.data.volumeInfo.imageLinks.thumbnail}
        />
      );
      body = (
        <div>
          <Row style={{ margin: "20px" }}>
            <Col style={{ border: "solid" }}>
              <Row className="BookDescription">
                <Col xs={12} md={3} lg={3}>
                  {/* <Image
                src={require("../image/" + this.state.image)}
                alt="BookCover"
                style={{ maxwidth: "100%" }}
              /> */}
                  {/* <Image
                    src={img}
                    alt="BookCover"
                    style={{ maxwidth: "100%" }}
                  /> */}
                  {img}
                </Col>
                <Col style={{ textAlign: "left" }}>
                  <h1>{this.state.data.volumeInfo.tite}</h1>
                  <p>
                    <b>Author:</b> {this.state.data.volumeInfo.authors}
                  </p>
                  <p>
                    <b>Rating:</b> {this.state.data.volumeInfo.averageRating}
                  </p>
                  <p>
                    <b> Description:</b> {this.state.data.volumeInfo.subtitle}
                  </p>
                  <p>
                    <b> Description:</b> {this.state.data.volumeInfo.subtitle}
                  </p>
                  <p>
                    <a href={this.state.data.volumeInfo.previewLink}>
                      Preview Book
                    </a>
                  </p>
                </Col>
              </Row>
              <Row className="Comments">
                <Col style={{ textAlign: "left" }}>
                  <h3>Comments</h3>
                  {comments.map(function(comment, index) {
                    return (
                      <div key={index}>
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
        </div>
      );
    }
    console.log(body);
    return body;
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
