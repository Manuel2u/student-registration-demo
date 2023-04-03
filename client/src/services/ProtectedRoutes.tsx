import { Route, Routes, Navigate } from "react-router-dom";
import auth from "../services/cookie-config";

const ProtectedRoute = ({
  component: Component,
  path,
}: {
  component: any;
  path: string;
}) => {
  let token = auth.getCipher();
  return (
    <Routes>
      <Route
        path={path}
        element={!token ? <Navigate to="/signin" /> : <Component />}
      />
    </Routes>
  );
};

export default ProtectedRoute;
