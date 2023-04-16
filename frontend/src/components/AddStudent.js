import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import './css/LibraryStu.css'
import axios from 'axios'
import { STU_URL } from '../constants/stu'
import Home from './Home'
import SavedPopup from './SavedPopup'
import { REGISTER_URL } from '../constants'

export default class AddStudent extends Component {

    state = { showPopup : false,
       formData :{ id:0, FirstName:"", LastName:"", FatherName:"", DOB:"", Gender:"", PIN:"", Email:"", Mobile:0, Branch:"", Year:""},
       password : "Pass123",
    }

    componentDidMount(){
        if(this.props.stu){
            const{id, FirstName, LastName, FatherName, DOB, Gender, PIN, Email, Mobile, Branch, Year} = this.props.stu;
            this.setState({id, FirstName, LastName, FatherName, DOB, Gender, PIN, Email, Mobile, Branch, Year})
        }
    }

    resetState(){
        this.setState({
            id:0, FirstName:"", LastName:"", FatherName:"", DOB:"", Gender:"", PIN:"", Email:"", Mobile:0, Branch:"", Year:""
        })
    }

    toggle() {
        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
        }

    onChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            formData: {
              ...this.state.formData,
              [name]: value
            }
          });
        }

    createBook = e => {
            e.preventDefault();
            axios.post(STU_URL, this.state.formData).then(() => {
                this.resetState();
                this.toggle();
                this.setState({showPopup:true})
                setTimeout(() => {
                    this.setState({showPopup:false});
                  }, 3000);
            });
            const PIN = this.state.formData.PIN;
            const FirstName = this.state.formData.FirstName;
            const Email = this.state.formData.Email;
            const Password = this.state.password;
            const data = {PIN: PIN, first_name : FirstName, email:Email, password : Password };
            console.log(data);
            axios.post(REGISTER_URL, data ).then(res => {
                console.log(res); 
              })
              .catch(error => {
                console.error(error);
              });
          }

    defaultIfEmpty = value =>{
            return value === ""?"" : value;
            
        };

  render() {
    return (
        <div className='addStu'>
            <center>
            <h1>Add a Student</h1>
            <form onSubmit={this.createBook}>
        
            <table>
                <tr>
                    <td>First Name</td>
                    <td><input className = 'as_input' type="text" name='FirstName' value={this.defaultIfEmpty(this.state.FirstName)} onChange = {this.onChange} /></td>
                    <td>Last Name</td>
                    <td><input className = 'as_input' type="text" name='LastName' value={this.defaultIfEmpty(this.state.LastName)} onChange = {this.onChange}/></td>
                </tr>
                <tr>
                    <td>Father Name</td>
                    <td><input className = 'as_input' type="text" name='FatherName' value={this.defaultIfEmpty(this.state.FatherName)} onChange = {this.onChange}/></td>
                    <td>Date of Birth</td>
                    <td><input className = 'as_input' type="date" name='DOB' value={this.defaultIfEmpty(this.state.DOB)} onChange = {this.onChange}/></td>  
                </tr>
                <tr className='as_input_gender'>
                    <td className='as_input_gender'>Gender</td>
                    <td className='as_input_gender'>
                    <fieldset>
                        <table>
                            <tr>
                                <td>Male</td>
                                <td><input type="radio" name="Gender" value='Male' onChange = {this.onChange}/></td>
                            </tr>
                            <tr>
                                <td>Female</td>
                                <td><input type="radio" name="Gender" value='Female' onChange = {this.onChange}/></td>
                            </tr>
                            <tr>
                                <td>Prefer not to say</td>
                                <td><input type="radio" name="Gender" value='Prefer Not to Say' onChange = {this.onChange}/></td>
                            </tr>
                        </table>
                    </fieldset>
                    </td>
                    <td>PIN</td>
                    <td><input className='as_input' type="text" name='PIN' value={this.defaultIfEmpty(this.state.PIN)} onChange = {this.onChange} /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input className = 'as_input' type="email" name='Email' value={this.defaultIfEmpty(this.state.Email)} onChange = {this.onChange}/></td>
                    <td>Mobile</td>
                    <td><input className = 'as_input' type="number" name='Mobile' value={this.defaultIfEmpty(this.state.Mobile)} onChange = {this.onChange}/></td>
                </tr>
                <tr>
                <td>Branch</td>
                    <td><select className = 'ass_input' name="Branch" value={this.defaultIfEmpty(this.state.Branch)} onChange = {this.onChange}>
                            <option value="">Select a Branch</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Electrical">Electrical</option>
                            <option value="ComputerScience">Computer Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="other">Other</option>
                        </select>
                    </td>
                    <td>Year</td>
                    <td>
                        <select className = 'ass_input' name="Year" value={this.defaultIfEmpty(this.state.Year)} onChange = {this.onChange}>
                            <option value="">None</option>
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
            <input className='submit' type="submit" value={'Add Student'}/>
            {this.state.showPopup && <SavedPopup/>}
            </form>
            
            <Outlet/>
            </center>
            
        </div>
    )
  }
}
