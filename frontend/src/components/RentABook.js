import React, { Component } from "react";
import { API_URL, SRCH_URL } from "../constants";
import "./css/LibraryStu.css";
import axios from "axios";
import AddRent from "./AddRent";

class RentABook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const key = this.props.value;
    console.log(key)
    axios
      .get(SRCH_URL + key)
      .then(response => {
        console.log(response.data); // Check the response data in console
        this.setState({data: response.data});
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <h2 id="renttitle">Rent A Book</h2>
        <table className="bookDisplay">
          <thead>
            <tr className="bDrow">
              <th>Book Id</th>
              <th>Book Name</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map((item) => ( 
                 <tr key={item.BookId}>
                 <td>{item.BookId || ""}</td>
                 <td>{item.BookName || ""}</td>
                 <td>{item.Branch || ""}</td>
                 <td>{item.Year || ""}</td>
                 <td>{item.Stock || ""}</td>
                 <td>
                   &nbsp;&nbsp;
                  {(item.Stock == 0) ? "" :<AddRent
                    BookId = {item.BookId}
                  />}
                </td>
                </tr>
              ))} 
          </tbody>
        </table>
        
      </>
    );
  }
}

export default RentABook;
