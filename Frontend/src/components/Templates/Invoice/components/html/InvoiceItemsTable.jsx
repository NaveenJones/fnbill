import React from "react";
import InvoiceTableServiceHeader from "./InvoiceTableServiceHeader";
import InvoiceTableServiceRow from "./InvoiceTableServiceRow";
import InvoiceTableTaxRow from "./InvoiceTableTaxRow";
import InvoiceTableTaxHeader from "./InvoiceTableTaxHeader";
import InvoiceTableRowFooter from "./InvoiceTableRowFooter";

const InvoiceItemsTable = ({ invoice }) => (
  <div className="flex flex-row flex-wrap mt-2 w-full">
    <div className="flex w-full flex-row flex-wrap ">
      <InvoiceTableServiceHeader />
      <InvoiceTableServiceRow services={invoice.services} />
    </div>

    {invoice.taxes.length > 0 && (
      <div className="flex mt-2 w-full flex-row flex-wrap ">
        <InvoiceTableTaxHeader />
        <InvoiceTableTaxRow taxes={invoice.taxes} />
      </div>
    )}

    <div className="flex w-full flex-row flex-wrap ">
      <InvoiceTableRowFooter total={invoice.total_amount} is_round_off={invoice.is_round_off} round_off={invoice.round_off} />
    </div>
  </div>
);

export default InvoiceItemsTable;
