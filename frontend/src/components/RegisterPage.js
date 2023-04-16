import React, { Component } from 'react'
import './css/Library.css'
import { REGISTER_URL } from '../constants';
import { STU_URL } from '../constants/stu';
import axios from 'axios';
import SavingFailed from './SavingFailed';

export default class RegisterPage extends Component {
    constructor(props) {
      super(props)
       this.state = {
        PIN:"", FirstName:"", LastName:"", FatherName:"",DOB:"",Gender:"",Password:"",Branch:"",Year:"", Email:"",Phone:"", error:"",error1:"", ErrorPop:false
       }
       this.onSubmitBtn = this.onSubmitBtn.bind(this);
    } 

    onChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]:value
          });
          console.log(this.state);
        }

        onSubmitBtn = async (event) => {
            event.preventDefault();
            const{PIN,FirstName,LastName,FatherName,DOB,Gender,Password,Branch,Year,Email,Phone} = this.state;

            const check1 =await axios.post(REGISTER_URL, {PIN:PIN, first_name:FirstName,email:Email,password:Password})
            .then(() =>{
                console.log("Data Stored");
                return true
            })
            .catch(err=>{
                this.setState({error:err.response.data.email});
                console.log(this.state.error);
                console.log(err);
            });

            const check2 =await axios.post(STU_URL,{FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile:Phone,Branch,Year})
            .then(()=>{
                console.log("Data Stored in Student")
                return true
            })
            .catch(err=>{
                this.setState({error1:err.response.data.PIN});
                console.log(this.state.error);
                console.log(err);
            });
   
            if (check1 === true && check2 === true){
                this.props.save();
                this.props.Reg();
            }
            else{
                console.log(check1);
                console.log(check2);

                this.ErrorPopup();
            }
          };

        ErrorPopup = (e)=>{
            this.setState({ErrorPop:true})
                    setTimeout(() => {
                        this.setState({ErrorPop:false});
                      }, 3000);
           }

        passwordCheck =(e)=>{
            const target = e.target;
            const value = target.value;

            if(e.key === 'Tab'){

                if(this.state.Password === value){
                    this.setState({Password:value});
                }
                else{
                    this.setState({Password : "Password Mismatch"});
                }
        }
        };


  render() {
    return (
      <div id='registerUser'>
        <center>   
        <h2>Register Student</h2>
        <h5 className='close' onClick={this.props.Reg}>Close</h5>
        <form onSubmit={this.onSubmitBtn} noValidate>
        <table>
            <tbody>
                <tr>
                    <th>PIN</th>
                    <td><input type='text' name='PIN' className = 'ass_input' onChange={this.onChange}/></td>
                    <th>First Name</th>
                    <td><input type='text' name='FirstName' className = 'ass_input' onChange={this.onChange}/></td>
                </tr>
                <tr>
                    <th>Last Name</th>
                    <td><input type='text' name='LastName' className = 'ass_input' onChange={this.onChange}/></td>
                    <th>Father Name</th>
                    <td><input type='text' name='FatherName' className = 'ass_input' onChange={this.onChange} /></td>
                </tr>
                <tr>
                    <th>DOB</th>
                    <td><input type='date' name='DOB' className = 'ass_input' onChange={this.onChange} /></td>
                    <th>Gender</th>
                    <td><fieldset>
                        <table>
                            <tr>
                                <td>Male</td>
                                <td><input type="radio" name="Gender" value='Male' onChange={this.onChange}/></td>
                            </tr>
                            <tr>
                                <td>Female</td>
                                <td><input type="radio" name="Gender" value='Female' onChange={this.onChange}/></td>
                            </tr>
                            <tr>
                                <td>Prefer not to say</td>
                                <td><input type="radio" name="Gender" value='Prefer not to say' onChange={this.onChange}/></td>
                            </tr>
                        </table>
                    </fieldset></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><input type='email' className = 'ass_input' name='Email' onChange={this.onChange} /></td>
                    <th>Phone</th>
                    <td><input type='number' name='Phone' className = 'ass_input'  onChange={this.onChange}/></td>
                </tr>
                <tr>
                    <th>Password</th>
                    <td><input type='text' className = 'ass_input' name='Password' value={this.state.Password} onChange={this.onChange} /></td>
                    <th>Confrim Password</th>
                    <td><input type='password' name='Password_Re' className = 'ass_input'  onKeyDown={this.passwordCheck} /></td>
                </tr>
                <tr>
                <td>Branch</td>
                    <td><select className = 'ass_input' name="Branch" onChange={this.onChange} >
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
                        <select className = 'ass_input' name="Year" onChange={this.onChange} >
                            <option value="">None</option>
                            <option value="Common">Common</option>
                            <option value="I">I Year</option>
                            <option value="II">II Year</option>
                            <option value="III">III Year</option>
                            <option value="IV">IV Year</option>
                            
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <input className='submit' type="submit" value="Add Student" onClick={this.onSubmitBtn}/>
        </form>
        {this.state.ErrorPop  && <SavingFailed error = {this.state.error} error1 = {this.state.error1}/>}
        </center>
      </div>
    )
  }
}
