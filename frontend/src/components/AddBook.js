import React, { Component } from 'react';
// import { Outlet } from 'react-router-dom'
import './css/Library.css';
import axios from 'axios';
import {API_URL} from "../constants"
import Home from './Home';
import SavedPopup from './SavedPopup';


export default class AddBook extends Component {
    state = { showPopup : false,
        formData :{id: 0, BookId:"", BookName: "", Author: "", Branch  :"", Year: "", Stock: ""}
    }

    componentDidMount(){
        if (this.props.book){
            const {id, BookId, BookName, Author, Branch, Year, Stock } = this.props.book;
            this.setState({id, BookId, BookName, Author, Branch, Year, Stock});
        }
    }

    resetState() {
        this.setState({
            id: 0, BookId:"", BookName: "", Author: "", Branch:"", Year: "", Stock: 0
        }
    );
      }


    toggle() {
    this.setState((prevState) => ({
        isActive: !prevState.isActive
    }));
    }

    onChange = e =>{
        const target = e.target;
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
        axios.post(API_URL, this.state.formData).then(() => {
            this.resetState();
            this.toggle();
            this.setState({showPopup:true})
                setTimeout(() => {
                    this.setState({showPopup:false});
                  }, 2000);
        });
    };

    editBook = e =>{
        e.preventDefault();
        axios.put(API_URL + this.state.id, this.state).then(() => {
            this.resetState();
            this.toggle();
        });
    };

    defaultIfEmpty = value =>{
        return value === ""?"" : value;
    };

    
        

  render() {
    return (
        <>
      <center>
    <div className='containerComponent'>
      <div className="addbook">
        <h2>Add a Book</h2>
        <form onSubmit={this.props.book ? this.editBook : this.createBook} >
            <table>
                <tbody>
                <tr>
                    <td>Book Id</td>
                    <td><input className = 'ab_input' type="text" name='BookId' value={this.defaultIfEmpty(this.state.BookId)} onChange = {this.onChange}/></td>
                </tr>
                <tr>
                    <td>Book Name</td>
                    <td><input className = 'ab_input' type="text" name='BookName' value={this.defaultIfEmpty(this.state.BookName)} onChange = {this.onChange}/></td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td><input className = 'ab_input' type="text" name='Author' value={this.defaultIfEmpty(this.state.Author)} onChange = {this.onChange}/></td>
                </tr>
                <tr>
                    <td>Branch</td>
                    <td><select className = 'ab_input' name="Branch" value={this.defaultIfEmpty(this.state.Branch)} onChange = {this.onChange}>
                            <option value="">Select a Branch</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Electrical">Electrical</option>
                            <option value="ComputerScience">Computer Science</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Year</td>
                    <td>
                        <select className = 'ab_input' name="Year" value={this.defaultIfEmpty(this.state.Year)} onChange = {this.onChange}>
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
                    <td>Stock</td>
                    <td><input className = 'ab_input' type="number" name='Stock' value={this.defaultIfEmpty(this.state.stock)} onChange = {this.onChange}/></td>
                </tr>
                </tbody>
            </table>
            <input className='submit' type="submit" value ="Add Book"/>
             {this.state.showPopup && <SavedPopup/>}
        </form>
      </div>
      </div>
      </center>
      </>
    )
  }
}
