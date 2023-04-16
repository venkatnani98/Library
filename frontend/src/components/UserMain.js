import logo from './static/logo.png'
import React, { Component } from 'react'
import BookStock from './BookStock'
import UserRentsMain from './UserRentsMain'

export default class UserMain extends Component {
 

  render() {
    return (
      <div className='mainUser'>
        <p id='mainWelcome'>Welcome to Library <br /> 
        &gt;---------------------------------------------<br/>
        ----------------------------------------------&lt;</p>
        <img src= {logo} alt="logo" id="home_main_logo_main"/>
        <div id='newRentsUser'><UserRentsMain/></div>
        <div id='bookStockUser'><BookStock/></div>
      </div>
    )
  }
}
