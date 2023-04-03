import { Dispatch, SetStateAction } from "react";

export interface BasicModalComponentProp {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  size?: number;
  canClose?: boolean;
  height?: number;
}
