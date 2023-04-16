import React, { Component } from 'react'
import axios from 'axios'
import { STU_URL} from '../constants/stu'
import { LOGIN_URL, MODIFY_URL } from '../constants'
import { AuthContext } from '../context/AuthContext'


export default class Profile extends Component {
  static contextType = AuthContext;
    constructor(props) {
      super(props);
    
      this.state = {
       id:"", PIN:"", FirstName:"", LastName:"", FatherName:"",DOB:"",Gender:"",Password:"",Branch:"",Year:"", Email:"",Phone:"", EditPop:false
      }
      
    }
    componentDidMount () {
        const {user} = this.context;
        const id = user.data.id;
        const PIN = user.data.PIN;
        this.setState({id:id});
         axios.get(STU_URL + PIN)
        .then(response =>{
            const {FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year} = response.data.data;
            this.setState({FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Phone:Mobile,Branch,Year});
            console.log(this.state);
        })
        .catch(err => console.log(err));
        // axios.get(LOGIN_URL + id)
        // .then(response =>{
        //   console.log(response);
        //     const {Password} = response.data.data.password;
        //     this.setState({Password : Password});
        //     console.log(this.state);
        // })
        // .catch(err => console.log(err));
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

      EditPop = (e)=>{
          e.preventDefault();
          this.setState({EditPop:!this.state.EditPop});
         }

      OnSubmitBtn = (e) =>{
          e.preventDefault();
          const id = this.state.id;
          const{FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year, Password} = this.state
          axios.put( (STU_URL+ PIN) , {FirstName,LastName,FatherName,DOB,Gender,PIN,Email,Mobile,Branch,Year})
          .then(res => {
            alert("Details Updated")
            console.log(res)})
          .catch((err) =>  {
            alert("Something Went Wrong")
            console.log(err)});
          axios.put( (MODIFY_URL + id) , {first_name:FirstName, password:Password, PIN:PIN, email:Email})
          .then(res => console.log(res))
          .catch(err => console.log(err));
        }

      passwordCheck = async(e)=>{
          const target = e.target;
          const value = target.value;

          if(e.key === 'Tab'){

              if(this.state.Password === value){
                  this.setState({Password:value});
              }
              else{
                  this.setState({Password : "Password Mismatch"});
              }
      };
            
      }

    
  render() {
    return (
      <div className='profilePage'>
        <h2>My Profile</h2>
        <button onClick={this.EditPop} >{this.state.EditPop ? ("Cancel") : ("Edit Profile")}</button>
        <form onSubmit={this.OnSubmitBtn}>
          <h6>PIN & Mail ID are alloted to Student, Cant be Changed.</h6>
        <table>
          <tbody>
                <tr>
                    <th>PIN</th>
                    <td>{(this.state.EditPop) ?(<input type='text' name='PIN' value={this.state.PIN} className = 'ass_input' readOnly/>) :  (this.state.PIN) }</td>
                    <th>First Name</th>
                    <td>{(this.state.EditPop) ?(<input type='text' name='FirstName' value={this.state.FirstName} className = 'ass_input' onChange={this.onChange}/>) :  (this.state.FirstName) }</td>
                </tr>
                <tr>
                    <th>Last Name</th>
                    <td>{(this.state.EditPop) ?(<input type='text' name='LastName' value={this.state.LastName} className = 'ass_input' onChange={this.onChange}/>) :  (this.state.LastName) }</td>
                    <th>Father Name</th>
                    <td>{(this.state.EditPop) ?(<input type='text' name='FatherName' value={this.state.FatherName} className = 'ass_input' onChange={this.onChange}/>) :  (this.state.FatherName) }</td>
                </tr>
                <tr>
                    <th>DOB</th>
                    <td>{(this.state.EditPop) ?(<input type='date' name='DOB' value={this.state.DOB} className = 'ass_input' onChange={this.onChange}/>) :  (this.state.DOB) }</td>
                    <th>Gender</th>
                    <td>{(this.state.EditPop) ? (<fieldset>
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
                    </fieldset>):(this.state.Gender)}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{(this.state.EditPop) ?(<input type='email' name='Email' value={this.state.Email} className = 'ass_input' readOnly/>) :  (this.state.Email) }</td>
                    <th>Phone</th>
                    <td>{(this.state.EditPop) ?(<input type='number' name='Phone' value={this.state.Phone} className = 'ass_input' onChange={this.onChange}/>) :  (this.state.Phone) }</td>
                </tr>
                <tr>
                <td>Branch</td>
                    <td>{(this.state.EditPop) ? (<select className = 'ass_input' name="Branch" value={this.state.Branch} onChange={this.onChange} >
                            <option value="">Select a Branch</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Electrical">Electrical</option>
                            <option value="ComputerScience">Computer Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Other">Other</option>
                        </select>) : (this.state.Branch)}
                    </td>
                    <td>Year</td>
                    <td>
                        {(this.state.EditPop) ? (<select className = 'ass_input' name="Year" value={this.state.Year} onChange={this.onChange} >
                            <option value="">None</option>
                            <option value="Common">Common</option>
                            <option value="I">I Year</option>
                            <option value="II">II Year</option>
                            <option value="III">III Year</option>
                            <option value="IV">IV Year</option>
                        </select>) : (this.state.Year)}
                    </td>
                </tr>
                <tr>
                    <th>Password</th>
                    <td><input type='text' className = 'ass_input' placeholder='Enter Password to Save' name='Password' value={this.state.Password} onChange={this.onChange} required/></td>
                    <th>Confrim Password</th>
                    <td><input type='password' name='RePassword' className = 'ass_input'  onKeyDown={this.passwordCheck} /></td>
                </tr>
          </tbody>
        </table>
        <input className='submit' type="submit" value="Modify Details" />
        </form>
      </div>
    )
  }
}
