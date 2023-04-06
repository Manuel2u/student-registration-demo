import React from "react";

import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
const logo = require("../assets/uglogo.png");

function Navbar2() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between pl-10  border-b-2">
          <div className="pt-1 pb-2">
            <h2 className="text-2xl font-bold">Students</h2>
            <p className="text-sm text-gray-500">
              All Students {">"}{" "}
              <span className="text-black bg-gray-300 px-2">20,000</span>{" "}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex mr-4 gap-x-4 items-center">
              <CiSearch size={23} />
              <IoIosNotificationsOutline size={23} />
            </div>
            <div className="">
              <div className="w-16 h-[83px] -mt-5 bg-primary flex items-center justify-center pt-5">
                <div className="h-10 w-10 border-2 border-primary  bg-white rounded-full">
                  <img
                    className="h-10 p-2 w-10"
                    src={logo}
                    alt="Company Logo"
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar2;
