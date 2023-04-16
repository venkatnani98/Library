import React, { Component } from "react";
import './css/Library.css';


import axios from "axios";

import { API_URL } from "../constants";

class Delete extends Component {
  

  deleteBook = BookId => {
    if (window.confirm("Do you really wanna delete the Book?")){
      axios.delete(API_URL + BookId).then(() => {
        this.props.update();
    });
  };}

  render() {
    return (
      <>
        <button type="button" id="removebtn" onClick={() => this.deleteBook(this.props.BookId)}>Remove</button>
      </>
    );
  }
}

export default Delete;