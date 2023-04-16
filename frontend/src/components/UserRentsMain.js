import React, { Component } from 'react'
import { RENT_URL, RENT_URL_2 } from '../constants';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default class UserRentsMain extends Component {
    static contextType = AuthContext
    constructor(props) {
      super(props)
      this.state = {
        data: []
      };
    }
    
    componentDidMount(){
        const {user} = this.context;
        const PIN = user.data.PIN; 
        axios.get(RENT_URL_2 + PIN)
      .then(response => {
        console.log(response.data); // Check the response data in console
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
    }

  render() {
    const {data} = this.state;
    return (
      <div>
        <table className="rentDisplayuser">
          <thead>
            <tr>
                <th colSpan={4}>My Rentals</th>
            </tr>
            <tr className="bDrow">
              <th>PIN</th>
              <th>User Name</th>
              <th>Book Id</th>
              <th>Return By</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map(item => (
              <tr key={item.id}>
                <td>{item.PIN || ""}</td>
                <td>{item.FirstName || ""}</td>
                <td>{item.BookId || ""}</td>
                <td>{item.Return_Date || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
