import { lazy } from "react";
import type { RouteProp } from "./types";
import { DASHBOARD, CREATE_STUDENT } from "../constants/page-paths";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Create_Studnet = lazy(() => import("../pages/Create-User"));

const routes: RouteProp[] = [
  {
    component: Dashboard,
    path: DASHBOARD,
  },
  {
    component: Create_Studnet,
    path: CREATE_STUDENT,
  },
];

export default routes;
