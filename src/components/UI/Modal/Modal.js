import React, { useEffect } from "react";
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {
  useEffect(() =>{
    return true
  }, [props.show, props.children])
  return (
    <Wrapper>
      <Backdrop show={props.show} backdropClick={props.clickBackdrop} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Wrapper>
  );
};


export default Modal;
