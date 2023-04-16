import React, { Component } from 'react'
import { RENT_URL } from '../constants';
import axios from 'axios';

export default class NewRents extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: []
      };
    }

    componentDidMount(){
        axios.get(RENT_URL)
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
        <table className="rentDisplaymain">
          <thead>
            <tr>
                <th colSpan={4}>New Rentals</th>
            </tr>
            <tr className="bDrow">
              <th>PIN</th>
              <th>User Name</th>
              <th>Book Id</th>
              <th>Booked On</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map(item => (
              <tr key={item.id}>
                <td>{item.PIN || ""}</td>
                <td>{item.FirstName || ""}</td>
                <td>{item.BookId || ""}</td>
                <td>{item.Rent_Date || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
