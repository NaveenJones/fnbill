import React from "react";
import InvoiceHeader from "./components/html/InvoiceHeader";
import BillShipTo from "./components/html/BillShipTo";
import InvoiceItemsTable from "./components/html/InvoiceItemsTable";
import InvoiceTableRowFooter from "./components/html/InvoiceTableRowFooter";
import InvoiceInformation from "./components/html/InvoiceInformation";
import InvoicePayment from "./components/html/InvoicePayment";
import InvoiceTransaction from "./components/html/InvoiceTransaction";

const styles = {
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
};

function InvoiceFormalHTMLTemplate({ invoice }) {
  const { invoice_data, payment_details } = invoice;
  return (
    <div className="text-black border rounded-lg max-w-[800px] ">
      <div size="A4" style={styles.page}>
        <InvoiceHeader invoice={invoice_data} />
        <BillShipTo invoice={invoice_data} />
        <InvoiceInformation invoice={invoice_data} />
        <InvoiceItemsTable invoice={invoice_data} />
        <InvoicePayment invoice={invoice_data} />
        <InvoiceTransaction payment_details={payment_details} />
      </div>
    </div>
  );
}

export default InvoiceFormalHTMLTemplate;
{
  /* <InvoiceTableFooter invoice={invoice.services} /> */
}
