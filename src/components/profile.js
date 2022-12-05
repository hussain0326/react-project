import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";



 class Profile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        sessionId:'',
        users: []
      };
    
}

onChangeuUsername (e) {
    this.setState({
        username: e.target.value
    });
}


onChangeFirtname(e) {
    this.setState({
        firstname: e.target.value
    });
}
onChangeLastname(e) {
    this.setState({
        lastname: e.target.value
    });
}
onChangeEmail(e) {
  this.setState({
      email: e.target.value
  });
}
onChangePassword(e) {
  this.setState({
      password: e.target.value
  });
}
onChangeConfirmpassword(e) {
  this.setState({
      confirmpassword: e.target.value
  });
}
onChangePhonenumber(e) {
  this.setState({
      phone: e.target.value
  });
}
onChangeDob(e) {
  this.setState({
      birthdate: e.target.value
  });
}


onSubmit(e) {
const sessionId = JSON.parse(sessionStorage.getItem("sessionId"));
    e.preventDefault();
    const obj = {
      id:sessionId
      }
  
    console.log(obj);
    
      
}

// Cancel Function
doCancel(e){
  e.preventDefault();
  window.location.href="/";
}

render(){
  var items = JSON.parse(sessionStorage.getItem("userData"));
    return(
        <div>
          <br />
           <div className="container">
          <form className="form-signin" onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal"> <Icon.PersonPlusFill/>Profile</h1>
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={items.username}
                 required 
                autoComplete="current-username"

                onChange={this.onChangeuUsername}
                
              />
              <input
                type="text"
                value={items.email}
                placeholder={items.email} 
                onChange= {this.onChangeEmail}
                autoComplete="current-email"
               
              />
              <input
                type="password"
                value={items.password}
                placeholder="Password"
                onChange= {this.onChangePassword}

              />
              <input
                type="password"
                value={items.confirmpassword}
                placeholder="Confirm Password" 
                onChange= {this.onChangeConfirmpassword}
              />
              <input
                type="text"
                value={items.firstname}
                placeholder={items.firstname} 
                onChange= {this.onChangeFirtname}

              />
              <input
                type="text"
                value={items.lastname}
                placeholder={items.lastname} 
                onChange= {this.onChangeLastname} />
               <input
                type="text"
                value={items.birthdate}
                placeholder={items.birthdate} 
                onChange= {this.onChangeDob}
              />
              <input
                type="text"
                value={items.phone}
                placeholder={items.phone} 
                onChange= {this.onChangePhonenumber}      />


              <input type="submit" value="Update" />
              <input type ="submit" value ="Cancel"  onClick={this.doCancel} />

            </div>
          </div>
        </form>
        
      </div>
    
          <br /><br />
          
            </div> 

           
         )
       
}
 }
export default Profile;