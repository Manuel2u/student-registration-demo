import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./cookie-config";

const ProtectedRoute = ({
  component: Component,
  path,
  exact,
}: {
  component: any;
  path: string;
  exact: boolean;
}) => {
  return (
    <Fragment>
      <Route
        path={path}
        exact={exact}
        render={() => {
          const token = auth.getCipher();
          // console.log(token)
          if (!token) {
            return <Redirect to={{ pathname: "/login" }} />;
          }
          return <Component />;
        }}
      />
    </Fragment>
  );
};

export default ProtectedRoute;
