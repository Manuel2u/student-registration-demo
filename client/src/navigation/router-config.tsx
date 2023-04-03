import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenterLoader } from "../utils/loaders";
// import Dashboard from "../pages/Dashboard";
// import Create from "../pages/Create-User";
import NotFound from "../components/NotFound";

const SignIn = React.lazy(() => import("../pages/SignIn"));
const Layout = React.lazy(() => import("../navigation/layout/main-layout"));

function RouterConfig() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense fallback={CenterLoader()}>
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="*" element={<Layout />} />
            {/* <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-user" element={<Create />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export { RouterConfig };
