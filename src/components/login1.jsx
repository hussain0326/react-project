import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import * as Icon from "react-bootstrap-icons";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
import { toast } from "react-toastify";

class Login1 extends Component {
  constructor(props) {
    super(props);

    // Login Veriable
    this.state = {
      islogged: false,
      loginParams: {
        username: "",
        password: "",
        email: "",
      },
    };
  }

  // Event Handler
  handleFormChange = (event) => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew,
    });
  };

  componentDidMount() {
    if (localStorage.getItem("sessionId")) {
      this.context.router.history.push({
        pathname: "/dashboard1",
      });
    }
  }

  //Login Handler Function
  login = (event) => {
    event.preventDefault();

    const obj = {
      email: this.state.loginParams.email,
      username: this.state.loginParams.username,
      password: this.state.loginParams.password,
    };

    // checking user information with backend

    axios
      .post(API_URL + "/api/v1/sessions/create", obj)
      .then((response) => {
        setUserSession(response.data.sessionId);
        toast.success(JSON.stringify(response.data));
        window.location.href = "./";
      })
      .catch((error) => {
        toast.error(JSON.stringify(error.response.data));
      });
  };

  render() {
    return (
      <div>
        {" "}
        <Header />
        <br />
        <div className="container">
          <form onSubmit={this.login} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">
              {" "}
              <Icon.BoxArrowInRight />
              Login{" "}
            </h1>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={this.handleFormChange}
                  required
                  placeholder="Enter Email"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={this.handleFormChange}
                  placeholder="Enter Password"
                  OutlinedInput="password"
                />
                <input type="submit" value="Login" />
                <Link to="/forgotpassword">
                  <p>Forgot Password?</p>
                </Link>
                <p>Do not have account already? Then Sign Up </p>
                <Link to="/signup">
                  <input type="submit" value="SignUp" />
                </Link>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Login1;
