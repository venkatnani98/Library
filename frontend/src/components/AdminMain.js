import logo from './static/logo.png'
import React, { Component } from 'react'
import NewRents from './NewRents'
import BookStock from './BookStock'

export default class AdminMain extends Component {
 

  render() {
    return (
      <div className='mainAdmin'>
        <p id='mainWelcome'>Welcome to Library <br /> 
        &gt;---------------------------------------------<br/>
        ----------------------------------------------&lt;</p>
        <img src= {logo} alt="logo" id="home_main_logo_main"/>
        <div id='newRents'><NewRents/></div>
        <div id='bookStock'><BookStock/></div>
      </div>
    )
  }
}
