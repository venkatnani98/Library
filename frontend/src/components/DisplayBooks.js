import React, { Component, useContext } from "react";
import { NavLink } from "react-router-dom";
import {API_URL} from "../constants"
import './css/Library.css';
import axios from "axios";
import Delete from "./Delete";
import Edit from "./Edit";
import { AuthContext } from '../context/AuthContext';



class DisplayBooks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        update:false
      };
    }

  componentDidMount() {
    axios.get(API_URL)
      .then(response => {
        console.log(response.data); // Check the response data in console
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  update = (e)=>{
    axios.get(API_URL)
      .then(response => {
        console.log(response.data); // Check the response data in console
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
      
  };

  static contextType = AuthContext;
 
  render() {
    // const {name} = this.context;
    // console.log(name);
    console.log(this.state);
    const {data} = this.state;
    return (
      <>
      <div className="containerComponent">
       <h1 id="dbooks">All Books</h1>
        <table className="bookDisplay">
          <thead>
            <tr className="bDrow">
              <th>Book Id</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Stock</th>
              <th>
                <NavLink className="addbooknav" to="/addbook" >Add Book</NavLink>
              </th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map(item => (
              <tr key={item.BookId}>
                <td>{item.BookId || ""}</td>
                <td>{item.BookName || ""}</td>
                <td>{item.Author || ""}</td>
                <td>{item.Branch || ""}</td>
                <td>{item.Year || ""}</td>
                <td>{item.Stock || ""}</td>
                <td><Edit BookId = {item.BookId} update = {this.update} /></td>
                <td>
                   &nbsp;&nbsp;
                  <Delete
                    BookId = {item.BookId}
                    update = {this.update}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </>
    );
  }
}

export default DisplayBooks;
