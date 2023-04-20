import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar-horizontal";
import CreateUserModal from "../components/CreateUserModal";
import axios from "axios";
import ListTableComponent from "../components/list-table";
import { AiOutlinePlusCircle } from "react-icons/ai";
import auth from "../services/cookie-config";
import { colPropType } from "../core-ui/table/types";

function Create() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [search, setSearch] = useState("");

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
    setLoading(false);
    await setStudents(response.data);
  };

  //fetch students on page load
  useEffect(() => {
    fetchStudents();
  }, [students]);

  const cols: colPropType[] = [
    {
      title: "Student ID",
      type: "value",
      rows: [{ text: { accessor: ["studentID"] } }],
    },
    {
      title: "Programme",
      type: "value",
      rows: [{ text: { accessor: ["programme"] } }],
    },
    {
      title: "Name of Student",
      type: "value",
      rows: [{ text: { accessor: ["name"] } }],
    },
    {
      title: "Contact",
      type: "value",
      rows: [
        { text: { accessor: ["contact"], className: "font-medium" } },
        { text: { accessor: ["email"] } },
      ],
    },
    {
      title: "Residence",
      type: "value",
      rows: [{ text: { accessor: ["residence"] } }],
    },
    {
      title: "Actions",
      type: "actions",
      align: "right",
      rows: [
        {
          action: {
            type: "button",
            title: "View",
            svg: "view",
            onClick: function (data: any) {},
          },
        },
        {
          action: {
            type: "button",
            title: "Edit",
            svg: "edit",
            onClick: function (data: any) {},
          },
        },
      ],
    },
  ];

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex">
        <div></div>
        <div className="flex flex-col w-screen">
          <Navbar2 />
          <div className="bg-gray-100 h-[50.5vw] pb-1 px-5">
            <div className="flex justify-between items-center mt-5 px-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg width={20} height={20} viewBox="0 0 512 512">
                    <path
                      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                      fill="none"
                      stroke="#b4b4b4"
                      strokeMiterlimit={10}
                      strokeWidth="32px"
                    />
                    <path
                      fill="none"
                      stroke="#b4b4b4"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      strokeWidth="32px"
                      d="M338.29 338.29L448 448"
                    />
                  </svg>
                </div>
                <div>
                  <input
                    placeholder="Search"
                    className="pl-9 w-72 h-10 border-[1.5px]"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-primary flex items-center justify-center text-white h-10 w-36"
                >
                  <AiOutlinePlusCircle className="mr-2" />
                  Add Student
                </button>
              </div>
            </div>
            <main className={"mt-5 px-5 overflow-x-none"}>
              <ListTableComponent
                refetch={""}
                setLimit={setLimit}
                limit={limit}
                loading={loading}
                data={students || []}
                total={students.length}
                skip={skip}
                setSkip={setSkip}
                search={search}
                setSearch={setSearch}
                end={end}
                setEnd={setEnd}
                cols={cols}
                showPagination
              />
            </main>
          </div>
        </div>
      </div>
      <CreateUserModal onClose={handleClose} visible={showModal} />
    </>
  );
}

export default Create;
