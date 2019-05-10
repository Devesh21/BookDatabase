import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      searchTerm: undefined,
      searchData: undefined
    };
  }
  async getBooks() {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes/?"
      );
      this.setState({ data: response.data });
      console.log(this.data);
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount() {
    //  this.getBooks();
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({ searchTerm: value }, () => {
      this.searchBooks();
    });
  };

  onSubmit(e) {
    e.preventDefault();
  }
  async searchBooks() {
    if (this.state.searchTerm) {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes/?q=" +
            this.state.searchTerm +
            "&maxResults=40"
        );
        this.setState({ searchData: response.data });
      } catch (e) {
        console.log(e);
      }
    }
  }
  render() {
    let body = null;
    let li = null;
    if (this.state.searchTerm) {
      li =
        this.state.searchData &&
        this.state.searchData.items.map(book => {
          // let book = books.book;

          return (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.volumeInfo.title}</Link>
            </li>
          );
        });
    }
    //  else {
    //   li =
    //     this.state.data &&
    //     this.state.data.items.map(book => (
    //       <li key={book.id}>
    //         <Link to={`/books/${book.id}`}>{book.volumeInfo.title}</Link>
    //       </li>
    //     ));
    // }
    body = (
      <div>
        <form method="POST" name="formName" onSubmit={this.onSubmit}>
          <label>
            {" "}
            Search Term:
            <input type="text" name="searchTerm" onChange={this.handleChange} />
          </label>
        </form>
        <ul className="list-unstyled">{li}</ul>
      </div>
    );

    return body;
  }
}

export default SearchBooks;
