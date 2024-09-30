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

const RecieptTableFooter = ({ total }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.description}>Terms and Conditions</Text>
      <Text style={styles.total}>All payments are to be made in full to the below account upon receipt of this invoice.</Text>
    </View>
  );
};

export default RecieptTableFooter;
