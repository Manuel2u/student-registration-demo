import { lazy } from "react";
import type { RouteProp } from "./types";
import { DASHBOARD, CREATE_STUDENT } from "../constants/page-paths";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Create_Student = lazy(() => import("../pages/Create-User"));
const NotFound = lazy(() => import("../components/NotFound"));

const routes: RouteProp[] = [
  // {
  //   exact: true,
  //   component: Dashboard,
  //   index: true,
  //   path: DASHBOARD,
  // },
  // {
  //   exact: true,
  //   component: Create_Student,
  //   index: true,
  //   path: CREATE_STUDENT,
  // },
  // {
  //   exact: true,
  //   component: NotFound,
  //   index: true,
  //   path: "/notfound", // Match any path that hasn't been defined above
  // },
];

export default routes;
