import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
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
import Login from './components/Login';
import UserHome from './components/UserHome';
import AddBook from './components/AddBook';
import UserMain from './components/UserMain';
import AdminMain from './components/AdminMain';
import UserMyBooks from './components/UserMyBooks';
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



function App() {
     
  return (
    <BrowserRouter> 
     
     <Login/>
     {/* <UserHome/> */}
      {/* <Home/> */}
      
       <Routes>
       
         <Route path='/test' element = {<RtnConfirm/>}/>   
         <Route path='/rent' element = {<RentABook/>}/>
         <Route path='/searchbtn' element = {<SearchBtn/>}/>
         <Route path='/view' element = {<StudentView/>}/>
         <Route path='/displaystu' element = {<DisplayStudents/>}/>
         <Route path='/display' element = {<DisplayBooks/>}/>
         <Route path='/addbook' element = {<AddBook/>}/>
         <Route path='/modifybook' element = {<ModifyBook/>}/>
         <Route path='/addstudent' element = {<AddStudent/>}/>
         <Route path='/modifystudent' element = {<ModifyStudent/>}/>
         <Route path='/deletestudent' element = {<DeleteStudent/>}/>
         <Route path='/returns' element = {<Returns/>}/>
         <Route path='/search' element = {<Search/>}/>
         <Route path='/dues' element = {<Dues/>}/>
         <Route path='/user/search' element = {<UserSearch/>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;