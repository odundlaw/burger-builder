import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { useSearchParams } from "react-router-dom";

const WithRouter = (Component) => {
  return function WithRoute(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const outletContext = useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();
    return (
      <Component
        navigate={navigate}
        location={location}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        outletContext={outletContext}
        {...props}
      />
    );
  };
};

export default WithRouter;
