import React, { Component } from 'react'
import './css/Library.css'

export default class SavingFailed extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
    
      }
    }
  render() {
    return (
        <div className="transaction-saved-popup">
        <p>Details not Saved - Something went Wrong:</p>
        <p>{this.props.error}</p>
        <p>{this.props.error1}</p>
      </div>
    )
  }
}
