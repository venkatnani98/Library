import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { STU_URL } from "../constants/stu";
import './css/Library.css';
import axios from "axios";
import Edit from "./Edit";
import DeleteStudent from "./DeleteStudent";
import EditStudent from "./EditStudent";
import View from "./View";



class DisplayStudents extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

  componentDidMount() {
    axios.get(STU_URL)
      .then(response => {
        // console.log(response.data); // Check the response data in console
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  update=() => {
    axios.get(STU_URL)
    .then(response => {
      // console.log(response.data); // Check the response data in console
      this.setState({ data: response.data });
    })
    .catch(error => {
      console.error(error);
    });
  }
 
  render() {
    const {data} = this.state;
    return (
      <>
       <h1 id="dbooks">All Students</h1>
        <table className="stuDisplay">
          <thead>
            <tr className="bDrow">
              <th>First Name</th>
              <th>PIN</th>
              <th>Branch</th>
              <th>Year</th>
              <th>
                <NavLink className="addbooknav" to="/addstudent" >Add Student</NavLink>
              </th>
            </tr>
          </thead>
          <tbody id="tbody">
            {data && data.data && data.data.map(item => (
              <tr key={item.PIN}>
                <td>{item.FirstName || ""}</td>
                <td>{item.PIN || ""}</td>
                <td>{item.Branch || ""}</td>
                <td>{item.Year || ""}</td>
                <td>
                   &nbsp;&nbsp;
                  <View
                    PIN = {item.PIN}
                  />
                </td>
                <td><EditStudent PIN = {item.PIN} update = {this.update}/></td>
                <td>
                   &nbsp;&nbsp;
                  <DeleteStudent
                    PIN = {item.PIN}
                    update = {this.update}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </>
    );
  }
}

export default DisplayStudents;
