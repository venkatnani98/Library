import React, { Component } from 'react';
import './css/Library.css'
import { Outlet } from 'react-router-dom';

class Timenow extends Component {
  constructor(){
    super();
    this.state = { time: Date().toLocaleString() };
  }
  render(){
    return(
      <div className='Timenow'>{ this.state.time } </div>
    );
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date().toLocaleString() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default Timenow;