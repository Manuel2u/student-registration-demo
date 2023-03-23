import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";

function Navbar2() {
  return (
    <>
      <div className="flex justify-between items-center pt-7 pb-12">
        <FiSearch size={22} />
        <div className="flex gap-x-4">
          <IoIosNotifications size={22} />
          <FiUser size={22} />
        </div>
      </div>
    </>
  );
}

export default Navbar2;
