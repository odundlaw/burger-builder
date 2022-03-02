import React from "react";
import Spinner from "../../components/UI/Spinner/Spinner";

const WithLoading = (Component) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component {...props} />;
    }
    return <Spinner />;
  };
};

export default WithLoading;
