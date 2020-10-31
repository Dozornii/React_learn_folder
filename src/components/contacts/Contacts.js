import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Consumer} from '../../context';
import axios from 'axios';


 class Contacts extends Component {

     
     state={
         showContactInfo:false
     };
     onShowClick =e=>{

        this.setState({showContactInfo:!this.state.showContactInfo});
        console.log(this.state);
     }
     onDeleteClick = async (id,dispatch)=>{
         try {
         console.log('here');
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`,
        { 
      headers: {
          'Access-Control-Allow-Origin': '*',
       }});
       dispatch({type:'DELETE_CONTACT',payload:id});
    }
        catch (e){
            dispatch({type:'DELETE_CONTACT',payload:id});
        }
     }
    render() {
        const {id,name,email,phone} = this.props.contact;
        const {showContactInfo}=this.state;
        return (

            <Consumer>
                {value=>{
                    const  {dispatch} =value;
                    return (
                <div className="card card-body mb-3">
                <h4>{name} <i onClick={this.onShowClick.bind(this,name)} className="fa fa-sort-down"
                style={{cursor:'pointer'}}
                
                /> <i className="fa fa-times" style={{cursor:'pointer',float:'right',color:'red'}}
                onClick={this.onDeleteClick.bind(this,id,dispatch)}
                ></i></h4>
               {showContactInfo?( <ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone:{phone}</li>


        </ul>):null}
               
            </div>
                    )
                }}

            </Consumer>
            
        )
    }
}

Contacts.propTypes ={
    contact:PropTypes.object.isRequired,
   

};
export default Contacts;