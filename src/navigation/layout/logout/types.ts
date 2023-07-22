import { Dispatch, SetStateAction } from "react";

export interface LogoutProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
