import { Fragment, SetStateAction, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { UserCircleIcon, HomeIcon, XIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { Dispatch } from "react";
import { classNames } from "../../../helpers/classnames";
import { CREATE_STUDENT, DASHBOARD } from "../../../constants/page-paths";
import { LogoutModal } from "../logout/index";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../../../services/context";
import { toast } from "react-hot-toast";

const logo = require("../../../assets/uglogo.png");
const male = require("../../../assets/male.jpeg");

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar: FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { getUser } = useUserAuth();

  const [navigation, setNavigation] = useState([
    {
      name: "Dashboard",
      href: DASHBOARD,
      icon: HomeIcon,
      current: true,
    },
    {
      name: "Students",
      href: CREATE_STUDENT,
      icon: UserCircleIcon,
      current: false,
    },
  ]);

  const [user, setUser]: any = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { dbuser } = await getUser();
        await setUser(dbuser);
      } catch (err) {
        toast.error("There was an error getting current user");
      }
    }

    fetchUser();
  }, [getUser]);

  const handleItemClick = (index: any) => {
    const updatedNavItems = navigation.map((item, i) => ({
      ...item,
      current: i === index,
    }));
    setNavigation(updatedNavItems);
    console.log(navigation);
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex justify-start items-center flex-shrink-0 px-3 gap-x-2">
                <img
                  className="h-10 w-10 border-2 mt-2 rounded-full border-primary"
                  src={logo}
                  alt="Workflow"
                />
                <div className={"mt-2"}>
                  <span className="text-3xl font-bold text-primary">UG</span>
                </div>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                          "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            pathname === item.href
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div
          style={{ width: "19vw" }}
          className="flex flex-col border-r border-gray-200 pt-5 pb-4 bg-gray-100"
        >
          <div className="flex justify-start items-center flex-shrink-0 px-3 gap-x-2">
            <div className="h-12 w-12 border-2 border-primary bg-white rounded-full">
              <img className="h-12 p-2 w-12" src={logo} alt="Company Logo" />
            </div>
            <div className="">
              <span className="text-3xl font-bold text-primary">UG</span>
            </div>
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* User account dropdown */}

            {/* Navigation */}
            <nav className="px-3 mt-8 flex flex-col justify-between h-screen">
              <div className="space-y-5">
                {navigation.map((item) => (
                  <Link
                    onClick={handleItemClick}
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "bg-primary text-white font-medium"
                        : "text-gray-900  font-normal ",
                      "group flex items-center  px-2 py-3 text-sm  rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? "text-gray-900" : "text-white ",
                        "mr-2 flex-shrink-0 h-5 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className=" flex flex-col gap-y-7 mb-4">
                <div className="flex items-center gap-x-3">
                  <CiSettings color="#9E9E9E" size={27} />
                  <p className="text-gray-900 font-normal">Settings</p>
                </div>
                <div className="bg-gray-500 h-[0.5px] w-auto"></div>
                <div className="flex items-center gap-x-3">
                  <img
                    src={male}
                    className="w-10 h-10 rounded-full border-[1.5px]"
                    alt="profile"
                  />
                  <div>
                    <p className="text-sm">{user?.username}</p>
                    <p className="text-sm text-gray-600">
                      {user?.email.substring(0, 17)}...
                    </p>
                  </div>
                  <div onClick={() => setShowLogoutModal(true)}>
                    <FiLogOut size={20} color="#9E9E9E" />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal} />
    </>
  );
};

export default SideBar;
