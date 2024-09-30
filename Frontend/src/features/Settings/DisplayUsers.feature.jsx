import { useState } from "react";
import { useGlobalState } from "../../app/global_store";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DisplayUsers() {
  const { user_list } = useGlobalState();
  const [cardMode, setCardMode] = useState(true);
  return (
    <div className="projects-section  px-2 py-3 my-3 " style={{ borderRadius: "16px" }}>
      <div className="projects-section-line">
        <div className="projects-status">
          <div className="item-status">
            <span className="status-number">{user_list.length}</span>
            <span className="status-type">Total Users</span>
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
      <div className="py-2">
        <div className="font-semibold">Registered Users</div>
        <div className="card-boxes jsGridView ">
          {user_list.map((user, idx) => {
            const { id, username, firstName, lastName, email, emailVerified, createdTimestamp, access } = user;
            const access_keys = Object.keys(access);
            return (
              <div key={`complete_invoice_${idx}_${id}`} className="card-box-wrapper" style={!cardMode ? { width: "100%" } : {}}>
                <div className="card">
                  <div className="card-content">
                    <div className="card-header">
                      <div className="name font-bold">{username}</div>
                    </div>
                    <p className="card-line">
                      <span className="font-semibold">Email </span> <span>{email}</span>
                    </p>
                    <p className="card-line">
                      <span className="font-semibold">Email Verified </span>{" "}
                      <span>
                        {emailVerified ? (
                          <FontAwesomeIcon className="text-green-600" icon="fa-solid fa-circle-check" />
                        ) : (
                          <FontAwesomeIcon className="text-red-600" icon="fa-solid fa-circle-xmark" />
                        )}
                      </span>
                    </p>
                    <p className="card-line">
                      <span className="font-semibold">First Name </span> <span>{firstName}</span>
                    </p>
                    <p className="card-line">
                      <span className="font-semibold">Last Name </span> <span>{lastName}</span>
                    </p>
                    <div className="card-line">
                      <span className="font-semibold">Access </span>{" "}
                      <div className="flex  flex-wrap capitalize">
                        {access_keys.map((acc, idx2) => (
                          <span key={`access_${idx2}`}>
                            {acc}
                            {idx2 !== access_keys.length - 1 ? ", " : ""}&nbsp;
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="card-line time">Account created at {moment(createdTimestamp).format("ddd, DD-MM-yyyy  h:mm A")}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default DisplayUsers;
