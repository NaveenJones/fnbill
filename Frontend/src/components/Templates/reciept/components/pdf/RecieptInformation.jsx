import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#bff0fd",
    verticalAlign: "sub",
    padding: 5,
    textAlign: "center",
  },
  table: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    width: "50%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  },
  title: {
    textTransform: "capitalize",
    fontWeight: "bold",
    width: "50%",
    borderWidth: 1,
    borderColor: "#bff0fd",
    verticalAlign: "sub",
    padding: 5,
  },
  value: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    verticalAlign: "sub",
    padding: 5,
  },
});

const RecieptInformation = ({ invoice }) => {
  const {
    invoice_id,
    dop,
    delivery_note,
    delivery_note_date,
    supplier_references,
    other_references,
    buyers_order_no,
    despatch_doc_no,
    despatched_through,
    destination,
    terms_of_delivery,
    sellers_gst,
    buyers_gst,
  } = invoice;

  const other_invoice_info = {
    invoice_id,
    dop,

    sellers_gst,
    buyers_gst,
    delivery_note,
    delivery_note_date,
    supplier_references,
    other_references,
    buyers_order_no,
    despatch_doc_no,
    despatched_through,
    destination,
    terms_of_delivery,
  };
  const other_invoice_info_keys = Object.keys(other_invoice_info);

  const other_invoice_info_length = other_invoice_info_keys.map((key) => other_invoice_info[key]).filter(Boolean).length;
  const half_length = Math.ceil(other_invoice_info_length / 2);
  return (
    <View wrap={false}>
      <Text style={styles.heading}>Reciept Information</Text>
      <View style={styles.table}>
        <View style={styles.column}>
          {other_invoice_info_keys.slice(0, half_length).map((key, idx) => {
            if (!other_invoice_info[key]) return;
            return (
              <View style={styles.row} key={`invoice_row_1_${key}_{idx}`}>
                <Text style={styles.title}>{key.replaceAll("_", " ")}</Text>
                <Text style={styles.value}>{other_invoice_info[key]}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.column}>
          {other_invoice_info_keys.slice(half_length, other_invoice_info_keys.length).map((key, idx) => {
            if (!other_invoice_info[key]) return;
            return (
              <View style={styles.row} key={`invoice_row_2_${key}_{idx}`}>
                <Text style={styles.title}>{key.replaceAll("_", " ")}</Text>
                <Text style={styles.value}>{other_invoice_info[key]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default RecieptInformation;
