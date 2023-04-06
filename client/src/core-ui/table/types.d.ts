import { SvgName, SvgNames } from "@helpers/svg-helpers";
import React from "react";

export type colTypes = "with-image" | "value" | "actions" | "custom";

export type StatusItemsProps = {
  label: any;
  value: any;
  className?: React.HTMLAttributes<HTMLElement>["className"];
  styles?: ((value: any) => React.CSSProperties);
};

export type rowPropType = {
  text?: {
    accessor: any[];
    className?: string;
    defaultValue?: any;
    styles?: ((value: any) => React.CSSProperties);
  };
  date?: {
    accessor: any[];
    className?: string;
    momentFormat: string;
    defaultValue?: any;
    styles?: React.CSSProperties;
  };
  status?: {
    accessor: any;
    statusItems: StatusItemsProps[];
    defaultValue?: any;
    styles?: React.CSSProperties;
  };
  boolean?: {
    accessor: any;
    trueComponent?: {
      text?: any;
      styles?: React.CSSProperties;
      className?: React.HTMLAttributes<HTMLElement>["className"];
    };
    falseComponent?: {
      text?: any;
      styles?: React.CSSProperties;
      className?: React.HTMLAttributes<HTMLElement>["className"];
    };
    className?: React.HTMLAttributes<HTMLElement>["className"];
    styles?: React.CSSProperties;
  };
  custom:{
    accessor: any;
    defaultValue?: any;
    className?: React.HTMLAttributes<HTMLElement>["className"];
    styles?: ((value: any) => React.CSSProperties);
    component?: ((value: any) => JSX.Element)
  }
  action?: {
    svg?: SvgName;
    title: any;
    type: "button" | "link";
    href?: any;
    onClick: (data?: any) => void;
    accessor?: any;
  };
  custom?: {};
};

export type rowTypes =
  | "value"
  | "date"
  | "text"
  | "pill"
  | "banner"
  | "button"
  | "align"
  | "action";

// export type rowPropType = {
//   text: any;
//   type: rowTypes;
//   svgName: any;
//   onClick: (data?: any) => void;
//   accessor: any;
//   className: string;
//   format: string;
//   svgName?: SvgNames;
//   href?: string;
//   custom?: (data?: any) => JSX.Element | JSX.Element[];
// };

export type colPropType = {
  title?: string;
  type?: colTypes;
  flex?: any;
  imageSrc?: any;
  imageAccessor?: any;
  imageClassname?: any;
  align?: "left" | "right" | "center";
  rows: rowPropType[];
};

export interface TableHeadType {
  cols: colPropType[];
}

export interface TableComponentProps {
  showTop?: any;
  showPagination?: any;
  limit?: any;
  skip?: any;
  end?: any;
  refetch?: any;
  setLimit?: any;
  setSkip?: any;
  setEnd?: any;
  data: any[];
  total?: any;
  cols: colPropType[];
}
