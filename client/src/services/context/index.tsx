import React, { useState, createContext, useContext } from "react";
import Axios from "axios";
import auth from "../cookie-config";

// Define the type for the customer object
type Customer = {
  id: number;
  username: string;
  email: string;
};

// Define the shape of the user context
type UserContextType = {
  customer: Customer | null;
  signup: (userData: any, callback: () => void) => Promise<void>;
  login: (userData: any, callback: () => void) => Promise<void>;
  logout: () => void;
  getUser: () => any;
  setCustomer: any;
};

// Create the context with initial values
export const UserContext = createContext<UserContextType>({
  customer: null,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  getUser: async () => {},
  setCustomer: null,
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  // Get user data function
  const getUser = async () => {
    try {
      const token = auth.getCipher();
      const response = await Axios.get<{ dbuser: Customer }>(
        `https://dcit-205-server.onrender.com/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { dbuser } = response.data;
      setCustomer(dbuser);
      return { dbuser };
    } catch (error) {
      console.log(error);
      setCustomer(null);
    }
  };

  // Signup function
  const signup = async ({ username, email, password }: any, callback: any) => {
    try {
      const response = await Axios.post(`https://dcit-205-server.onrender.com/auth/signup`, {
        username,
        email,
        password,
      });
      console.log(response.data);
      const { user, access_token } = response.data;
      auth.setCipher(access_token);
      setCustomer(user);
      callback();
    } catch (error) {
      console.log(error);
    }
  };

  // Login function
  const login = async (userData: any, callback: any) => {
    try {
      const response = await Axios.post(
        `https://dcit-205-server.onrender.com/auth/signin`,
        userData
      );
      const token = response.data.user.token;
      auth.setCipher(token);
      setCustomer(null);
      callback();
    } catch (error) {
      console.log(error);
      setCustomer(null);
    }
  };

  // Logout function
  const logout = () => {
    auth.clearCipher();
    setCustomer(null);
  };

  // Call getUser on mount
  // React.useEffect(() => {
  //   getUser();
  // }, []);

  // Return the provider with the user context value
  return (
    <UserContext.Provider
      value={{ login, logout, customer, signup, getUser, setCustomer }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserAuth = (): any => {
  return useContext<UserContextType>(UserContext);
};
