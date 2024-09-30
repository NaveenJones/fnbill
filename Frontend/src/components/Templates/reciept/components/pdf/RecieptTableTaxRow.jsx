import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    fontStyle: "bold",
    paddingLeft: 4,
    height: "25px",
  },
  service: {
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "left",
    paddingRight: 8,
  },

  percentage: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  total: {
    width: "20%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const RecieptTableTaxRow = ({ taxes }) => {
  return (
    <>
      {taxes.map((tax, idx) => {
        if (tax.name === "" || tax.percentage === "" || tax.total === "") return;
        return (
          <View style={styles.row} key={idx.toString()}>
            <Text style={styles.service}>{tax.name}</Text>
            <Text style={styles.percentage}>{tax.percentage}%</Text>
            <Text style={styles.total}>{tax.total}</Text>
          </View>
        );
      })}
    </>
  );
};

export default RecieptTableTaxRow;
