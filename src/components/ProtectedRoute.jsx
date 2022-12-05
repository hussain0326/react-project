import React from "react";
import { Route} from "react-router-dom";
import { Redirect } from "react-router";

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      sessionStorage.getItem("sessionId")
       ? (
          children
        ) : (
          <Redirect to={{
              pathname: "/login1",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
