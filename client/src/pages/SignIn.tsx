import React, { useState } from "react";
import { useUserAuth } from "../services/context";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DASHBOARD } from "../constants/page-paths";

import Button from "../components/ Button";

const logo = require("../assets/uglogo.png");

export default function SignIn() {
  const [email_username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const { push } = useHistory();
  const { login, getUser } = useUserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError("");
    setLoading(true);

    try {
      await login({ email_username, password }, async () => {
        const { dbuser } = await getUser();
        push(DASHBOARD);

        toast.success(`Signed in as ${dbuser.username}`);
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      toast.error(` ${error.response.data}`);
      // Handle other errors
      // setError(error.response.data);

      push("/signin");
    }
  };

  const imageList = [
    {
      url: "background.png",
      alt: "img1",
    },
  ];

  const bgImgstyle = {
    backgroundImage: `url(${imageList[0].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <>
      <div
        style={bgImgstyle}
        className="flex min-h-screen flex-col justify-center py-24 sm:px-6 lg:px-8 bg-opacity-70 bg-black relative w-full h-full inset-0"
      >
        <div className="bg-black bg-opacity-70  h-full w-full absolute top-0 left-0 z-10">
          <div className="flex items-center sm:pt-16 md:pt-28 gap-x-2 justify-center sm:mx-auto sm:w-full sm:max-w-md">
            <div className="h-12 w-12 border-2 border-primary bg-white rounded-full">
              <img className="h-12 p-2 w-12" src={logo} alt="Company Logo" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                UNIVERSITY
              </h2>
              <h2 className="text-3xl font-bold tracking-tight mr-4 text-white">
                OF GHANA
              </h2>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-[90%] sm:h-[50%] md:max-w-md relative">
            <div className="bg-white bg-opacity-80 py-8 px-4 shadow  sm:px-16 md:px-10">
              <div className="text-center mb-5">
                <h2 className="font-bold text-center text-2xl">
                  Welcome Back!
                </h2>
                <p className="text-gray-500">
                  Enter your account details below
                </p>
              </div>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleEmailChange}
                      id="email"
                      name="email_username"
                      value={email_username}
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handlePasswordChange}
                      id="password"
                      name="password"
                      value={password}
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4  border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me for 30 days
                    </label>
                  </div>
                </div>

                <div className="w-full">
                  <Button
                    className="flex w-full justify-center border border-transparent bg-primary py-2  text-sm font-medium text-white shadow-sm hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2"
                    colspan={2}
                    label="Sign In"
                    loading={loading}
                  />
                </div>
              </form>
              <div className="text-center mt-5">
                <p className="text-gray-500 text-sm mb-5">
                  Don't have an account?
                  <span className="text-primary"> Contact Admin</span>
                </p>
                <p className="text-primary text-sm">Forgot your password?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
