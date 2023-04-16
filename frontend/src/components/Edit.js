import React, { Component } from "react";
import './css/Library.css';
import ModifyBook from "./ModifyBook";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      update:false
    };
  }

  clickEdit = () => {
    this.setState({ isEditing: !this.state.isEditing, });
  };

  update =()=>{
    console.log("update1")
    this.setState({update:!this.state.update});
    this.props.update();
  }

  render() {
    const BookId = this.props.BookId;

    if (!BookId) {
      // If the id prop is not available yet, don't render anything
      return null;
    }
    if (this.state.isEditing) {
      return  (  <div className="overlay"> 
                   <div className="popup">
                      <div className="popup-content">
                          <ModifyBook BookId={BookId} onClick={this.clickEdit} update={this.update}/>
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

export default Edit;
