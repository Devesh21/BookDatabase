import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
import BookCard from "../Bookcard";
import { Row, Button } from "react-bootstrap";
import firebase from "../../config/firebaseConfig";
const firestore = firebase.firestore();

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      searchTerm: undefined,
      searchData: undefined,
      page: this.props.match.params.page,
      books: {}
    };
  }

  componentDidMount() {
    this.setState({ page: this.props.match.params.page });
    const books = [];
    firestore
      .collection("books")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          console.log(item.data());
          books.push(item.data());
        });
      })
      .then(() => {
        this.setState({ books: books });
        console.log(this.state);
      });
  }

  handleChange = e => {
    let value = e.target.value;
    this.triggerSearch(value);
  };

  triggerSearch(value) {
    let val = value;
    this.setState({ searchTerm: val }, () => {
      if (this.state.searchType == "Googlesearch") this.searchBooks();
      else this.searchDatabase();
    });
  }

  handleChangeRadio = e => {
    let value = e.target.value;
    let val = this.state.searchTerm;
    this.setState({ searchType: value }, () => {
      this.triggerSearch(val);
    });
  };

  onSubmit(e) {
    e.preventDefault();
  }

  transform(book) {
    let ret = {};
    // ret.original = book;
    ret.id = book.bookUid;
    ret.volumeInfo = {};
    ret.volumeInfo.imageLinks = { thumbnail: book.coverFile };
    ret.volumeInfo.title = book.bookName;
    ret.volumeInfo.authors = [book.author];
    ret.volumeInfo.averageRating = null;
    ret.volumeInfo.subtitle = book.bookName;
    ret.volumeInfo.description = book.description;
    ret.volumeInfo.previewLink = book.bookFile;
    ret.original = book;
    console.log("ret:", ret);
    return ret;
  }
  async searchDatabase() {
    if (this.state.searchTerm) {
      var bookList = this.state.books;
      let results = {};
      results.items = [];
      results.original = [];
      for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].bookName.indexOf(this.state.searchTerm) >= 0) {
          //results.original[i] = bookList[i];
          results.items[i] = this.transform(bookList[i]);
        }
      }
      console.log("New DAta is", results);

      try {
        this.setState({ searchData: results });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async searchBooks() {
    if (this.state.searchTerm) {
      let url = null;
      let api = "https://www.googleapis.com/books/v1/volumes/?q=";
      let page = this.state.page;
      if (page === 0 || page === undefined) {
        url = api + this.state.searchTerm + "&startIndex=0&maxResults=20";
      } else {
        url =
          api +
          this.state.searchTerm +
          "&startIndex=" +
          page * 20 +
          "&maxResults=20";
      }
      try {
        const response = await axios.get(url);
        console.log("Response", response);
        this.setState({ searchData: response.data });
      } catch (e) {
        console.log(e);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState !== undefined &&
      nextProps.match.params.page !== prevState.page
    ) {
      return { page: nextProps.match.params.page };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.searchBooks();
    }
  }
  render() {
    let body = null;
    let bookCards = null;
    let nextPage = null;
    let previousPage = null;
    let currPage = this.state.page;

    if (this.state.searchData && this.state.searchType === "Googlesearch") {
      if (currPage > 0) {
        previousPage = (
          <Button variant="outline-primary">
            {" "}
            <Link to={`${parseInt(currPage) - 1}`}>Previous</Link>
          </Button>
        );
      }
      if (currPage != null)
        nextPage = (
          <Button variant="outline-primary">
            <Link to={`${parseInt(currPage) + 1}`}>Next</Link>
          </Button>
        );
    }

    bookCards =
      this.state.searchData &&
      this.state.searchData.items.map(book => {
        // let book = books.book;

        return <BookCard key={book.id} book={book} />;
      });

    body = (
      <div style={{ padding: "10px", margin: "20px" }}>
        <form method="POST" name="formName" onSubmit={this.onSubmit}>
          <label>
            {" "}
            <div
              style={{
                backgroundColor: "#007bff",
                color: "white",
                "font-size": "20px"
              }}
            >
              Search Here
            </div>
            <input
              style={{ margin: "0", width: "400px", height: "50px" }}
              type="text"
              name="searchTerm"
              onChange={this.handleChange}
            />
          </label>
          <input
            type="radio"
            id="DBsearch"
            name="searchType"
            value="DBsearch"
            onChange={this.handleChangeRadio}
          />
          <label for="DBsearch">Search BookMaster</label>

          <input
            type="radio"
            id="Googlesearch"
            name="searchType"
            value="Googlesearch"
            onChange={this.handleChangeRadio}
          />
          <label for="Googlesearch">Search Google Books</label>
        </form>
        {previousPage}
        &nbsp; &nbsp;
        {nextPage}
        &nbsp; &nbsp; &nbsp;
        <Row>{bookCards}</Row>
      </div>
    );

    return body;
  }
}

export default SearchBooks;
