import React, { Component } from 'react'
import Rsidebar from './Rsidebar'
import Timenow from './timeNow'
import NavBars from './NavBars'



export class Home extends Component {
  render() {
    return (
      <>
      {<NavBars/>}
      {/* <AdminNav/> */}
      <div id='Rsidebar'><Rsidebar/></div>
      <div id='Time'><Timenow/></div>
      </>
    )
  }
}

export default Home