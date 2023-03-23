import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenterLoader } from "../utils/loaders";
import Dashboard from "../pages/Dashboard";
import Create from "../pages/Create-User";
import NotFound from "../components/NotFound";

const SignUp = React.lazy(() => import("../pages/SignUp"));
const SignIn = React.lazy(() => import("../pages/SignIn"));

function RouterConfig() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense fallback={CenterLoader()}>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-user" element={<Create />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export { RouterConfig };
