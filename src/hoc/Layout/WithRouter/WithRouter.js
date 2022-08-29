import useIsMounted from "ismounted";
import React from "react";
import { useDispatch, useStore } from "react-redux";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  Navigate,
} from "react-router";
import { useSearchParams } from "react-router-dom";

const WithRouter = (Component) => {
  return function WithRoute(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const outletContext = useOutletContext();
    const store = useStore();
    const isMounted = useIsMounted();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    return (
      <Component
        navigate={navigate}
        location={location}
        Redirect={Navigate}
        store={store}
        isMounted={isMounted}
        dispatch={dispatch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        outletContext={outletContext}
        {...props}
      />
    );
  };
};

export default WithRouter;
