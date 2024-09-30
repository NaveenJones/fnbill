import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { current_month, current_year } from "../../common";

function LoginLayout() {
  return (
    <>
      <div className="app-content pl-[16px!important]">
        <div className="projects-section">
          <div className="projects-section-header">
            <p> FnBill </p>
            <p className="time">
              {current_month}, {current_year}
            </p>
          </div>
          <div
            style={{
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginLayout;
