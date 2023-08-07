import React, { Fragment } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "../components/NotFound";
import {
  CREATE_STUDENT,
  DASHBOARD,
  LOGIN,
  MAIN_LAYOUT,
  SETTINGS,
} from "../constants/page-paths";
import ProtectedRoutes from "../services/ProtectedRoutes";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const Student = React.lazy(() => import("../pages/Create-User"));
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));
const Settings = React.lazy(() => import("../pages/settings/Settings"));
const Layout = React.lazy(() => import("../navigation/layout/main-layout"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path={MAIN_LAYOUT} element={<Layout />}>
        <Route
          path={DASHBOARD}
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path={CREATE_STUDENT}
          element={
            <ProtectedRoutes>
              <Student />
            </ProtectedRoutes>
          }
        />
        <Route
          path={SETTINGS}
          element={
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route path={LOGIN} element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Fragment>
  )
);
