import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StandOrt from "./standort";
import History from "./history";
import Login1 from "./login1";
import Home from "./Home";
import Profile from"./profile";
import Status from "./status";
import { setUserSession1 } from '../Utils/Common';
import { setUserSession2 } from '../Utils/Common';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple,deepWhite } from '@mui/material/colors';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
import {  Route, Link } from "react-router-dom";
import { withRouter,Redirect,Switch} from "react-router";
import axios from "axios";
import {toast} from 'react-toastify';
import CarInfo from'./carinfo';
;


class Dashboard1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      islogout: false,
    };
  }

  //Logout Function
  signOut = () => {
   sessionStorage.removeItem("sessionId");

    this.setState({
      islogout: true,
    });
  
  };

  // Fetching Data from Backend 
   componentDidMount()
  {
     const id2 = JSON.parse(sessionStorage.getItem("sessionId"));
     const obj1 = {
       sessionId:id2
       }
       axios.post('http://192.168.31.238:8080/api/v1/users/info',obj1)
       .then(response => {
         setUserSession1(response.data.userData);
         })
         .catch (error => { 
           toast.error(JSON.stringify(error.response.data.userData))
         })

       axios.post('http://192.168.31.238:8080/api/v1/vehicles/list',obj1)
       .then(response => {
         setUserSession2(response.data.vehicles);
         })
         .catch (error => { 
           toast.error(JSON.stringify(error.response.data.vehicles))
         })

        

        
   }

  render() {
    // Getting user information from session storage
    var items = JSON.parse(sessionStorage.getItem("sessionId"));
    // Redirect back to login page
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }

    const { match } = this.props;

    return (
      <div>
        <Header />
        <nav className=" navbar navbar-expand-lg navbar-light">
          <Link to={`${match.path}/Home`} className="navbar-brand ">
            <Icon.House /> Home
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll">
              <Link to={`${match.path}/status`} className="nav-item nav-link">
                <Icon.Tools /> Technische Zustand
              </Link>
              <Link to={`${match.path}/history`} className="nav-item nav-link">
                <Icon.GraphUpArrow /> Graph/Historie
              </Link>
              <Link to={`${match.path}/standort`} className="nav-item nav-link">
                <Icon.Geo /> Standort
              </Link>
            </ul>
            <div class="d-flex">
              <div class="navbar-nav ml-auto ">
                <li className="dropdown">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <Stack direction="row" spacing={0.6}>
                      <Avatar sx={{ bgcolor: deepOrange[80] }}></Avatar>
                      <span>
                        {items.firstname}
                        {items.lastname}
                      </span>
                    </Stack>
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                    <li>
                      <Link to={`${match.path}/profile`} className="fa fa-gear">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <i className="fa fa-sign-out fa-fw"> </i>{" "}
                      <button onClick={this.signOut}>Logout</button>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i class="fa fa-language"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                    <li>
                      <Link className="fa fa-globe">English</Link>
                    </li>
                    <li>
                      <Link className="fa fa-globe">Deutsch</Link>
                    </li>
                  </ul>
                </li>
              </div>
            </div>
          </div>
        </nav>
            <Switch>
              <Route path={`${match.path}/login1`}>
                <Login1 />
              </Route>
            
              <Route path={`${match.path}/standort`}>
                <StandOrt/>
              </Route>
              <Route path={`${match.path}/Home`}>
                <Home/>
              </Route>
              <Route path={`${match.path}/history`}>
                <History/>
              </Route>
              <Route path={`${match.path}/profile`}>
                <Profile/>
              </Route>
              <Route path={`${match.path}/status`}>
                <Status/>
              </Route>
            </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Dashboard1);
