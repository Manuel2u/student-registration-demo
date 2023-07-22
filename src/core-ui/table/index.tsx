import TableCell from "./cell";
import React, { Fragment } from "react";
import { TableHeadType, TableComponentProps } from "./types";


const TableHead = ({ cols }: TableHeadType) => {
  return (
    <Fragment>
      <thead>
        <tr>
          {cols.map((col, i) => (
            <Fragment key={i}>
              <th
                className={`px-6 py-3 border-b border-gray-200 bg-gray-50 text-${col?.align || "left"
                  } text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider`}
              >
                {col.title}
              </th>
            </Fragment>
          ))}
        </tr>
      </thead>
    </Fragment>
  );
};



const TableComponent = ({
  refetch,
  limit,
  setLimit,
  data,
  total,
  setEnd,
  skip,
  setSkip,
  cols,
  showTop,
  showPagination,
}: TableComponentProps) => {
  return (
    <Fragment>
      <div className={"flex flex-col"}>
        <div className="-my-2 py-2">
          <div className="align-middle inline-block min-w-full shadow  sm:rounded-none">
            <table className="min-w-full">
              <TableHead cols={cols} />

              <tbody className="bg-white">
                {data?.map((dataItem, i) => (
                  <Fragment key={i}>
                    <tr
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      {cols.map((col, j) => (
                        <Fragment key={j}>
                          <TableCell colItem={col} data={dataItem} />
                        </Fragment>
                      ))}
                    </tr>
                  </Fragment>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TableComponent;