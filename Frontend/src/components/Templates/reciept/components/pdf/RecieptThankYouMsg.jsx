import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    width: "100%",
    fontSize: 12,
    textAlign: "center",
  },
});

const RecieptThankYouMsg = () => (
  <View style={styles.titleContainer} wrap={false}>
    <Text style={styles.reportTitle}>Thank you</Text>
  </View>
);

export default RecieptThankYouMsg;
