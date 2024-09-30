import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import InvoiceHeader from "./components/pdf/InvoiceHeader";
import BillShipTo from "./components/pdf/BillShipTo";
import InvoiceItemsTable from "./components/pdf/InvoiceItemsTable";
import InvoiceThankYouMsg from "./components/pdf/InvoiceThankYouMsg";
import InvoiceTableRowFooter from "./components/pdf/InvoiceTableRowFooter";
import InvoiceInformation from "./components/pdf/InvoiceInformation";
import InvoicePayment from "./components/pdf/InvoicePayment";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
});

function InvoiceFormalTemplate({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceHeader invoice={invoice} />
        <BillShipTo invoice={invoice} />
        <InvoiceInformation invoice={invoice} />
        <InvoiceItemsTable invoice={invoice} />
        {/* <InvoiceTableFooter invoice={invoice.services} /> */}
        <InvoicePayment invoice={invoice} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
}

export default InvoiceFormalTemplate;
