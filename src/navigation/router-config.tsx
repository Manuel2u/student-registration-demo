import React, { Fragment } from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import { LOGIN, MAIN_LAYOUT } from "../constants/page-paths";
import { ProtectedRoute } from "../services/ProtectedRoutes";
import auth from "../services/cookie-config";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const Student = React.lazy(() => import("../pages/Create-User"));
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));
const Settings = React.lazy(() => import("../pages/settings/Settings"));
const Layout = React.lazy(() => import("../navigation/layout/main-layout"));

const isUserAuthenticated = () => {
  // Implement your authentication logic here. For example:
  const token = auth.getCipher();
  return !!token; // Return true if the user is authenticated, otherwise false.
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path={MAIN_LAYOUT} element={<Layout />}>
        <Route
          index
          element={
            isUserAuthenticated() ? (
              <Dashboard />
            ) : (
              <Navigate to={LOGIN} replace />
            )
          }
        />
        <Route
          path="/create-student"
          element={
            isUserAuthenticated() ? (
              <Student />
            ) : (
              <Navigate to={LOGIN} replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isUserAuthenticated() ? (
              <Settings />
            ) : (
              <Navigate to={LOGIN} replace />
            )
          }
        />
      </Route>
      <Route path={LOGIN} element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Fragment>
  )
);
