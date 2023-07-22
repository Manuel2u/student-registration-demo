import * as React from "react";
import RingLoader from "react-spinners/PuffLoader";

const DataLoader = () => {
  return (
    <React.Fragment>
      <div
        className={"w-full h-full flex justify-center items-center"}
        style={{ height: "70vh", width: "100%" }}
      >
        <RingLoader size={40} color={"#f11f1f"} />
      </div>
    </React.Fragment>
  );
};

export default DataLoader;
