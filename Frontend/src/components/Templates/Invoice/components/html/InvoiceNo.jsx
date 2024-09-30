import React, { Fragment } from "react";

const InvoiceNo = ({ invoice }) => (
  <Fragment>
    <div className="flex flex-row mt-9 justify-end">
      <div className="w-15">Invoice No:</div>
      <div className="text-sm font-bold">{invoice.invoice_id}</div>
    </div>
    <div className="flex flex-row justify-end">
      <div className="w-15">Date: </div>
      <div>{invoice.dop}</div>
    </div>
  </Fragment>
);

export default InvoiceNo;
