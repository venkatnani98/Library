import React, { Component } from 'react'
import { API_URL, RENT_URL } from '../constants'
import axios from 'axios'
import { STU_URL } from '../constants/stu'
import './css/Library.css';
import SavedPopup from './SavedPopup';


export default class Rent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         BookId : "", BookName: "", Author :"",Branch :"", Stock:"",Year:"",
         PIN:"", FirstName:"", Rent_Date:"", Return_Date:"", showPopup:false
      }
    }
      componentDidMount() {
        const BookId = this.props.BookId
        axios.get(API_URL + BookId)
        .then(response =>{
            const {BookId, BookName, Author, Branch, Stock, Year} = response.data.data;
            const tempDate =new Date();
            const tempDelta = new Date(tempDate.getTime() + (1000 * 60 * 60 * 24 * 15));
            const Rent_Date = tempDate.toISOString().slice(0,10);
            const Return_Date = tempDelta.toISOString().slice(0,10);
            this.setState({BookId :BookId,BookName:BookName,Author:Author,Branch:Branch,Rent_Date:Rent_Date,Return_Date:Return_Date, Stock:Stock, Year:Year});
        })
        .catch(err => console.log(err));
        }

    

     pinInfo = (e) =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(name-value);
    
        this.setState({
             [name] : value
          });
        }
     onTab = (e) =>{
        const PIN = this.state.PIN
        if (e.key === 'Tab'){
            e.preventDefault();
            console.log("Inside Ontab")
            axios.get(STU_URL + PIN)
            .then(response =>{
                const FirstName = response.data.data.FirstName;
                this.setState({FirstName : FirstName, PIN : PIN});
            })
            .catch(err => console.log(err));
        }
     }

     updateRent=(e) =>{
        e.preventDefault()
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
                    <td><input type="text" name='PIN' onChange={this.pinInfo} onKeyDown={this.onTab}/></td>
                    <th><b>Student Name :</b></th>
                    <td><b>{this.state.FirstName}</b></td>
                </tr>
                <tr>
                    
                    <td><input type="submit" value="Submit Rent"/></td>
                    {this.state.showPopup && <SavedPopup/>}
                    
                </tr>
            </tbody>
        </table>
        </form>
        <button id='Viewclose' onClick={this.props.onClick}>Close</button>
      </div>
    )
  }
}
