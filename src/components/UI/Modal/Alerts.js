import React from "react";

import reactDom from "react-dom";

import swal from "@sweetalert/with-react";

const Alerts = () =>
  reactDom.createPortal(
    <>{swal("An Error Occured", "You clicked the button!", "error")}</>,
    document.getElementById("modalRoot")
  );

export default Alerts;
