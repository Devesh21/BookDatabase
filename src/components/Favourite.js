import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "../config/firebaseConfig";
//import { isNull } from "util";
const firestore = firebase.firestore();

class Favourite extends Component {
  state = {
    favouritebooks: []
  };

  componentWillMount() {
    if (this.props.refreshParent) {
      this.props.refreshParent.do = () => {
        this.refreshFavs();
      };
    }
    this.refreshFavs();
  }

  refreshFavs() {
    const { auth } = this.props;
    // console.log("in favourite books: ", auth.uid);
    var favouriteBooksList;
    let booksList;
    //var booksToMap = {};
    firestore
      .collection("users")
      .doc(auth.uid)
      .get()
      .then(snapshot => {
        favouriteBooksList = snapshot.data().favouriteBooks;
        this.setState({ favouritebooks: favouriteBooksList }); //this.state.favouritebooks = ;

        // database call for fetching book details
        firestore
          .collection("books")
          .get()
          .then(books => {
            booksList = books.docs;
            favouriteBooksList.forEach(element => {
              booksList.forEach(item => {
                if (item.data().bookUid === element.bookId) {
                  //booksToMap[element.bookId] = item.data();
                  element.bookData = item.data();
                }
              });
            });

            this.forceUpdate();
          });
      });
  }

  render() {
    // let favourites = null;
    let body = null;
    //  favourites = this.state.favouritebooks;

    body = (
      <Col
        className="Favourite"
        lg="3"
        style={{ border: "solid", margin: "0px 10px" }}
      >
        {/* <div>sfdsfsfsfsdf</div> */}
        <Row>
          {this.state.favouritebooks.map(function(item, index) {
            return (
              <Col xs={6} md={4} lg={12} key={index}>
                <Link
                  to={{
                    pathname: `/book/${item.bookId}`,
                    state: {
                      bookData: item.bookData
                    }
                  }}
                  key={index}
                >
                  {item.bookTitle}
                </Link>
              </Col>
            );
          })}
        </Row>
      </Col>
    );
    console.log(body);
    return body;
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Favourite);
