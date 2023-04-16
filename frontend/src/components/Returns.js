import React, { Component } from 'react'
import './css/LibraryStu.css'
import ReturnDetails from './ReturnDetails'
import axios from 'axios'
import { RENT_URL_2, RETURN_URL } from '../constants'
import RtnConfirm from './RtnConfirm'



export default class Returns extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         DisplayRtn : false, Confrimation:false, PIN:"", FirstName:"", BookId:"", Rent_Date:"", Return_Date:"", Returned_On:null,Due:0, Days:0, data:[]
      };
    }

    
    pinInfo = (e) =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(name,value);
    
        this.setState({
             [name] : value
          });
        }
    onTab = (e) =>{
        const PIN = this.state.PIN
        if (e.key === 'Tab'){
            e.preventDefault();
            this.setState({ DisplayRtn: !this.state.DisplayRtn, });
        }
     }

     confirmTab =(e)=>{
        e.preventDefault();
        this.setState({ Confrimation: !this.state.Confrimation,  DisplayRtn: !this.state.DisplayRtn,});
     }

     closeconfirmTab =()=>{
        this.setState({ Confrimation: !this.state.Confrimation});
     }


     handleInputChange  = event =>{
        const{name,value} = event.target;
        this.setState({[name] : value}, () =>{
            console.log(this.state);
            const id = this.state.data.id;
            const BookId = this.state.data.BookId;
            const PIN = this.state.PIN;
            const FirstName = this.state.data.FirstName;
            const Returned_On = this.state.Returned_On;
            console.log(id,BookId,PIN,FirstName, Returned_On);
                if (name == 'Returned_On'){
                    axios.put(RETURN_URL + id, {PIN : PIN,BookId:BookId,FirstName:FirstName,Returned_On:Returned_On})
                        .then(response =>{
                            console.log(response.data.data);
                       const Value = response.data.data.Days;
                       const Days = Value ? parseInt(Value.split(" ")[0]) : 0;
                       console.log(Days);
                       this.setState({Days}, this.feeCalculations);
                    })
                    .catch(err => console.log(err));
                    }
                    
        });}

     feeCalculations=()=>{
                    console.log(this.state)
                    const Days = this.state.Days;
                    if (Days <= 20){
                        console.log("Inside 20")
                        const Due = 0;
                        this.setState({Due}, this.insertData);
                        }
                    else if (Days > 20 && Days < 60){
                        const Due = 100;
                        console.log("Inside 20-60")
                        this.setState({Due}, this.insertData);
                        }
                    else if (Days > 60){
                        console.log("Inside 60")
                        const Due = 200;
                        this.setState({Due}, this.insertData);
                    }
                    
                    console.log(this.state);
     }
        
    
     insertData=()=>{
        const id = this.state.data.id;
        const {PIN,Due} = this.state;
        const {FirstName,BookId} = this.state.data;
        console.log(PIN,FirstName,BookId,Due)
        axios.put((RETURN_URL + id),{PIN,FirstName,BookId,Due})
        .then(res => console.log(res))
        .catch(err => console.log(err));
     }

      getData = (value) => {
        this.setState({data:value});
      };


  render() {
    return (
        <>
        <div className='return'>

            <center>
            <h1>Return a Book</h1>
            <form onSubmit={this.confirmTab} >
                PIN : <input className = 'as_input' type="text" name='PIN' onChange={this.pinInfo} onKeyDown={this.onTab} placeholder='Enter PIN and press Tab'/>
            <table>
                <tr>
                    <td>Book Id</td>
                    <td><input className = 'as_input' type="text" name='BookId' value={this.state.data.BookId}/></td>
                </tr>
                <tr>
                    <td>Borrow Date</td>
                    <td><input className = 'as_input' type="date" name='Rent_Date' value={this.state.data.Rent_Date} /></td>  
                </tr>
                <tr>
                    <td>Should Return by</td>
                    <td><input className = 'as_input' type="date" name='Return_Date' value={this.state.data.Return_Date} /></td>  
                </tr>
                <tr>
                    <td>Returned On</td>
                    <td><input className = 'as_input' type="date" name='Returned_On' onChange={this.handleInputChange} /></td>  
                </tr>
                <tr>
                    <td>Due Amount</td>
                    <td><input className = 'as_input' type="number" name='Dues' value = {this.state.Due} /></td>  
                </tr>                
            </table>
            <input className='submit' type="submit" value='Accept Return'/>
            </form>
            </center>
        </div>
        {(this.state.DisplayRtn) && <div id='rtn_details'><ReturnDetails PIN = {this.state.PIN} getData = {this.getData}/></div>}
        {(this.state.Confrimation) && <div id='rtn_details'><RtnConfirm data ={this.state.data} confirmTab = {this.closeconfirmTab}/></div>}
        </>
    )
  }
     }
