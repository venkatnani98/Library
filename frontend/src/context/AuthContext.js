import axios from "axios";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"

import { LOGIN_URL } from "../constants";
import { redirect, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  let load = {data :{"first_name": "Loading...", "PIN":"Please refresh"}};
  let [authToken, setAuthToken] = useState(()=>localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null );
  let [user, setUser] = useState(()=>localStorage.getItem('user') ? load : null);
  let [account, setAccount] = useState(()=>localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : null );
 
  useEffect( () => {
    if (authToken != null){
    
        const userData = (jwt_decode(authToken.token));
        const id = userData.user_id;
        const fetchData = async () => {
            try {
              const response = await axios.get(LOGIN_URL + id);
              const data = response.data;
              setUser(data);
              if (account.account == 'user'){
                  navigate("/user" );
              }
              else if (account.account == 'admin'){
                  navigate("/admin");
              }
            } catch (error) {
              console.error(error);
            }
          }; 
        
          fetchData();
        }},[authToken!=null]);
      
  
 let onLogin = async (e) =>{
    e.preventDefault();
    const data = {"PIN": e.target.PIN.value, "password" : e.target.password.value};
    const account = e.target.admin_user.value;
    let account_type = {account};
    localStorage.setItem( "account", JSON.stringify(account_type) );
    setAccount({account});
    await axios.post(LOGIN_URL, data)
    .then((response) => {
      if (account== response.data.data.account_type){
        const token = response.data.access_token;
        setAuthToken({token});
        let user = { token }
        localStorage.setItem( "user", JSON.stringify(user) );
         }
      else{
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("account");
        window.alert("Invalid Credentials given for the Account.")
        return redirect("/login");
      } 
    })
    .catch(err => {
      alert("Incorrect Credentials")
      console.log(err)});
    
};   

  let logout = () =>{
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    return redirect("/login");
  }

  const contextData = {
    onLogin : onLogin,
    user,
    account,
    logout:logout
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider> 
  );

  };

export { AuthContext, AuthProvider };
