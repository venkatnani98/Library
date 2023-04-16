import React, { Component } from "react";
import './css/Library.css';
import ModifyStudent from "./ModifyStudent";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  clickEdit = () => {
    this.setState({ isEditing: !this.state.isEditing, });
  };

  update=()=>{
    this.props.update();
  }

  render() {
    const PIN = this.props.PIN;

    if (!PIN) {
      // If the id prop is not available yet, don't render anything
      return null;
    }
    if (this.state.isEditing) {
      return  (  <div className="overlay"> 
                   <div className="popup">
                      <div className="popup-content">
                          <ModifyStudent PIN={PIN} onClick={this.clickEdit} update = {this.update}/>
                      </div>
                  </div>
                 </div> )
    }
    return (
      <>
        <button type="button" id="editbtn" onClick={this.clickEdit}>
          Edit
        </button>
        
      </>
    );
  }
}

export default EditStudent;
