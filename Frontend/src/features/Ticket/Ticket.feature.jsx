import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCustomInvoicesState } from "../../app/stores/custom_invoices_store";
import { ImageDownloadURL } from "../../env";
import moment from "moment";
import { Link } from "react-router-dom";

function TicketFeature({ invoice, title }) {
  console.log(invoice);
  return (
    <div className="messages-section">
      <button className="messages-close">
        <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
      </button>
      <div className="projects-section-header text-center">
        <p>{title}</p>
      </div>
      <div className="messages">
        {invoice ? (
          invoice.map((invoice, idx) => {
            const { id, invoice_id, created_at, state, invoice_data } = invoice;
            return (
              <Link key={`invoice_${idx}_${id}`} className="message-box" to={`/custom-invoice/generate/${id}`}>
                <img className="profile-image" src={`${ImageDownloadURL}${invoice_data.logo_file}`} alt="profile image" />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">#{invoice_id}</div>
                  </div>
                  <p className="message-line">
                    {`${invoice_data.billing_address[0].value} from ${invoice_data.billing_address[1].value}, ${invoice_data.billing_address[2].value}, ${invoice_data.billing_address[3].value}, ${invoice_data.billing_address[4].value}`}
                  </p>
                  <p className="message-line">
                    <span className="font-semibold">Total Amount </span> <span>₹{invoice_data.total_amount}</span>
                  </p>

                  <p className="message-line time">{moment(created_at).format("HH:MM MMMM DD, YYYY")}</p>
                  {/* <div
                    className="h-32  w-full  bg-no-repeat"
                    style={{
                      background: `url(${ImageDownloadURL}${invoice_data.ad_file})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                    }}
                  ></div> */}
                </div>
              </Link>
            );
          })
        ) : (
          <> No Records</>
        )}
      </div>
    </div>
  );
}

export default TicketFeature;
