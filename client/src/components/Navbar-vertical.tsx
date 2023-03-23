import React from "react";
import { CiGrid41, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-72 pr-6 flex justify-start flex-col items-start bg-background h-screen">
        <img className="pl-7 pt-10" src="" alt="logo" />
        <div className="flex flex-col justify-start gap-y-4 pt-16 pl-7 ">
          <div className="">
            <p className="text-white text-sm font-bold">GENERAL</p>
          </div>
          <Link to="/dashboard">
            <div className="flex gap-x-3  rounded-lg bg-skills items-center p-3 w-60">
              <CiGrid41 size={20} color="#2065D1" />

              <p className="text-primary">Dashboard</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-start gap-y-4 pt-16 pl-7 ">
          <div className="">
            <p className="text-white text-sm font-bold">MANAGEMENT</p>
          </div>
          <Link to="/create-user">
            <div className="flex gap-x-3  rounded-lg bg-skills items-center p-3 w-60">
              <CiSettings size={20} color="#2065D1" />

              <p className="text-primary">Create Student</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
