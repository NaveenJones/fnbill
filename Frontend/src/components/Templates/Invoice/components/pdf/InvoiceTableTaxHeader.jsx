import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc"
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
    tax: {
        width: "50%",
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    percentage: {
        width: "30%",
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    total: {
        width: "20%",
    },
});

const InvoiceTableTaxHeader = () => (
    <View style={styles.container}>
        <Text style={styles.tax}>Tax Name</Text>
        <Text style={styles.percentage}>Percentage (%)</Text>
        <Text style={styles.total}>Amount (INR)</Text>
    </View>
);

export default InvoiceTableTaxHeader