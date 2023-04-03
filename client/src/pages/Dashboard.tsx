import React from "react";
import Navbar2 from "../components/Navbar-horizontal";

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col pl-10 w-screen pr-16">
          <Navbar2 />
          <div>
            <h1 className="text-3xl font-bold">Hi, Welcome Back</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
