import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../services/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../components/ Button";

export default function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const navigate = useNavigate();
  const { signup, getUser, setCustomer } = useUserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup({ username, email, password }, async () => {
        const { dbuser } = await getUser();
        await setCustomer(dbuser);
        console.log(dbuser);
        setLoading(false);
        toast.success(`Signed Up as ${dbuser.username}`);
      });

      navigate("/dashboard");
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data);
      // toast.error(error.response.data);
      console.log(error);
    }
  };

  return (
    <>
      {error && toast.error(error)}
      <div className="flex min-h-full flex-1 justify-center pr-7   bg-background h-screen">
        <div className="flex flex-1 flex-col justify-center  py-12  lg:flex-none lg:px-20 xl:px-24">
          <div className="ml-8 mb-14 md:w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-white">
                Sign Up for an account
              </h2>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-darktxt">
                    Sign up with
                  </p>

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <Link
                        to="/"
                        className="inline-flex w-full justify-center rounded-md border bg-background border-gray-300  py-2 px-4 text-sm font-medium text-darktxt shadow-sm hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Facebook</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>

                    <div>
                      <Link
                        to="/"
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-background py-2 px-4 text-sm font-medium text-darktxt shadow-sm hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Twitter</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </Link>
                    </div>

                    <div>
                      <Link
                        to="/"
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-background py-2 px-4 text-sm font-medium text-darktxt shadow-sm hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with GitHub</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-darktxt">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-darktxt"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleUserNameChange}
                    id="username"
                    name="username"
                    value={username}
                    type="text"
                    autoComplete="current-username"
                    required
                    className="block w-full appearance-none bg-background rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-darktxt"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={handleEmailChange}
                        id="email"
                        name="email"
                        value={email}
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border bg-background border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-darktxt"
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
                        className="block w-full appearance-none bg-background rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link
                        to="signin"
                        className="font-medium text-primary hover:text-tertiary"
                      >
                        Already have an account?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button
                      className="flex w-full justify-center  rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2"
                      colspan={2}
                      label="Sign Up"
                      loading={loading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative hidden w-0 flex-1 lg:flex"> */}
        {/* <img
            className="absolute right-0 object-contain object-right w-full h-full"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTA1NyIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTA1NyAxMDgwIj4NCiAgPGRlZnM+DQogICAgPGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPg0KICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV8yMjYyOCIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjI2MjgiIHdpZHRoPSIxMDU3IiBoZWlnaHQ9IjEwODAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg2MykiIGZpbGw9IiMwMWM3YjEiIHN0cm9rZT0iIzcwNzA3MCIgc3Ryb2tlLXdpZHRoPSIxIi8+DQogICAgPC9jbGlwUGF0aD4NCiAgPC9kZWZzPg0KICA8ZyBpZD0iQmFja2dyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg2MykiIGNsaXAtcGF0aD0idXJsKCNjbGlwLXBhdGgpIj4NCiAgICA8ZyBpZD0iR3JvdXBfNDA4NzAiIGRhdGEtbmFtZT0iR3JvdXAgNDA4NzAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyMjYuMTg4IDIxNS42MzEpIj4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzMxMzg5IiBkYXRhLW5hbWU9IlBhdGggMzEzODkiIGQ9Ik0xMDUwLjEyOSw3OC4yNTVjMzc3LjIxLDMyNy41MDcsNDgxLjUzMiw2NjkuNyw1LjM2OSw4MTEuNDczcy0xMjM1LjEyNy03Mi40LTEwMTctMjA2LjczNlM2NzIuOTE5LTI0OS4yNTIsMTA1MC4xMjksNzguMjU1WiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuOTc0LCAwLjIyNSwgLTAuMjI1LCAtMC45NzQsIDEyMy4zNzEsIDY0Ny4xOCkiIGZpbGw9IiMwMWM3YjEiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzMxMzg3IiBkYXRhLW5hbWU9IlBhdGggMzEzODciIGQ9Ik05ODAuMDU5LDc5LjQ3OWMzNTIuMDQxLDMzMi42MjUsNDQ5LjQsNjgwLjE2MSw1LjAxLDgyNC4xNTRTLTE2Ny42NDQsODMwLjEsMzUuOTI2LDY5My42NjYsNjI4LjAxOC0yNTMuMTQ3LDk4MC4wNTksNzkuNDc5WiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuOTk5LCAwLjAzNSwgLTAuMDM1LCAtMC45OTksIDQ3LjUwMiwgNjQ2Ljc5NCkiIGZpbGw9IiNmZmY0Y2MiLz4NCiAgICA8L2c+DQogICAgPGcgaWQ9Ikdyb3VwXzQwODk5IiBkYXRhLW5hbWU9Ikdyb3VwIDQwODk5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NjguOTk3IDU5MS40MzcpIj4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzMzNDA1IiBkYXRhLW5hbWU9IlBhdGggMzM0MDUiIGQ9Ik00NTguNTcsMjY4LjYzOWMtMjEtNy41ODktNDIuMTMyLDYuODM1LTI1Ljg1LDIwLjQzMiwyMS45MSwxOC4zLDQ5LjEwNiw0Ljk3Myw1MS42MzQtLjhzLTMtNTQuMDc1LTE3LjcxNi01My40NDJjLTE4LjM4NywxLjk5Mi0xLjQsMzYuMDUtMS40LDM2LjA1UzQ2My41MTIsMjcwLjE4MSw0NTguNTcsMjY4LjYzOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MjYuOTM3IC0yMzQuODE4KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZlYThkIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjYiLz4NCiAgICA8L2c+DQogICAgPGcgaWQ9Ikdyb3VwXzQwOTAwIiBkYXRhLW5hbWU9Ikdyb3VwIDQwOTAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTI0LjQ2NiAxMjkuOTI5KSByb3RhdGUoLTE2KSI+DQogICAgICA8cGF0aCBpZD0iUGF0aF8zMzQwNiIgZGF0YS1uYW1lPSJQYXRoIDMzNDA2IiBkPSJNNzQ2LjM2OCw5NS42OTNjNS42LTI0LjM4OS0xMy4zMTctNDUuOTUxLTI2LjI0LTI1Ljk5My0xNy4zODgsMjYuODU5LDEuMTI2LDU1LjMxMyw3LjksNTcuMzQyczU5Ljc2MS0xMC42NjEsNTcuMDYxLTI2Ljk1OGMtNC43MDgtMjAuMTg3LTQwLjMsMy4zMzYtNDAuMywzLjMzNlM3NDUuMzI0LDEwMS40LDc0Ni4zNjgsOTUuNjkzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcxMi44ODUgLTYxLjg1KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzgwZTEzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjUiLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg0K"
            alt=""
          />
          <div className="absolute inset-0 flex-1 flex items-center justify-center">
            <img
              className="object-cover h-[50%] w-[50%]"
              // src="https://hubtel.com/wp-content/themes/hubtel/dist/images/new-jumbotron.png"
              alt="Design Logo"
            />
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
}
