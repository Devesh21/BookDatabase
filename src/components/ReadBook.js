import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

// practically pseudocode, not finished
// still have to figure out how to pass book pdf to this page
class ReadBook extends Component {
    state = {
        numPages: null,
        pageNumber: 1
    }

    goToPrevPage = () => {
        if (state.pageNumber > 1) {
            this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
        }
    }
    goToNextPage = () => {
        if (state.pageNumber < state.numPages) {
            this.setState(state => ({ pageNumber: state.pageNumber + 1}));
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div>
                <nav>
                    <button onClick={this.goToPrevPage}>Prev</button>
                    <button onClick={this.goToNextPage}>Next</button>
                </nav>

                <Document file="file.pdf" onLoadSuccess={this.onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber}/>
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
            </div>
        );
    }
}

export default ReadBook;