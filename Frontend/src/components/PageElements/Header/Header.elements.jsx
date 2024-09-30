import React, { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useKeycloak from "../../../hooks/useKeycloak";
import { share_regex } from "../../../env";

function Header() {
  const { logout: keycloakLogout } = useKeycloak();
  const [displayMode, setDisplayMode] = useState(true);
  const isMatch = share_regex.test(location.pathname);

  const logout = () => {
    keycloakLogout();
    toast.success("Logging Out");
  };

  return (
    <div className="app-header">
      <div className="app-header-left">
        <span className="app-icon"></span>
        <p className="app-name">FnBill</p>
      </div>
      <div className="app-header-right">
        <button
          className="w-5 h-5 rounded-full flex justify-center items-center  hover:text-yellow-400"
          title="Switch Theme"
          onClick={() => {
            const mode = document.body.style.filter;
            const state = mode === "invert(100%)";
            document.body.style.filter = state ? "invert(0%)" : "invert(100%)";
            setDisplayMode(state);
          }}
        >
          {displayMode ? <FontAwesomeIcon icon="fa-solid fa-moon" /> : <FontAwesomeIcon icon="fa-solid fa-sun" />}
        </button>
        {!isMatch && (
          <>
            <button className="w-5 h-5 rounded-full flex justify-center items-center" title="Add New Project">
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>
            <button className="w-5 h-5 rounded-full flex justify-center items-center">
              <img className="rounded-full w-5 h-5" src="https://picsum.photos/200/300" />
            </button>
            <button className=" p-1  flex justify-center gap-1 items-center  hover:text-red-600" onClick={logout}>
              <FontAwesomeIcon icon="fa-solid fa-power-off" />
              {/* <span className="text-sm">Log Out</span> */}
            </button>
          </>
        )}
      </div>
      <button className="messages-btn">
        <FontAwesomeIcon icon="fa-solid fa-message" />
      </button>
    </div>
  );
}

export default Header;
