import React, { Component } from "react";
import './css/Library.css';
import UserRent from "./UserRent";


class UserAddRent extends Component {
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
    const BookId = this.props.BookId;

    if (!BookId) {
      return null;
    }
    if (this.state.isEditing) {
      return  (  <div className="vwoverlay"> 
                   <div className="vwpopup">
                      <div className="vwpopup-content">
                          <UserRent BookId={BookId} onClick={this.clickEdit}/>
                      </div>
                  </div>
                 </div> )
    }
    return (
      <>
        <button type="button" id="editbtn" onClick={this.clickEdit}>
          Rent this Book
        </button>
        
      </>
    );
  }
}

export default UserAddRent;
