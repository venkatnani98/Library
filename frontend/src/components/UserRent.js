import React, { Component } from 'react'
import { API_URL, RENT_URL } from '../constants'
import axios from 'axios'
import { STU_URL } from '../constants/stu'
import './css/Library.css';
import SavedRent from './SavedRent';
import { AuthContext } from '../context/AuthContext';


export default class UserRent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         BookId : "", BookName: "", Author :"",Branch :"", Stock:"",Year:"",
         PIN:"", FirstName:"", Rent_Date:"", Return_Date:"", showPopup:false
      }
    }

    static contextType = AuthContext;

      componentDidMount() {
        const BookId = this.props.BookId
        const {user} = this.context;
        this.setState({PIN : user.data.PIN, FirstName : user.data.first_name});
        axios.get(API_URL + BookId)
        .then(response =>{
            const {BookId, BookName, Author, Branch, Stock, Year} = response.data.data;
            const tempDate =new Date();
            const tempDelta = new Date(tempDate.getTime() + (1000 * 60 * 60 * 24 * 15));
            const Rent_Date = tempDate.toISOString().slice(0,10);
            const Return_Date = tempDelta.toISOString().slice(0,10);
            this.setState({BookId :BookId,BookName:BookName,Author:Author,Branch:Branch,Rent_Date:Rent_Date,Return_Date:Return_Date, Stock:Stock, Year:Year});
            console.log(this.state);
        })
        .catch(err => console.log(err));
        }

    

     updateRent=(e) =>{
        e.preventDefault()
        const {user} = this.context;
        this.setState({PIN : user.data.PIN, FirstName : user.data.first_name});
        console.log(this.state);
        const context = { data:
           { 'PIN' : this.state.PIN,
            'FirstName' : this.state.FirstName,
            'BookId' : this.state.BookId,
            'Rent_Date' : this.state.Rent_Date,
            'Return_Date' : this.state.Return_Date,}
        }
        axios.post(RENT_URL, context.data).then(() =>{
            this.setState({showPopup:true})
                setTimeout(() => {
                    this.setState({showPopup:false});
                  }, 2000);
        });
        const Stock = (this.state.Stock)-1;
        const{BookId,BookName,Author,Branch,Year} = this.state
        axios.put((API_URL + BookId),{BookId,BookName,Author,Branch,Year,Stock})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    
  render() {
    return (
        <div className='RentView'>
        <form onSubmit={this.updateRent}>
        <table>
            <tbody>
                
                <tr>
                    <th>Book Id :</th>
                    <td>{this.state.BookId}</td>
                    <th>Book Name :</th>
                    <td>{this.state.BookName}</td>
                </tr>
                <tr>
                    <th>Author:</th>
                    <td>{this.state.Author}</td>
                    <th>Branch :</th>
                    <td>{this.state.Branch}</td>
                </tr>
                <tr>
                    <th>PIN :</th>
                    <td>{this.state.PIN}</td>
                    <th><b>Student Name :</b></th>
                    <td><b>{this.state.FirstName}</b></td>
                </tr>
                <tr>
                    
                    <td><input type="submit" value="Submit Rent"/></td>
                    {this.state.showPopup && <SavedRent/>}
                    
                </tr>
            </tbody>
        </table>
        </form>
        <button id='Viewclose' onClick={this.props.onClick}>Close</button>
      </div>
    )
  }
}
