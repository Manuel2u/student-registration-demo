import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { CenterLoader } from "./utils/loaders";
import { router } from "./navigation/router-config";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster
        position={"top-center"}
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          style: {
            margin: "40px",
            background: "#363636",
            // background: "#00e676",
            color: "#fff",
            zIndex: 1,
            // width: "28vh",
          },
          duration: 5000,
          // Default options for specific types
          success: {
            duration: 8000,
          },
          error: {
            style: {
              background: "#f44336",
            },
            duration: 8000,
          },
        }}
      />
      <Suspense fallback={CenterLoader()}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
