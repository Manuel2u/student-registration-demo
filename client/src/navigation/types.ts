import { LazyExoticComponent } from "react";

export interface RouteProp {
  exact : boolean,
  component: LazyExoticComponent<() => JSX.Element>;
  path: string;
  index: boolean;
}
