import React, { Component } from 'react'
import {Consumer} from '../../context.js'
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

 class AddContact extends Component {
     state ={
         name:'',
         email:'',
         phone:'',
         errors:{}
     }
    onChange = (e) => this.setState({[e.target.name]:e.target.value});
    onSubmit= (dispatch,e) => {
        e.preventDefault();
        const {name,email,phone} = this.state;

        //Check for Errors

        if(name===''){
            this.setState({errors:{name:'Name is requered'}}, () => 
            console.log(this.state.errors));
          
            return;
        };
        if(email===''){
            this.setState({errors:{email:'Email is requered'}});
            return;
        };
        if(phone===''){
            this.setState({errors:{phone:'Phone is requered'}});
            return;
        };
        const newContact ={
            id:uuid(),
            name,
            email,
            phone
        };
        dispatch({type:'ADD_CONTACT', payload: newContact})
        this.setState({
            name:'',
            email:'',
            phone:'',
            errors:{}

        });

        this.props.history.push('/');
        }
    render() {
        const {name,email,phone,errors} =this.state;

        return (
                <Consumer>
                        {value=>{
                            const   {dispatch} =value;
                            return(
                                <div className='card mb-3'>
                                <div className='card-header'>
                                    Add Contact </div>   
                                    <div className='card-body'>
                                    <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                   <TextInputGroup  
                                   label="Name" 
                                   name="name"
                                   placeholder= "Enter Name"
                                   value={name}
                                   onChange={this.onChange}
                                   error={errors.name}
                                    />
                                     <TextInputGroup  
                                   label="Email" 
                                   name="email"
                                   type="email"
                                   placeholder= "Enter email"
                                   value={email}
                                   onChange={this.onChange}
                                   error={errors.email}
                                    />
                                     <TextInputGroup  
                                   label="Phone" 
                                   name="phone"
                                   placeholder= "Enter phone"
                                   value={phone}
                                   onChange={this.onChange}
                                   error={errors.phone}
                                    />
                                   
                                    <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
                                    </form>
                                     </div>   
                           
                            </div>

                            );

                        }}

                </Consumer>

        );
       
    }
}

export default AddContact;