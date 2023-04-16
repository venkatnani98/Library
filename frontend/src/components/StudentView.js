import React, { Component } from 'react'
import axios from 'axios';
import { STU_URL } from '../constants/stu';
import './css/Library.css'

export default class StudentView extends Component {
    constructor(props){
    super(props);
        
            this.state = {
                FirstName:"", LastName:"", FatherName:"", DOB:"", Gender:"", PIN:"", Email:"", Mobile:"", Branch:"", Year:"" };
        
    }
            componentDidMount() {
                const PIN = this.props.PIN
                axios.get(STU_URL + PIN)
                .then(response =>{
                    const {FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year} = response.data.data;
                    this.setState({FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year});
                })
                .catch(err => console.log(err));
                }
  
  render() {
    return (
      <div className='StuView'>
        
        <table>
            <tbody>
                
                <tr>
                    <th>First Name :</th>
                    <td>{this.state.FirstName}</td>
                    <th>Last Name :</th>
                    <td>{this.state.LastName}</td>
                </tr>
                <tr>
                    <th>Father Name :</th>
                    <td>{this.state.FatherName}</td>
                    <th>Date of Birth :</th>
                    <td>{this.state.DOB}</td>
                </tr>
                <tr>
                    <th>Gender :</th>
                    <td>{this.state.Gender}</td>
                    <th><b>PIN :</b></th>
                    <td><b>{this.state.PIN}</b></td>
                </tr>
                <tr>
                    <th>Email :</th>
                    <td>{this.state.Email}</td>
                    <th>Mobile :</th>
                    <td>{this.state.Mobile}</td>
                </tr>
                <tr>
                    <th>Branch :</th>
                    <td>{this.state.Branch}</td>
                    <th>Year :</th>
                    <td>{this.state.Year}</td>
                </tr>
            </tbody>
        </table>
        <button id='Viewclose' onClick={this.props.onClick}>Close</button>
      </div>
    )
  }
}
