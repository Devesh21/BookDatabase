import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import Favourite from "./Favourite.js";
import Comments from "./Comment.js";
import CommentsDisplay from './CommentsDisplay';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../config/firebaseConfig";
const firestore = firebase.firestore();

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      loading: false
    };
  }

  componentWillMount() {
    this.searchBookDetails();
  }

  transform(book) {
    let ret = {};
    ret.volumeInfo = {};
    ret.volumeInfo.imageLinks = { thumbnail: book.coverFile };
    ret.volumeInfo.title = book.bookName;
    ret.volumeInfo.authors = [book.author];
    ret.volumeInfo.averageRating = null;
    ret.volumeInfo.subtitle = book.bookName;
    ret.volumeInfo.description = book.description;
    ret.volumeInfo.previewLink = book.bookFile;

    return ret;
  }

  addToFavourites = (e) => {
    const bookId = this.props.match.params.id;
    console.log("bookId: ",bookId);
    const {auth} = this.props;
    const uid = auth.uid;
    console.log("userId: ", uid);
    var favouriteBook;
    let favouriteBooks = [];
    firestore
      .collection(`users`).doc(uid)
      .get()
      .then(snapshot => {
          console.log(snapshot.data());
          favouriteBook = snapshot.data().favouriteBooks;
          console.log(favouriteBook);
          // favouriteBooks.push(favouriteBook);
          favouriteBook.push({bookId: bookId});
          console.log(favouriteBook);
          
          firestore.collection('users').doc(uid).update({
            "favouriteBooks" : favouriteBook
          }).then(()=> {
            console.log("updated!");
          })
      })
      .then(() => {
        // this.setState({ books: books });
        console.log(favouriteBook);
      });

  }

  async searchBookDetails() {
    this.setState({
      loading: true
    });

    console.log("Book props:", this.props);
    let url = null;
    if (
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.bookData
    ) {
      let newData = this.transform(this.props.location.state.bookData);
      this.setState({
        data: newData,
        loading: false
      });
    } else if (this.props.match.params.id) {
      let api = "https://www.googleapis.com/books/v1/volumes/";
      url = api + this.props.match.params.id;

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
  }

  render() {

    const bookId = this.props.match.params.id;
    const {auth} = this.props;

    console.log("BookDetails:", this.props);
    let body = null;

    var comments = [
      ["user1", "comment1", "5"],
      ["user2", "comment2", "4"],
      ["user3", "comment3", "5"],
      ["user4", "comment4", "4"]
    ];

    console.log(this.props.match.params.id);
    //console.log(this.props);

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
          width="260px"
          height="300px"
          style={{ padding: "8px" }}
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
                  <h1>{this.state.data.volumeInfo.title}</h1>
                  <p>
                    <b>Author:</b> {this.state.data.volumeInfo.authors}
                  </p>
                  <p>
                    <b>Rating:</b>{" "}
                    {this.state.data.volumeInfo.averageRating
                      ? this.state.data.volumeInfo.averageRating
                      : "NA"}
                  </p>
                  <p>
                    <b> Subtitle:</b> {this.state.data.volumeInfo.subtitle}
                  </p>
                  <p>
                    <b> Description:</b>{" "}
                    {this.state.data.volumeInfo.description}
                  </p>
                  <p>
                    <a href={this.state.data.volumeInfo.previewLink}>
                      Preview Book
                    </a>
                  </p>
                  <button onClick={this.addToFavourites}>Add to favourites</button>
                </Col>
              </Row>
              <Row className="Comments">
                <Col style={{ textAlign: "left" }}>
                  <h3>Comments</h3>
                  <CommentsDisplay bookDetails={bookId} />
                </Col>
              </Row>
              <Comments bookDetails={bookId} userId={auth.uid}/>
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
