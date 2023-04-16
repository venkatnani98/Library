import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, redirect } from 'react-router-dom';
import UserHome from '../UserHome';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Home from '../Home';

const PrivateRoute =  ({ element, path, role, ...rest }) => {
    
    let  {user} =   useContext(AuthContext);
    

  return (
    <Routes>
      
    
      <Route path='/' element={ user ? <Home/> : ( <Navigate to="/login" replace />)}>
      <Route path={path} element={ user ? element : ( <Navigate to="/login" replace /> )}/>
      </Route>


      
      {/* <Route path='/user'  element={ user ? <UserHome/> : ( <Navigate to="/login" replace />)}>
      <Route path={path} element={ user ? element : ( <Navigate to="/login" replace /> )}/>
      </Route> */}


    </Routes>
  );
};

export default PrivateRoute;
