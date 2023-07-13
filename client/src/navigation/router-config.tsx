import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CenterLoader } from "../utils/loaders";
import NotFound from "../components/NotFound";
import { LOGIN, MAIN_LAYOUT } from "../constants/page-paths";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const Layout = React.lazy(() => import("../navigation/layout/main-layout"));

function RouterConfig() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense fallback={CenterLoader()}>
          <Switch>
            <Route exact path={LOGIN} component={SignIn} />
            <Route path={MAIN_LAYOUT} component={Layout} />
            <Route path="/notfound" component={NotFound} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

// login access token and store it

export { RouterConfig };
