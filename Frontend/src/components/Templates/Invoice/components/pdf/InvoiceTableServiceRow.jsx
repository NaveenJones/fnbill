import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc"
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        borderBottomColor: "#bff0fd",
        borderBottomWidth: 1,
        alignItems: "center",
        fontStyle: "bold",
        paddingLeft: 4,
        height: "35px"
    },
    service: {
        width: "30%",
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: "left",
        paddingRight: 8,
    },
    description: {
        fontSize: "8px"
    },
    hsn_code: {
        width: "20%",
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: "right",
        paddingRight: 8,
    },
    quantity: {
        width: "15%",
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: "right",
        paddingRight: 8,
    },
    price: {
        width: "15%",
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


const InvoiceTableServiceRow = ({ services }) => {

    return (<>{services.map((service, idx) =>
        <View style={styles.row} key={idx.toString()}>
            <Text style={styles.service}>{service.name}{"\n"}
                <Text style={styles.description}>{service.description}</Text>
            </Text>
            <Text style={styles.hsn_code}>{service.hsn_code}</Text>
            <Text style={styles.quantity}>{service.quantity}</Text>
            <Text style={styles.price}>{service.price}</Text>
            <Text style={styles.total}>{service.total}</Text>
        </View>
    )}</>)
};

export default InvoiceTableServiceRow