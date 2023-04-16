import React, { Component } from 'react'
import './css/LibraryStu.css'
import axios from 'axios'
import { RETURN_URL } from '../constants'

export default class RtnConfirm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          
      }
    }

    yes = ()=>{
       const {id,PIN,BookId,FirstName} = this.props.data;
       console.log(id,PIN,BookId,FirstName);
       axios.put((RETURN_URL + id), {PIN : PIN,BookId:BookId,FirstName:FirstName,Payment:'Paid', Rtn:true})
                        .then(err => console.log(err))
                    .catch(err => console.log(err));
          this.props.confirmTab();
    }

    no = ()=>{
        const {id,PIN,BookId,FirstName} = this.props.data;
        console.log(id,PIN,BookId,FirstName);
        axios.put((RETURN_URL + id), {PIN : PIN,BookId:BookId,FirstName:FirstName,Rtn:true})
                         .then(err => console.log(err))
                     .catch(err => console.log(err));
        this.props.confirmTab();
     }

  render() {
    return (
      <div className='confirmrtn'>
        <center>
        <h2>Payment Received ?</h2>
        <table>
            <tbody>
                <tr>
                    <td>
                       <button onClick={this.yes}>Yes</button>
                    </td>
                    <td>
                       <button onClick={this.no}>No</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </center>
      </div>
    )
  }
}
