import React, { Component } from "react";
import './css/Library.css';
import StudentView from "./StudentView";


class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  clickEdit = () => {
    this.setState({ isEditing: !this.state.isEditing, });
  };

  

  render() {
    const PIN = this.props.PIN;

    if (!PIN) {
      return null;
    }
    if (this.state.isEditing) {
      return  (  <div className="vwoverlay"> 
                   <div className="vwpopup">
                      <div className="vwpopup-content">
                          <StudentView PIN={PIN} onClick={this.clickEdit}/>
                      </div>
                  </div>
                 </div> )
    }
    return (
      <>
        <button type="button" id="editbtn" onClick={this.clickEdit}>
          View Details
        </button>
        
      </>
    );
  }
}

export default View;
