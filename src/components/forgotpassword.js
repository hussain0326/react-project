import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import Header from './Header'
import Footer from './Footer';

 class ForgotPassword extends Component {
  
render(){
    return(
        <div>
          <Header/> 
          <br />
           <div className="container">
          <form className="form-signin" >
          <h1 className="h3 mb-3 font-weight-normal"> <Icon.Lock/>Reset Password</h1>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="username"
                placeholder="Enter Your Email"
                onChange={this.handleChange}
              />
              <input type="submit" value="Send Recover Email" />
            </div>
          </div>
        </form>
      </div>
    
          <br /><br />
            <Footer/> 
            </div> 
         )
       
}
 }
export default ForgotPassword;