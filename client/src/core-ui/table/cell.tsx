import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { getSvg } from "../../helpers/svg-helpers";
import { colPropType } from "./types";

interface TableCellPropTypes {
  colItem: colPropType;
  data: object & any;
}

const getAccessor: any = (accessor: string, data: any, defaultEntry = null) =>
  accessor
    .split(".")
    .reduce((o: any, i: any) => o[i] || defaultEntry || "Not Applicable", data);

const getText = (
  arr: any[],
  data: any,
  defaultEntry: any = "Not Specified"
) => {
  let newString = "";
  arr.map((word) => {
    return (newString += `${
      (getAccessor(word, data, defaultEntry) &&
        getAccessor(word, data, defaultEntry)) ||
      defaultEntry
    } `);
  });
  return newString.trim();
};

const getValue = (arr: any[], data: any) => {
  let newValue;
  // eslint-disable-next-line array-callback-return
  arr.map((word) => {
    newValue = getAccessor(word, data);
  });
  return newValue;
};

// const truncate = (data: any, truncate = null) => {
//   if (truncate) {
//     if (data.split("").length > truncate) {
//       return data.split("").slice(0, truncate).join("") + "...";
//     }
//     return data;
//   }
//   return data;
// };

const aligner = (
  align: "left" | "center" | "right" | undefined,
  place: "flex" | "text"
) => {
  if (place === "flex") {
    return align === "center"
      ? `justify-center`
      : align === "right"
      ? `justify-end`
      : align === "left"
      ? `justify-start`
      : "inline-flex";
  }
  if (place === "text") {
    return align === "center"
      ? `text-center`
      : align === "right"
      ? `text-right`
      : align === "left"
      ? `text-left`
      : "";
  }
  return "";
};

const TableCell = ({ colItem, data }: TableCellPropTypes) => {
  return colItem?.type === "with-image" ? (
    <td className="px-3  py-3 whitespace-no-wrap border-b border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          {/* <img
            className={`h-10 w-10 cursor-default ${
              colItem?.imageClassname || "rounded-md"
            }  `}
            src={
              data?.format
                ? data?.format(getAccessor(colItem?.imageSrc, data))
                : colItem?.imageAccessor
                ? getAccessor(colItem?.imageAccessor, data, colItem.imageSrc)
                : colItem.imageSrc
  }
            alt={colItem?.title}
          /> */}
        </div>
        <div className="ml-4">
          {colItem.rows.map((rowItem, idx) => (
            <div
              className={`flex flex-row w-full h-full font-light ${
                colItem?.align ? "flex" : "inline-flex"
              }`}
              key={idx}
            >
              {rowItem?.text ? (
                <div
                  key={idx}
                  className={`text-sm leading-5 text-gray-900 ${rowItem?.text?.className}`}
                >
                  {getText(rowItem.text.accessor, data).toString()}
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      </div>
    </td>
  ) : (
    <td
      className={`px-3 py-3  border-b border-gray-200  ${aligner(
        colItem?.align,
        "text"
      )}  `}
    >
      {colItem.rows.map((rowItem, idx) => {
        const status = rowItem?.status;
        let statusItem;
        if (status) {
          const value = getText(status?.accessor, data);
          statusItem = status?.statusItems.find((item) => {
            return value.trim() === item.value.trim();
          });
        }

        return rowItem?.text ? (
          <div
            className={`flex flex-row pl-4 w-full h-full font-light  ${aligner(
              colItem?.align,
              "flex"
            )}`}
            key={idx}
          >
            <div
              style={
                rowItem.text.styles
                  ? rowItem.text.styles(getText(rowItem.text.accessor, data))
                  : {}
              }
              className={`text-sm leading-5  text-gray-900 ${rowItem?.text?.className}`}
            >
              {getText(
                rowItem.text.accessor,
                data,
                rowItem?.text?.defaultValue
              )}
            </div>
          </div>
        ) : rowItem?.date ? (
          <div
            className={`flex flex-row w-full h-full font-light  ${aligner(
              colItem?.align,
              "flex"
            )}`}
            key={idx}
          >
            <div>
              <div
                style={rowItem?.date?.styles}
                className={`text-sm leading-5 ${rowItem?.date.className} text-gray-900`}
              >
                {data[rowItem?.date?.accessor[0]]
                  ? moment(data[rowItem?.date?.accessor[0]]).format(
                      rowItem?.date.momentFormat
                    )
                  : rowItem?.date.defaultValue || "Not Specified"}
              </div>
            </div>
          </div>
        ) : rowItem?.boolean ? (
          <div
            className={`flex flex-row w-full h-full font-light  ${aligner(
              colItem?.align,
              "flex"
            )}`}
            key={idx}
          >
            <div
              style={rowItem?.boolean?.styles}
              className={`text-sm leading-5 inline-flex  whitespace-nowrap text-gray-900 ${
                !rowItem.boolean?.trueComponent?.className ||
                !rowItem.boolean?.trueComponent?.className
                  ? rowItem.boolean?.className
                  : ""
              }`}
            >
              {getValue(rowItem.boolean.accessor, data) === true ? (
                <span
                  style={rowItem.boolean?.trueComponent?.styles}
                  className={rowItem.boolean?.trueComponent?.className}
                >
                  {rowItem.boolean?.trueComponent?.text || "Yes"}
                </span>
              ) : (
                <span
                  style={rowItem.boolean?.trueComponent?.styles}
                  className={rowItem.boolean?.falseComponent?.className}
                >
                  {rowItem.boolean?.falseComponent?.text || "No"}
                </span>
              )}
            </div>
          </div>
        ) : rowItem?.status ? (
          <div className={`flex flex-row  ${aligner(colItem?.align, "flex")}`}>
            <span
              style={
                statusItem?.styles
                  ? statusItem.styles(getText(status?.accessor, data))
                  : {}
              }
              className={`px-2 text-xs  whitespace-nowrap  leading-5 font-normal rounded-full ${
                statusItem?.className
                  ? statusItem?.className
                  : "text-gray-600 bg-gray-300"
              }`}
            >
              {statusItem?.label ||
                rowItem?.status?.defaultValue ||
                "Not Specified"}
            </span>
          </div>
        ) : rowItem?.custom ? (
          <div className={`flex flex-row  ${aligner(colItem?.align, "flex")}`}>
            <div
              style={
                rowItem.custom.styles
                  ? rowItem.custom.styles(
                      getText(rowItem.custom.accessor, data)
                    )
                  : {}
              }
              className={`text-sm leading-5  text-gray-900 ${rowItem?.custom?.className}`}
            >
              {rowItem?.custom?.component
                ? rowItem?.custom.component(
                    getText(
                      rowItem.custom.accessor,
                      data,
                      rowItem?.custom?.defaultValue
                    )
                  )
                : getText(
                    rowItem.custom.accessor,
                    data,
                    rowItem?.custom?.defaultValue
                  )}
            </div>
          </div>
        ) : rowItem?.action ? (
          <div className={` h-full font-light inline-flex`} key={idx}>
            {rowItem["action"]?.type === "link" ? (
              <Link
              key={idx}
                title={rowItem.action?.title}
                to={`${rowItem.action?.href}`}
                className="w-8 h-8 ml-0.5 mb-0.5 inline-flex border border-grey-500 items-center justify-center rounded-full bg-transparent hover:bg-blue-200"
              >
                {rowItem.action?.svg
                  ? getSvg(rowItem.action?.svg)
                  : getSvg("none")}
              </Link>
            ) : (
              <button
                data-testid={`${rowItem.action?.title
                  .toLowerCase()
                  .replace(/[^A-Z0-9]+/gi, "_")}-table-action`}
                onClick={() =>
                  rowItem.action?.onClick &&
                  rowItem.action?.onClick(
                    data[rowItem.action?.accessor] || data
                  )
                }
                title={rowItem.action?.title}
                className="w-8 h-8 ml-0.5 mb-0.5 inline-flex border items-center justify-center border-grey-500 rounded-full bg-transparent hover:bg-blue-200 focus:outline-none"
              >
                {rowItem.action?.svg
                  ? getSvg(rowItem.action?.svg)
                  : getSvg("none")}
              </button>
            )}
          </div>
        ) : (
          <div />
        );
      })}
    </td>
  );
};

export default TableCell;
