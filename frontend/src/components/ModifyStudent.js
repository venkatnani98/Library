import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import './css/LibraryStu.css'
import './css/Library.css'
import { STU_URL } from '../constants/stu'
import axios from 'axios'
import Home from './Home'

export default class ModifyStudent extends Component {
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

    handleInputChange  = event =>{
    const{name,value} = event.target;
    this.setState({[name] : value});
    }



    handleSubmit = event =>{
    event.preventDefault();
    const{FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year} = this.state
    axios.put( (STU_URL+ PIN) , {FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year})
    .then(res => {console.log(res);
    this.props.update();})
    .catch(err => console.log(err));
    this.props.onClick()
    }
    
  render() {
    const {FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year} = this.state
    return (
        <>
        
        <div className='modStu'>
            <center>
            <h1>Modify Student Details</h1>
            <h2>Modify Book</h2><button id='Stuclose' onClick={this.props.onClick}>Close</button>
            <form  onSubmit={this.handleSubmit}>
            <table>
                <tr>
                    <td>First Name</td>
                    <td><input className = 'as_input' type="text" name='FirstName' value={FirstName} onChange = {this.handleInputChange} /></td>
                    <td>Last Name</td>
                    <td><input className = 'as_input' type="text" name='LastName' value={LastName} onChange = {this.handleInputChange} /></td>
                </tr>
                <tr>
                    <td>Father Name</td>
                    <td><input className = 'as_input' type="text" name='FatherName' value={FatherName} onChange = {this.handleInputChange}/></td>
                    <td>Date of Birth</td>
                    <td><input className = 'as_input' type="date" name='DOB' value={DOB} onChange = {this.handleInputChange} /></td>  
                </tr>
                <tr className='as_input_gender'>
                    <td className='as_input_gender'>Gender</td>
                    <td className='as_input_gender'>
                    <fieldset>
                        <table>
                            <tr>
                                <td>Male</td>
                                <td><input type="radio" name="Gender" value={Gender} onChange = {this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Female</td>
                                <td><input type="radio" name="Gender" value={Gender} onChange = {this.handleInputChange}/></td>
                            </tr>
                            <tr>
                                <td>Prefer not to say</td>
                                <td><input type="radio" name="Gender" value={Gender} onChange = {this.handleInputChange}/></td>
                            </tr>
                        </table>
                    </fieldset>
                    </td>
                    <td>PIN</td>
                    <td><input className='as_input' type="text" name = 'PIN' value={PIN} onChange = {this.handleInputChange} readOnly /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input className = 'as_input' type="email" name='Email' value={Email} onChange = {this.handleInputChange} /></td>
                    <td>Mobile</td>
                    <td><input className = 'as_input' type="number" name='Mobile' value={Mobile} onChange = {this.handleInputChange}/></td>
                </tr>
                <tr>
                <td>Branch</td>
                    <td><select className = 'ass_input' name="Branch" value={Branch} onChange = {this.handleInputChange}>
                            <option value="">Select a Branch</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Electrical">Electrical</option>
                            <option value="ComputerScience">Computer Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>
                    <td>Year</td>
                    <td>
                        <select className = 'ass_input' name="Year" value={Year} onChange = {this.handleInputChange}>
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
                    
                </tr>
                
            </table>
            <input className='submit' type="submit" value={'Modify Student'}/>
            </form>
            </center>
            <Outlet/>
        </div>
        </>
    )
  }
}
