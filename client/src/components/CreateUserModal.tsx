import React, { useState } from "react";
import Button from "./ Button";
import CloseIcon from "@mui/icons-material/Close";
import Axios from "axios";
import toast from "react-hot-toast";
import auth from "../services/cookie-config";

function CreateUserModal({ visible, onClose }: any) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [programme, setProgramme] = useState("");
  const [residence, setResidence] = useState("");
  const [error, setError] = useState("");
  //   const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const close = () => {
    onClose();
  };

  const handleFNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFirstname(value);
  };

  const handleLNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLastName(value);
  };

  const handleProChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProgramme(value);
  };

  const handleResChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setResidence(value);
  };

  const handleSubmition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = auth.getCipher();
      const response = await Axios.post(
        "https://dcit-205-server.onrender.com/api/v1/create-student",
        {
          fName: firstName,
          lName: lastName,
          residence: residence,
          programme: programme,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        toast.success("Student created Successfully");
        setLoading(false);
        setFirstname("");
        setLastName("");
        setProgramme("");
        setResidence("");
        close();
      }
    } catch (err: any) {
      setLoading(false);
      setError(error);
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white h-[400px] w-[700px] relative rounded">
          <CloseIcon
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer"
          />
          <div className="flex justify-center items-center my-8 flex-col">
            <h1 className="text-3xl font-bold pb-8">Create Student</h1>
            <form onSubmit={handleSubmition} className="flex flex-col gap-4">
              <span className="text-red-500">
                {/* {submitted ? "Incorrect username or password" : ""} */}
              </span>
              <div className="flex gap-x-10">
                <input
                  type="text"
                  name="fName"
                  onChange={handleFNameChange}
                  value={firstName}
                  placeholder="First Name"
                  autoComplete="off"
                  className="border-2 focus:outline-blue-400 h-14 w-72 border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="lName"
                  onChange={handleLNameChange}
                  value={lastName}
                  placeholder="Last Name"
                  autoComplete="off"
                  className="border-2 focus:outline-blue-400 h-14 w-72 border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex gap-x-10">
                <input
                  type="text"
                  name="residence"
                  onChange={handleResChange}
                  value={residence}
                  placeholder="Residence"
                  autoComplete="off"
                  className="border-2 focus:outline-blue-400 h-14 w-72 border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="programme"
                  onChange={handleProChange}
                  value={programme}
                  placeholder="Programme"
                  autoComplete="off"
                  className="border-2 focus:outline-blue-400 h-14 w-72  border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <Button
                className="bg-primary text-white rounded-lg px-4 py-2 w-[36rem]"
                colspan={2}
                label="Create Student"
                loading={loading}
              />
              {/* <button
                type="submit"
                className={
                  loading
                    ? "bg-primary text-white rounded-lg px-4 py-2 bg-opacity-60"
                    : "bg-primary text-white rounded-lg px-4 py-2"
                }
              >
                {loading ? "Loading..." : "Create"}
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUserModal;
