import React, { ReactNode, createContext, useContext, useReducer } from "react";

import reducer from "./reducer";
import { initialState } from "./initialStates";

// Define the shape of the user context
type UserContextType = {
  state: any;
  dispatch: any;
};

// Create the context with initial values
export const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => {},
});

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
// Custom hook to use the user context
export const useUserAuth = (): any => {
  return useContext<UserContextType>(UserContext);
};
