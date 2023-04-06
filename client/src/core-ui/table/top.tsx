import React, { Fragment } from "react";
// import Search from "@core-ui/search";

interface TopTableComponentProps {
  limit: any;
  setLimit: any;
  refetch: any;
  setSkip: any;
}

const TopTableComponent = ({ limit = 10, setLimit, refetch, setSkip }:TopTableComponentProps) => {
  return (
    <Fragment>
      <div className="mt-6 grid grid-cols-1 static row-gap-6 col-gap-4 sm:grid-cols-6 mb-5">
        <div className="sm:col-span-3">
          {/* <Search /> */}
        </div>
        <div className="sm:col-span-2" />
        <div className="sm:col-span-1">
          <div className="mt-1 rounded-none shadow-sm flex flex-row items-center">
            <select
              id="pagination"
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setSkip(0);
                refetch();
              }}
              className="form-select rounded-none font-light border-gray-300 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            >
              <option value={10}>10 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopTableComponent;
