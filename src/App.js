import React from "react";
import Login1 from "./components/login1";
import Dashboard1 from "./components/dashboard1";
import Signup from "./components/signup";
import ForgotPassword from "./components/forgotpassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Switch } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path="/login1">
          <Login1 />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <ProtectedRoute path="/dashboard1">
          <Dashboard1 />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="dashboard1" />
        </Route>

        <Route path="*">
          <Redirect from="/" to="dashboard1" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
