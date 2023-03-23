import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar-vertical";
import Navbar2 from "../components/Navbar-horizontal";
import CreateUserModal from "../components/CreateUserModal";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import auth from "../services/cookie-config";

function Create() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const token = auth.getCipher();
    const response = await axios.get(
      "https://dcit-205-server.onrender.com/api/v1/all-students",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setStudents(response.data);
  };

  //fetch students on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        <div></div>
        <div className="flex flex-col pl-10 border-2  w-screen pr-16">
          <Navbar2 />
          <div className="flex flex-col">
            <div className="flex justify-end items-end ml-2">
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white p-3 "
              >
                Create Student
              </button>
            </div>
            <div className="h-[0.4px] bg-darktxt mt-5"></div>
          </div>
          <div>
            <CreateUserModal onClose={handleClose} visible={showModal} />
          </div>
          {students.map((student: any) => {
            //make a container that can hold the student details and a button to view the student details
            return (
              <div key={student._id} className="flex flex-col pt-10">
                <div className="flex justify-between items-center">
                  {/* <div className="flex justify-between"> */}
                  <p>{student.firstName}</p>
                  <p>{student.lastName}</p>
                  {/* </div> */}
                  {/* <div className="flex items-center justify-between"> */}
                  <p>{student.programme.substring(0, 10)}...</p>
                  <p>{student.residence}</p>

                  <div className="flex justify-center items-center">
                    <button className="bg-primary text-white p-2 w-10 h-10 flex justify-center items-center rounded-full">
                      <AiOutlineEye />
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Create;
