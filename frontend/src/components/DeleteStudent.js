import React, { Component } from "react";
import './css/Library.css';


import axios from "axios";

import { STU_URL } from "../constants/stu";

class DeleteStudent extends Component {
  

  deleteStu = PIN => {
    if (window.confirm("Do you really wanna delete the Student?")){
      axios.delete(STU_URL + PIN).then(() => {
      this.props.update();
    });
  };}

  render() {
    return (
      <>
        <button type="button" id="removebtn" onClick={() => this.deleteStu(this.props.PIN)}>Remove</button>
      </>
    );
  }
}

export default DeleteStudent;