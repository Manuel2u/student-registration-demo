import * as React from "react";
import RingLoader from "react-spinners/PuffLoader";

const DataLoader = () => {
  return (
    <React.Fragment>
      <div className={"w-full h-screen flex justify-center items-center"}>
        <RingLoader size={40} color={"#FC6DC1"} />
      </div>
    </React.Fragment>
  );
};

export default DataLoader;