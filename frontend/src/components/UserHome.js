import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import UserNav from './UserNav'
import Rsidebar from './Rsidebar'
import Timenow from './timeNow'



export class UserHome extends Component {
  render() {
    return (
      <>
      <UserNav/>
      <div id='Rsidebar'><Rsidebar/></div>
      <div id='Time'><Timenow/></div>
      <Outlet/>
      </>
    )
  }
}

export default UserHome