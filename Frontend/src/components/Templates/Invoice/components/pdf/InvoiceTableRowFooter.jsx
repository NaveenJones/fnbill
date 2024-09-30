import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
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
  description: {
    width: "80%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "20%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRowFooter = ({ total, is_round_off, round_off }) => {
  return (
    <View>
      {is_round_off && (
        <View style={styles.row}>
          <Text style={styles.description}>Round Off (INR)</Text>
          <Text style={styles.total}>{Number.parseFloat(round_off).toFixed(2)}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.description}>Total (INR)</Text>
        <Text style={styles.total}>
          {is_round_off ? Number.parseFloat(total).toFixed(2) - Number.parseFloat(round_off).toFixed(2) : Number.parseFloat(total).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceTableRowFooter;
