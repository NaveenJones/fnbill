import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: "25px",
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    paddingLeft: 4,
  },
  service: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  hsn_code: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  quantity: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  price: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  total: {
    width: "20%",
  },
});

const RecieptTableServiceHeader = () => (
  <View style={styles.container}>
    <Text style={styles.service}>Services</Text>
    <Text style={styles.hsn_code}>HSN Code</Text>
    <Text style={styles.quantity}>Qty</Text>
    <Text style={styles.price}>Price (INR)</Text>
    <Text style={styles.total}>Amount (INR)</Text>
  </View>
);

export default RecieptTableServiceHeader;
