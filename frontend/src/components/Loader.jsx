import React from "react";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <Rings
      visible={true}
      height="60"
      width="60"
      color="black"
      ariaLabel="rings-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
