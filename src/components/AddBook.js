import React, { Component } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { createBook } from "../store/actions/bookActions";
import uuid from "uuid/v4";
import firebase from "../config/firebaseConfig";

const storage = firebase.storage();

class AddBook extends Component {
  state = {
    bookName: "",
    author: "",
    description: "",
    coverFile: null,
    coverUid: "",
    bookFile: null,
    bookUid: "",
    progressCover: 0,
    progressBook: 0
  };

  handleCoverChange = e => {
    if (e.target.files[0]) {
      const coverFile = e.target.files[0];
      const testcoverFile = e.target.files[0].name + "";
      // console.log(coverFile);
      this.state.coverFile = coverFile;
      var ext = testcoverFile.split(".").pop();
      ext = testcoverFile.match(/\.([^\.]+)$/)[1];
      switch (ext) {
        case "jpg":
        case "png":
          // alert("Allowed");
          break;
        default:
          alert("Not a Valid file type. Please select .jpg/.png format");
          e.target.value = null;
          this.state.coverFile = null;
      }
      // console.log(this.state);
    }
  };

  handleBookChange = e => {
    if (e.target.files[0]) {
      const bookFile = e.target.files[0];
      // console.log(bookFile);
      this.state.bookFile = bookFile;
      // console.log(this.state);
      const testbookFile = e.target.files[0].name + "";
      // console.log(bookFile);
      this.state.bookFile = bookFile;
      var ext = testbookFile.split(".").pop();
      ext = testbookFile.match(/\.([^\.]+)$/)[1];
      switch (ext) {
        case "pdf":
          // alert("Allowed");
          break;
        default:
          alert("Not a Valid file type. Please select .pdf format");
          this.state.coverFile = "";
      }
    }
  };

  handleChange = e => {
    // console.log("in handle change");

    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const img = this.state.coverFile;
    const coverUid = "cover-" + uuid();
    this.setState({ coverUid });
    const upload = storage.ref(`covers/${coverUid}`).put(img);
    upload.on(
      "state_changed",
      snapshot => {
        // progress function :

        const progressCover = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progressCover });
        // console.log(this.state.progressCover);
      },
      error => {
        // error function
        console.log(error);
      },
      () => {
        // completed function
        storage
          .ref("covers")
          .child(coverUid)
          .getDownloadURL()
          .then(coverFile => {
            this.setState({ coverFile });
            // console.log(this.state);

            const book = this.state.bookFile;
            const bookUid = "book-" + uuid();
            this.setState({ bookUid });
            const uploadBook = storage.ref(`books/${bookUid}`).put(book);
            uploadBook.on(
              "state_changed",
              snapshot => {
                // progress function
                const progressBook = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progressBook });
              },
              error => {
                // error function
                console.log(error);
              },
              () => {
                // completed function
                storage
                  .ref("books")
                  .child(bookUid)
                  .getDownloadURL()
                  .then(bookFile => {
                    this.setState({ bookFile });
                    // console.log(this.state);
                    this.props.createBook(this.state);
                    this.props.history.push("/");
                  });
              }
            );
          });
      }
    );
  };

  componentDidMount() {
    const { auth } = this.props;
    const uid = auth.uid;
    this.state.uid = uid;
  }

  render() {
    return (
      <div className="AddBook" style={{ margin: "50px" }}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Form.Label style={{ float: "left" }}>Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              id="bookName"
              onChange={this.handleChange}
              placeholder="Name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label style={{ float: "left" }}>Author</Form.Label>
            <Form.Control
              type="text"
              id="author"
              onChange={this.handleChange}
              placeholder="Author"
              required
            />
          </FormGroup>
          <Form.Group>
            <Form.Label style={{ float: "left" }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              id="description"
              onChange={this.handleChange}
              rows="3"
              placeholder="Description"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ float: "left" }}>Select Cover</Form.Label>
            <input
              type="file"
              id="coverFile"
              name="CoverFile"
              accept=".png, .jpg"
              required
              style={{ position: "left", display: "block", padding: "0 20px" }}
              onChange={this.handleCoverChange}
            />
            <progress value={this.state.progressCover} max="100" />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ float: "left" }}>Select Book</Form.Label>
            <input
              type="file"
              id="bookFile"
              name="BookFile"
              accept=".pdf"
              required
              style={{ position: "left", display: "block", padding: "0 20px" }}
              onChange={this.handleBookChange}
            />
            <progress value={this.state.progressBook} max="100" />
          </Form.Group>
          <Button
            type="submit"
            style={{
              position: "left",
              display: "block",
              padding: "10px 20px",
              clear: "both"
            }}
          >
            Add Book
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createBook: newBook => dispatch(createBook(newBook))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBook);
