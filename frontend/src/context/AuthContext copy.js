import axios from "axios";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"

import { LOGIN_URL } from "../constants";
import { redirect } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  let load = {data :{"first_name": "Loading...", "PIN":"Please refresh"}};
  let [authToken, setAuthToken] = useState(()=>localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null );
  let [user, setUser] = useState(()=>localStorage.getItem('user') ? load : null );

  const userToken = JSON.parse(localStorage.getItem("user"));
 
  
  
  useEffect( () => {
    if (userToken != null){
        const userData = (jwt_decode(userToken.token));
        const id = userData.user_id;
        const fetchData = async () => {
            try {
              const response = await axios.get(LOGIN_URL + id);
              const data = response.data;
              setUser(data);
              setAuthToken(userToken);
              console.log(userData);
            } catch (error) {
              console.error(error);
            }
          }; 
        
          fetchData();
        }},[userToken!=null]);
      
  
      

  let logout = () =>{
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    return redirect("/login");
  }

  const contextData = {
    user,
    logout:logout
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider> 
  );

  };

export { AuthContext, AuthProvider };
