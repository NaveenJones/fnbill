import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import RecieptTableServiceHeader from "./RecieptTableServiceHeader";
import RecieptTableServiceRow from "./RecieptTableServiceRow";
import RecieptTableTaxRow from "./RecieptTableTaxRow";
import RecieptTableTaxHeader from "./RecieptTableTaxHeader";
import RecieptTableRowFooter from "./RecieptTableRowFooter";

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

const RecieptItemsTable = ({ invoice }) => (
  <View style={styles.container}>
    <View style={styles.tableContainer} wrap={false}>
      <RecieptTableServiceHeader />
      <RecieptTableServiceRow services={invoice.services} />
    </View>

    {invoice.taxes.length > 0 && (
      <View style={styles.tableContainer} wrap={false}>
        <RecieptTableTaxHeader />
        <RecieptTableTaxRow taxes={invoice.taxes} />
      </View>
    )}
    <View style={styles.tableContainer} wrap={false}>
      <RecieptTableRowFooter total={invoice.total_amount} is_round_off={invoice.is_round_off} round_off={invoice.round_off} />
    </View>
  </View>
);

export default RecieptItemsTable;
