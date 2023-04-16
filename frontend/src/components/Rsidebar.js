import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, Outlet } from 'react-router-dom';


export class Rsidebar extends Component {
  static contextType = AuthContext;
  
  render() {
    
    const {user, logout} = this.context;

    if (!user) {
      return <div>Loading...</div>;
    }

    return (
      <div className='Rsidebar'>
        <h3>Welcome {user.data.first_name}</h3>
        <NavLink to="/profile" id='rside_profile'>Profile</NavLink><br />
        {/* {(user.data.account_type == 'admin') ? (<NavLink to="/add/profile" id='rside_profile'>Profile</NavLink>) : (<NavLink to="/user/profile" id='rside_profile'>Profile</NavLink>)}<br /> */}
        <button id='logout'><NavLink onClick={logout}>Logout</NavLink></button>
      </div>
    )
  }
}

export default Rsidebar;

