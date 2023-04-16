import React, { Component } from 'react'
import logo from './static/logo.png'
import './css/login.css'
import { LOGIN_URL } from '../constants'
import axios from 'axios'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import RegisterPage from './RegisterPage'
import SavedPopup from './SavedPopup'
import { AuthContext } from '../context/AuthContext';

export default class Login extends Component {
    static contextType = AuthContext;
         constructor(props) {
           super(props)
         
           this.state = {
              create : false, RegisterPop:false,Saved:false, access_token : "", account : "", PIN : "", password : "",
           }
         }
        
        handleInputChange  = event =>{
            const{name,value} = event.target;
            this.setState({[name]:value});
            console.log(name,value);
            if (value == 'user'){
               this.setState({create : true, account:"user"});
            }
            else if(value == 'admin'){
                this.setState({create:false, account:"admin"});
            }
            };
        
       register = (e)=>{
        this.setState({RegisterPop : !this.state.RegisterPop});
       }
       SavedPop = (e)=>{
        this.setState({Saved:true})
                setTimeout(() => {
                    this.setState({Saved:false});
                  }, 3000);
       }
        

  render() {
     const {onLogin} = this.context;
    return (
        <>
        <body>
        <header>
            <img src= {logo} alt="logo" id="home_main_logo"/>
            <h4>Knowledge has to be improved, challenged, and increased constantly, or it vanishes.</h4>
        </header>
        <h1>Welcome to Library</h1>
        <section id="home_login">
            <h2>Login as</h2>
            <form onSubmit={onLogin}>
            <select name="admin_user" id="home_login_admin_user" onChange={this.handleInputChange} required>
                <option value="#">-----Choose an Option-----</option>
                <option value="admin" >ADMIN</option> 
                <option value="user" id="home_user">USER</option> 
            </select><br/>
            
            <p id="home_input">Admin/PIN : <input type="text" id="home_username" name='PIN' onChange={this.handleInputChange} required/><br/>
            Password : <input type="password" name="password" id="home_password" onChange={this.handleInputChange} required/></p>
            <input type="submit" id="home_submit" value="Login"/><br/>

            {this.state.create && <div id="home_create_acc">Not holding an account?  <a onClick={this.register} >Create New Account</a> </div>}
            {this.state.RegisterPop && <RegisterPage Reg = {this.register} save = {this.SavedPop}/>}
            {this.state.Saved && <SavedPopup />}

            </form>
        </section>
        <section id="home_contact">
            <h3>For Details:</h3>
            <p>Contact : 040-12345678</p>
            <p>Mail : <a href="#">library@dummymail.com</a></p>
            <p id="home_note">Note to the Students: <br/>
                All Books are registered with the Institute. So, students are requested to return the 
                books within the due date. Orelse penality will be made on your account.
                <br/><br/>Login for more details.<br/> Default Password : <b>Pass123</b>
            </p>
        </section>

        <footer>
            Visit our website : <a href="#">www.vrkuniversity.com</a>
        </footer>
        </body>
        
      </>
    )
  }
}

export function LoginWithRouter(props){
    const navigate = useNavigate()
    return (<Login navigate = {navigate}></Login>)
  }