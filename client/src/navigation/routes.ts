import { lazy } from "react";
import type { RouteProp } from "./types";
import { DASHBOARD, CREATE_STUDENT } from "../constants/page-paths";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Create_Student = lazy(() => import("../pages/Create-User"));

const routes: RouteProp[] = [
  {
    exact : true,
    component: Dashboard,
    index:true,
    path: DASHBOARD,
  },
  {
    exact : true,
    component: Create_Student,
    index:false,
    path: CREATE_STUDENT,
  },
];

export default routes;
