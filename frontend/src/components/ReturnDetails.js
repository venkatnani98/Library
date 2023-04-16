import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {RENT_URL, RENT_URL_2} from "../constants"
import './css/Library.css';
import './css/LibraryStu.css';
import axios from "axios";
import Returns from "./Returns";



class ReturnDetails extends Component {
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
  
  handleUpdate = (item)=>{
    this.props.getData(item);
  }
  
 
  render() {
    const {data} = this.state;
    return (
      <>
        <table className="rtndetails">
          <thead>
            <tr className="bDrow">  
              <th>Book Id</th>
              <th>Borrowed On</th>
              <th>Return By</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map(item => (
              <tr key={item.id}>
                <td>{item.BookId || ""}</td>
                <td>{item.Rent_Date || ""}</td>
                <td>{item.Return_Date || ""}</td>
                <td><button onClick={()=> this.handleUpdate(item)}>Select</button></td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </>
    );
  }
}

export default ReturnDetails;
