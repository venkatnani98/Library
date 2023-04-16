import React, { Component } from 'react';
import axios from 'axios';

class SearchBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 2) {
        this.searchDatabase(this.state.query);
      }
    });
  }

  searchDatabase = (query) => {
    axios.get(`/api/search?q=${query}`)
      .then(res => {
        const results = res.data;
        this.setState({ results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search for keywords..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <ul>
          {this.state.results.map(item =>
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
      </form>
    );
  }
}

export default SearchBtn;
