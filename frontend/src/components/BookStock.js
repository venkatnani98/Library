import React, { Component } from 'react'
import { API_URL, RENT_URL } from '../constants';
import axios from 'axios';

export default class BookStock extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: []
      };
    }

    componentDidMount(){
        axios.get(API_URL)
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
                <th colSpan={3}>Book Stocks</th>
            </tr>
            <tr className="bDrow">
              <th>Book Id</th>
              <th>Book Name</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map(item => (
              <tr key={item.BookId}>
                <td>{item.BookId || ""}</td>
                <td>{item.BookName || ""}</td>
                <td>{item.Stock || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
