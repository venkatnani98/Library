import React, { Component } from 'react'
import './css/LibraryStu.css'
import RentABook from './RentABook'
import Home from './Home'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rentpop:false,
      key :""
    };  
  }

  clickSearch = (e) => {
    e.preventDefault();
    this.setState({ Rentpop: !this.state.Rentpop });
  };

  handleInputChange  = event =>{
    const{name,value} = event.target;
    this.setState({[name] : value});
    console.log(this.state)
  };

  

  render() {
    if (this.state.Rentpop){
       const key = this.state.key;
       }
    return (
      <>
      <div className='search'>
           <h1>Search Books</h1>
           <form onSubmit={this.clickSearch}>
            <input type="text" name="key" className='srh_input' value={this.state.key} onChange={this.handleInputChange} placeholder='Enter Book Name Keyword'/>
            <input id='button' className='submit' type="submit" value={(this.state.Rentpop) ? ("Clear"):("Search")}/>
           </form>
      </div>
      {this.state.Rentpop && <div className="rentele"><RentABook value={this.state.key}/></div>}
      </>
    );
  }
}