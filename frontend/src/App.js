import React from 'react';
import './App.css';
import { BrowserRouter,  } from 'react-router-dom';
import Home from './components/Home';
import ModifyBook from './components/ModifyBook';
import AddStudent from './components/AddStudent';
import ModifyStudent from './components/ModifyStudent';
import DeleteStudent from './components/DeleteStudent';
import Returns from './components/Returns';
import Search from './components/search';
import SearchBtn from './components/SearchBtn';
import Dues from './components/Dues';
import {Routes, Route } from "react-router-dom";
import Login, { LoginWithRouter } from './components/Login';
import UserHome from './components/UserHome';
import AddBook from './components/AddBook';
import UserMain from './components/UserMain';
import UserNav from './components/UserNav';
import AdminMain from './components/AdminMain';
import UserDues from './components/UserDues';
import DisplayBooks from './components/DisplayBooks';
import NewBookModal from './components/NewBookModal';
import DisplayStudents from './components/DisplayStudents';
import StudentView from './components/StudentView';
import RentABook from './components/RentABook';
import RtnConfirm from './components/RtnConfirm';
import UserSearch from './components/UserSearch';
import RegisterPage from './components/RegisterPage';
import PrivateRoute from './components/utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import UserRentABook from './components/UserRentABook';
import Profile from './components/Profile';
import BookStock from './components/BookStock';




function App() {


     
  return (
    <BrowserRouter> 
     <AuthProvider>
     <Routes>

       <Route path='/login' element = {<LoginWithRouter/>}/>
      </Routes> 

    
    
    <PrivateRoute  path='admin' element = {<AdminMain/>}/>  
    <PrivateRoute  path='display' element = {<DisplayBooks/>}/>  
    <PrivateRoute path='test' element = {<RtnConfirm/>}/>   
    <PrivateRoute path='rent' element = {<RentABook/>}/>
    <PrivateRoute path='searchbtn' element = {<SearchBtn/>}/>
    <PrivateRoute path='view' element = {<StudentView/>}/>
    <PrivateRoute  path='displaystu' element = {<DisplayStudents/>}/>
    <PrivateRoute  path='addbook' element = {<AddBook/>}/>
    <PrivateRoute path='modifybook' element = {<ModifyBook/>}/>
    <PrivateRoute path='addstudent' element = {<AddStudent/>}/>
    <PrivateRoute path='modifystudent' element = {<ModifyStudent/>}/>
    <PrivateRoute path='deletestudent' element = {<DeleteStudent/>}/>
    <PrivateRoute path='returns' element = {<Returns/>}/>
    <PrivateRoute  path='searchall' element = {<Search/>}/>
    <PrivateRoute  path='dues' element = {<Dues/>}/>
    <PrivateRoute  path='profile' element = {<Profile/>} />

    
    <PrivateRoute path='search' element = {<UserSearch/>}/>           
    <PrivateRoute path='rent' element = {<UserRentABook/>}/>
    <PrivateRoute path='mybooks' element = {<UserDues/>}/>
    <PrivateRoute path='user' element = {<UserMain/>}/>
    <PrivateRoute path='profile' element = {<Profile/>}/>

    </AuthProvider> 
    
    </BrowserRouter>
  );
}



export default App;