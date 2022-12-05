import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl } from "react-bootstrap";
import { FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.onChangeuUsername = this.onChangeuUsername.bind(this);
    this.onChangeFirtname = this.onChangeFirtname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmpassword = this.onChangeConfirmpassword.bind(this);
    this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      phonenumber: "",
      dob: "",
      showPassword: false,
      birthdate: "",
      phone: "",
    };
  }

  onChangeuUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeFirtname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeConfirmpassword(e) {
    this.setState({
      confirmpassword: e.target.value,
    });
  }
  onChangePhonenumber(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  onChangeDob(e) {
    this.setState({
      birthdate: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
      birthdate: this.state.birthdate,
      phone: this.state.phone,
    };

    console.log(obj);
    axios
      .post(BASE_URL + "/api/v1/users/register", obj)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/login1";
        toast.warning(JSON.stringify(response.data));
      })
      .catch((error) => {
        toast.warning(JSON.stringify(error.response.data)); // client received an error response (5xx, 4xx)
      });
  }

  render() {
    // Regex for Input Validation
    const hasSixChar = this.state.password.length >= 8;
    const hasUsername = this.state.username.length >= 6;
    const hasLowerChar = /(.*[a-z].*)/.test(this.state.password);
    const hasUpperChar = /(.*[A-Z].*)/.test(this.state.password);
    const hasNumber = /(.*[0-9].*)/.test(this.state.password);
    const hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(this.state.password);
    const Pass = this.state.password === this.state.confirmpassword;

    return (
      <div>
        <Header />

        <br />
        <div className="container">
          <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">
              {" "}
              <Icon.PersonPlusFill />
              Register
            </h1>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Enter Username"
                  required
                  onChange={this.onChangeuUsername}
                />
                {this.state.username && (
                  <span>
                    <small
                      className={hasUsername ? "text-success" : "text-danger"}
                    >
                      Username should be at least 6 characters{" "}
                    </small>
                  </span>
                )}
                <input
                  type="text"
                  value={this.state.email}
                  placeholder="Enter Email"
                  required
                  onChange={this.onChangeEmail}
                />
                <input
                  type="password"
                  // name="password"
                  value={this.state.password}
                  placeholder="Enter Password"
                  required
                  onChange={this.onChangePassword}
                />
                {this.state.password && (
                  <ul>
                    <li className="li">
                      <small
                        className={hasSixChar ? "text-success" : "text-danger"}
                      >
                        at least 8 characters{" "}
                      </small>
                    </li>
                    <br />
                    <li className="li">
                      <small
                        className={hasNumber ? "text-success" : "text-danger"}
                      >
                        at least one number{" "}
                      </small>
                    </li>
                    <br />
                    <li className="li">
                      <small
                        className={
                          hasLowerChar ? "text-success" : "text-danger"
                        }
                      >
                        at least one lowercase{" "}
                      </small>
                    </li>
                    <br />
                    <li className="li">
                      <small
                        className={
                          hasUpperChar ? "text-success" : "text-danger"
                        }
                      >
                        at least one upercase{" "}
                      </small>
                    </li>

                    <br />
                    <li className="li">
                      <small
                        className={
                          hasSpecialChar ? "text-success" : "text-danger"
                        }
                      >
                        at least one special character{" "}
                      </small>
                    </li>
                  </ul>
                )}
                <input
                  type="password"
                  //name="confirmpassword"
                  value={this.state.confirmpassword}
                  placeholder="Confirm Password"
                  onChange={this.onChangeConfirmpassword}
                />
                {this.state.password && this.state.confirmpassword && (
                  <FormHelperText>
                    {Pass ? (
                      <span className="text-success">
                        Password does match!{" "}
                      </span>
                    ) : (
                      <span className="text-danger">
                        Password does not match !{" "}
                      </span>
                    )}
                  </FormHelperText>
                )}
                <input
                  type="text"
                  // name="firstname"
                  value={this.state.firstname}
                  placeholder="Enter First Name"
                  onChange={this.onChangeFirtname}
                  required
                />
                <input
                  type="text"
                  //name="lastname"
                  value={this.state.lastname}
                  placeholder="Enter Last Name"
                  onChange={this.onChangeLastname}
                />
                <input
                  type="text"
                  value={this.state.birthdate}
                  //name="dob"
                  placeholder="Enter Date of Birth : YYYY-MM-DD 00:00:00"
                  onChange={this.onChangeDob}
                  required
                />
                <input
                  type="tel"
                  // name="phonenumber"
                  value={this.state.phone}
                  placeholder="Enter Phone Number"
                  onChange={this.onChangePhonenumber}
                />
                <Button
                  variant="contained"
                  className="submit"
                  disabled={
                    !hasSixChar ||
                    !hasNumber ||
                    !hasLowerChar ||
                    !hasUpperChar ||
                    !hasUsername ||
                    !hasSpecialChar ||
                    !this.state.firstname ||
                    !this.state.lastname ||
                    !Pass
                  }
                  onClick={this.onSubmit}
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default Signup;
