import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 5,
    width: "100%",
  },
  bill_send_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billTo: {
    marginTop: 10,
    marginRight: 2,
    padding: 5,
    fontFamily: "Helvetica-Oblique",
    width: "100%",
    fontWeight: "bold",
    backgroundColor: "#bff0fd",
    textAlign: "center",
  },
  shipTo: {
    marginTop: 10,
    marginLeft: 2,

    padding: 5,
    fontFamily: "Helvetica-Oblique",
    width: "100%",
    fontWeight: "bold",
    backgroundColor: "#bff0fd",
    textAlign: "center",
  },
  cell: {
    maxWidth: "225px",
  },
});

const BillShipTo = ({ invoice }) => (
  <View style={styles.bill_send_container} wrap={false}>
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Bill To</Text>
      <Text style={styles.cell}>Customer Name: {invoice.billing_address[0].value}</Text>
      <Text style={styles.cell}>Street Address: {invoice.billing_address[1].value}</Text>
      <Text style={styles.cell}>City: {invoice.billing_address[2].value}</Text>
      <Text style={styles.cell}>State: {invoice.billing_address[3].value}</Text>
      <Text style={styles.cell}>Zip code: {invoice.billing_address[4].value}</Text>
    </View>
    <View style={styles.headerContainer}>
      <Text style={styles.shipTo}>Ship To</Text>
      <Text style={styles.cell}>Customer Name: {invoice.shipping_address[0].value}</Text>
      <Text style={styles.cell}>Street Address: {invoice.shipping_address[1].value}</Text>
      <Text style={styles.cell}>City: {invoice.shipping_address[2].value}</Text>
      <Text style={styles.cell}>State: {invoice.shipping_address[3].value}</Text>
      <Text style={styles.cell}>Zip code: {invoice.shipping_address[4].value}</Text>
    </View>
  </View>
);

export default BillShipTo;
