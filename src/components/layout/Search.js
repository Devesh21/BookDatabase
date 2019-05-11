import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
import BookCard from "../Bookcard";
import { Row } from "react-bootstrap";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      searchTerm: undefined,
      searchData: undefined,
      page: this.props.match.params.page
    };
  }

  componentDidMount() {
    this.setState({ page: this.props.match.params.page });
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
        console.log(response);
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

  // bookItems(rowNo, rowSize) {
  //   if (this.state.searchData != null && this.state.searchData.items != null) {
  //     return this.state.searchData.items.filter((book, index) => {
  //       let start = rowNo * rowSize;
  //       let end = start + rowSize;
  //       return index >= start && index < end;
  //     });
  //   }
  //   return [];
  // }

  // getArray(n) {
  //   let ret = [];
  //   for (let i = 0; i < n; i++) {
  //     ret.push(i);
  //   }
  //   return ret;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.searchBooks();
    }
  }
  render() {
    let body = null;
    let bookCards = null;
    let nextPage;
    let previousPage;
    let currPage = this.state.page;

    if (this.state.searchData) {
      if (currPage > 0) {
        previousPage = <Link to={`${parseInt(currPage) - 1}`}>Previous</Link>;
      }
      nextPage = <Link to={`${parseInt(currPage) + 1}`}>Next</Link>;
    }
    bookCards =
      this.state.searchData &&
      this.state.searchData.items.map(book => {
        // let book = books.book;

        return <BookCard key={book.id} book={book} />;
      });

    // let cols = (rowNo, rowSize) => {
    //   this.bookItems(rowNo, rowSize).map(book => {
    //     return <Col xs={4}>{book.id}</Col>;
    //   });
    // };
    // let rows = this.getArray(7).map(rowNo => {
    //   return <Row>{cols(rowNo, 3)}</Row>;
    // });

    // li =
    //   this.state.searchData &&
    //   this.state.searchData.items &&
    //   (() => {
    //     return <Container>{rows}</Container>;
    //   });
    body = (
      <div>
        <form method="POST" name="formName" onSubmit={this.onSubmit}>
          <label>
            {" "}
            Search Term:
            <input type="text" name="searchTerm" onChange={this.handleChange} />
          </label>
        </form>
        <Row>{bookCards}</Row>
        {previousPage}
        {nextPage}
      </div>
    );

    return body;
  }
}

export default SearchBooks;

/* <Row>
          <Col xs={4}>1 of 3</Col>
          <Col xs={4}>2 of 3 (wider)</Col>
          <Col xs={4}>3 of 3</Col>
        </Row>

        <Row>
          <Col xs={4}>1 of 3</Col>
          <Col xs={4}>2 of 3 (wider)</Col>
          <Col xs={4}>3 of 3</Col>
        </Row>

        <Row>
          <Col xs={4}>1 of 3</Col>
          <Col xs={4}>2 of 3 (wider)</Col>
          <Col xs={4}>3 of 3</Col>
        </Row>

        <Row>
          <Col xs={4}>1 of 3</Col>
          <Col xs={4}>2 of 3 (wider)</Col>
          <Col xs={4}>3 of 3</Col>
        </Row>

        <Row>
          <Col xs={4}>1 of 3</Col>
          <Col xs={4}>2 of 3 (wider)</Col>
          <Col xs={4}>3 of 3</Col>
        </Row>

        <Row>
          <Col xs={4}>1 of 3</Col>
          <Col xs={4}>2 of 3 (wider)</Col>
          <Col xs={4}>3 of 3</Col>
        </Row>

        <Row>
          <Col xs={4}>1 of 3</Col>
          <Col xs={4}>2 of 3 (wider)</Col>
          <Col xs={4}>3 of 3</Col>
        </Row> */
