import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomInvoiceCardBGJPG from "../../assets/dashboard/card/invoice-card.jpg";
import UserManagementCardBGJPG from "../../assets/dashboard/card/user-management-card.jpg";

import { ImageDownloadURL } from "../../env";

function DashboardFeature({ records }) {
  const [cardMode, setCardMode] = useState(true);

  return (
    <div className="projects-section">
      <div className="projects-section-line">
        <div className="projects-status">
          <div className="item-status">
            <span className="status-number">{records.length}</span>
            <span className="status-type">Total Invoices</span>
          </div>
        </div>
        <div className="view-actions">
          <button className={`view-btn list-view ${!cardMode ? "active" : ""}`} title="List View" onClick={() => setCardMode(false)}>
            <FontAwesomeIcon icon="fa-solid fa-list" />
          </button>
          <button className={`view-btn grid-view ${cardMode ? "active" : ""}`} title="Grid View" onClick={() => setCardMode(true)}>
            <FontAwesomeIcon icon="fa-solid fa-grip" />
          </button>
        </div>
      </div>

      <div className="dashboard-boxes jsGridView " style={{ flexWrap: "wrap" }}>
        <div className="dashboard-box-wrapper " style={{ width: !cardMode ? "100%" : "50%" }}>
          <Link className="dashboard-card" to={`/custom-invoice/create`} style={{ backgroundImage: `url(${CustomInvoiceCardBGJPG})` }}>
            <div className="dashboard-card-content ">
              <div className="dashboard-card-header" style={{ justifyContent: "center" }}>
                <div className="name text-center">
                  <span className="text-3xl text-[var(--main-color)]   text-stroke-3">Create Invoice</span>{" "}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="dashboard-box-wrapper " style={{ width: !cardMode ? "100%" : "50%" }}>
          <Link className="dashboard-card" to={`/settings`} style={{ backgroundImage: `url(${UserManagementCardBGJPG})` }}>
            <div className="dashboard-card-content ">
              <div className="dashboard-card-header" style={{ justifyContent: "center" }}>
                <div className="name text-center">
                  <span className="text-3xl text-[var(--main-color)]   text-stroke-3">User Management</span>{" "}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardFeature;
