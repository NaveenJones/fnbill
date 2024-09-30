import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import RecieptHeader from "./components/pdf/RecieptHeader";
import BillShipTo from "./components/pdf/BillShipTo";
import RecieptItemsTable from "./components/pdf/RecieptItemsTable";
import RecieptThankYouMsg from "./components/pdf/RecieptThankYouMsg";
import RecieptTableRowFooter from "./components/pdf/RecieptTableRowFooter";
import RecieptInformation from "./components/pdf/RecieptInformation";
import RecieptPayment from "./components/pdf/RecieptPayment";
import RecieptTransaction from "./components/pdf/RecieptTransaction";

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

function ReceiptFormalTemplate({ invoice, payment_details }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <RecieptHeader invoice={invoice} />
        <BillShipTo invoice={invoice} />
        <RecieptInformation invoice={invoice} />
        <RecieptItemsTable invoice={invoice} />
        {/* <RecieptTableFooter invoice={invoice.services} /> */}
        <RecieptPayment invoice={invoice} />
        <RecieptTransaction payment_details={payment_details} />
        <RecieptThankYouMsg />
      </Page>
    </Document>
  );
}

export default ReceiptFormalTemplate;
