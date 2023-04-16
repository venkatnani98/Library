import React, { Component } from 'react'
import { NavLink, Outlet } from 'react-router-dom' 
import './css/Library.css'
// import Home from './Home'
// import Home from './Home'


export default class AdminNav extends Component {
  render() {
    return (
      <>
     
      <div className='navbar'>
          
           <ul >
            <li className='nav_main'><NavLink to="/">Home</NavLink></li> 
            <li className='nav_main' id='book_nav'>
               <NavLink to="/display" >Books</NavLink>
                <ul className='nav_main_sub_container_1'>
                    <li className='nav_main_sub'><NavLink to="/addbook" >Add Book</NavLink></li>
                </ul>
            </li>
            <li className='nav_main' id='user_nav'>
                Students Info
                <ul className='nav_main_sub_container_2'>
                    <li className='nav_main_sub'><NavLink to="/addstudent">Add Student</NavLink></li>
                    <li className='nav_main_sub'><NavLink to="/displaystu">All Students Info</NavLink></li>
                </ul>
            </li>
            <li className='nav_main'><NavLink to="/returns">Returns</NavLink></li>
            <li className='nav_main'><NavLink to="/searchall">Rent A Book</NavLink></li>
            <li className='nav_main'><NavLink to="/dues">Dues</NavLink></li>
           </ul>
           
          <Outlet/>
          
      </div>
      </>
    )
  }
}
