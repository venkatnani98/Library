import React, { Component } from 'react'
import { NavLink, Outlet } from 'react-router-dom' 
import './css/Library.css'
// import Home from './Home'

export default class UserNav extends Component {
  render() {
    return (
      <div className='navbar'>
           
           <ul >
            <li className='nav_main'><NavLink to="/">Home</NavLink></li> 
            <li className='nav_main' id='book_nav'>
            <NavLink to="/mybooks">My Books</NavLink>
            </li>
            <li className='nav_main'><NavLink to='/search' >Search Book and Rent</NavLink></li>
           </ul>
      </div>
    )
  }
}
