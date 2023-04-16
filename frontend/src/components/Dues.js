import React, { Component } from 'react'
import Home from './Home'
import DuesPage from './DuesPage';
import PinDue from './PinDue';

export default class Dues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rentpop:false,
      view : false,
      Due : false,
      PIN: "",
    };  
  }

  clickShow = (e) => {
    e.preventDefault();
    (this.state.Due) ? (this.setState({Rentpop: !this.state.Rentpop, view: !this.state.view,  Due: !this.state.Due})) : (this.setState({Rentpop: !this.state.Rentpop, view: !this.state.view}));
  };

  clickDue = (e) => {
    e.preventDefault();
    (this.state.Rentpop) ? (this.setState({Rentpop: !this.state.Rentpop, view: !this.state.view,  Due: !this.state.Due})) : (this.setState({ Due: !this.state.Due}));
  };

  handleInputChange  = event =>{
    const{name,value} = event.target;
    this.setState({[name] : value});
    console.log(this.state)
  };

  render() {
    return (
      <>
        <div className='dues'>
            <center><h1>Dues</h1></center>
        <form onSubmit={this.clickDue}>
         <input type="text" name="PIN" className='srh_input' placeholder='PIN' onChange={this.handleInputChange} />
         <table>
          <tbody>
            <tr>
              <td>
                 <input id='button' className='submit' type="submit" value='Fetch'/>
              </td>
              <td>
                <input id='button' className='submit' type='button' value={(this.state.view) ? 'Hide all' : 'Show all'} onClick={this.clickShow}/>
              </td>
            </tr>
         </tbody>
         </table>
        
        </form>
        {this.state.Rentpop && <div id="rent"><DuesPage/></div>}
        {this.state.Due && <div id="rent"><PinDue PIN={this.state.PIN}/></div>}
   </div>
   </>
    )
  }
}
