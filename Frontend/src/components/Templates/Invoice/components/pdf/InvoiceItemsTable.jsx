import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableServiceHeader from "./InvoiceTableServiceHeader";
import InvoiceTableServiceRow from "./InvoiceTableServiceRow";
import InvoiceTableTaxRow from "./InvoiceTableTaxRow";
import InvoiceTableTaxHeader from "./InvoiceTableTaxHeader";
import InvoiceTableRowFooter from "./InvoiceTableRowFooter";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const InvoiceItemsTable = ({ invoice }) => (
  <View style={styles.container}>
    <View style={styles.tableContainer} wrap={false}>
      <InvoiceTableServiceHeader />
      <InvoiceTableServiceRow services={invoice.services} />
    </View>

    {invoice.taxes.length > 0 && (
      <View style={styles.tableContainer} wrap={false}>
        <InvoiceTableTaxHeader />
        <InvoiceTableTaxRow taxes={invoice.taxes} />
      </View>
    )}

    <View style={styles.tableContainer} wrap={false}>
      <InvoiceTableRowFooter total={invoice.total_amount} is_round_off={invoice.is_round_off} round_off={invoice.round_off} />
    </View>
  </View>
);

export default InvoiceItemsTable;
