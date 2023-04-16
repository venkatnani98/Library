import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {RENT_URL, RENT_URL_2} from "../constants"
import './css/Library.css';
import axios from "axios";



class PinDue extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

  componentDidMount() {
    const PIN = this.props.PIN
    axios.get(RENT_URL_2 + PIN)
      .then(response => {
        console.log(response.data); // Check the response data in console
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  Days=(item)=>{
    const Value = item.Days;
    const Days = Value ? parseInt(Value.split(" ")[0]) : 0;
    return Days
  }
 
  render() {
    const {data} = this.state;
    return (
      <>
       <h1 id="rentdata">All Rent Data</h1>
        <table className="rentDisplay">
          <thead>
            <tr className="bDrow">
              <th>PIN</th>
              <th>User Name</th>
              <th>Book Id</th>
              <th>Borrowed On</th>
              <th>Return By</th>
              <th>Returned On</th>
              <th>Total Days</th>
              <th>Due Amount</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map(item => (
              <tr key={item.id}>
                <td>{item.PIN || ""}</td>
                <td>{item.FirstName || ""}</td>
                <td>{item.BookId || ""}</td>
                <td>{item.Rent_Date || ""}</td>
                <td>{item.Return_Date || ""}</td>
                <td>{item.Returned_On || ""}</td>
                <td>{this.Days(item) || ""}</td>
                <td>{item.Due || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </>
    );
  }
}

export default PinDue;
