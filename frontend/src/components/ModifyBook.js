import React, { Component, useState } from 'react'
import { Outlet, redirect } from 'react-router-dom'
import './css/Library.css'
import axios from 'axios';
import { API_URL } from '../constants';
import DisplayBooks from './DisplayBooks';


export default class ModifyBook extends Component {
  constructor(props){
    super(props);

    this.state = {
        BookId : '',
        BookName : '',
        Author : '',
        Branch : '',
        Year : '',
        Stock : '',
    };
  }
  
  componentDidMount() {
    const BookId = this.props.BookId
    axios.get(API_URL + BookId)
    .then(response =>{
        const {BookId,BookName,Author,Branch,Year,Stock} = response.data.data;
        this.setState({BookId,BookName,Author,Branch,Year,Stock});
    })
    .catch(err => console.log(err));
  }

  handleInputChange  = event =>{
    const{name,value} = event.target;
    this.setState({[name] : value});
  }



  handleSubmit = event =>{
    event.preventDefault();
    const{BookId,BookName,Author,Branch,Year,Stock} = this.state
    axios.put( (API_URL+ BookId) , {BookId,BookName,Author,Branch,Year,Stock})
    .then(res => {
      this.props.update();
      this.props.onClick();
    })
    .catch(err => console.log(err));
    // this.handleClick()
  }

  handleClick = () => {
    window.location.replace('/display');
  };

  render() {
    const {BookId,BookName,Author,Branch,Year,Stock} = this.state;
    return (
        <>
        
      <center>
      <div className="modify">
        <h2>Modify Book</h2><button id='close' onClick={this.props.onClick}>Close</button>
        <form onSubmit={this.handleSubmit}>
            <table>
                <tr>
                    <td>Book Id</td>
                    <td><input className = 'mb_input' type="text" name='BookId' value={BookId} onChange = {this.handleInputChange} readOnly/></td>
                </tr>
                <tr>
                    <td>Book Name</td>
                    <td><input className = 'mb_input' type="text" name='BookName' value={BookName} onChange = {this.handleInputChange}/></td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td><input className = 'mb_input' type="text" name='Author' value={Author} onChange = {this.handleInputChange}/></td>
                </tr>
                <tr>
                    <td>Branch</td>
                    <td><select className = 'mb_input' name="Branch" value={Branch} onChange = {this.handleInputChange}>
                            <option value="">Select a Branch</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Electrical">Electrical</option>
                            <option value="ComputerScience">Computer Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="other">Other</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Year</td>
                    <td>
                        <select className = 'mb_input' name="Year" value={Year} onChange = {this.handleInputChange}>
                            <option value="">None</option>
                            <option value="Common">Common</option>
                            <option value="I">I Year</option>
                            <option value="II">II Year</option>
                            <option value="III">III Year</option>
                            <option value="IV">IV Year</option>
                            
                        </select>
                        </td>
                </tr>
                <tr>
                    <td>Stock</td> 
                    <td><input className = 'mb_input' type="number" name='Stock' value={Stock} onChange = {this.handleInputChange}/></td>
                </tr>
            </table>
            <input className='submit' type="submit" value="Save Book Details"/>
        </form>
      <Outlet/>
      </div>
      </center>
      </>
    )
  }
}
