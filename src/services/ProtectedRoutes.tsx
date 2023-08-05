import React, { Fragment } from "react";
import { Navigate, Route } from "react-router-dom";
import auth from "./cookie-config";

export const ProtectedRoute = ({ element: Element, ...rest }: any) => {
  const token = auth.getCipher();
  return (
    <Fragment>
      <Route
        {...rest}
        element={token ? <Element /> : <Navigate to="/signin" />}
      />
    </Fragment>
  );
};
