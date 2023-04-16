import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import DisplayBooks from "./DisplayBooks";
import NewBookModal from "./NewBookModal";

import axios from "axios";

import { API_URL } from "../constants";
import Home from "./Home";

class Books extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.resetState();
  }

  getBooks = () => {
    axios.get(API_URL).then(res => this.setState({ books: res.data }));
  };

  resetState = () => {
    this.getBooks();
  };

  render() {
    return (
      <>
     
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <DisplayBooks
              books={this.state.books}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewBookModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default Books;