import { LazyExoticComponent } from "react";

export interface RouteProp {
  component: LazyExoticComponent<() => JSX.Element>;
  path: string;
}
