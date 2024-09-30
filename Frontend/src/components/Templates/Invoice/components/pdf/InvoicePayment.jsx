import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { cheque_do, bank_account_do } from "../../../../../forms/Invoice/CustomInvoice/CustomInvoice.do";

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    marginBottom: 5,

    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#bff0fd",
    fontFamily: "Helvetica-Oblique",
  },
  title: {
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#bff0fd",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "5px",
  },
  tac: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "60%",
  },
  tac_text: {
    textAlign: "center",
    paddingBottom: "10px",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    gap: "5px",
    width: "100%",
  },
  cell: {},
  payment_info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "5px",
    width: "40%",
  },
  payment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
});

const InvoicePayment = ({ invoice }) => {
  const terms_and_condition = {
    bank_account: {
      icon: "fas fa-building-columns",
      text: `All payments must be made via bank transfer to the \naccount details provided on the invoice.`,
    },
    cheque: {
      icon: "fas fa-money-check",
      text: `Cheques must be  dated and signed by an \nauthorized signatory of the payer.`,
    },
    cash: {
      icon: "fas fa-money-bill-1",
      text: `Payments must be made in full at the \ntime of delivery or service completion.`,
    },
  };
  const { payment_terms, bank_account, cheque } = invoice;
  return (
    <View style={styles.bill_send_container} wrap={false}>
      <View className="py-3 px-8 rounded-[6px] bg-white min-h-[100px]" id="payment">
        <Text style={styles.heading}>Payment Information</Text>
        <View style={styles.container}>
          <View style={styles.tac}>
            <Text style={styles.title}>Terms And Conditions</Text>
            {payment_terms.map((payment_term, idx) => {
              return (
                <Text key={`payment-terms_and_condition-${idx}`} style={styles.tac_text}>
                  {terms_and_condition[payment_term].text}
                </Text>
              );
            })}
          </View>
          <View style={styles.payment_info}>
            <View style={styles.payment}>
              {payment_terms.includes("bank_account") ? (
                bank_account.map((info, idx) => {
                  return (
                    <View style={styles.row} key={idx.toString()}>
                      <Text style={styles.cell}>{bank_account_do[idx].title}</Text>
                      <Text style={styles.cell}>{info.value}</Text>
                    </View>
                  );
                })
              ) : (
                <></>
              )}
            </View>
            <View style={styles.payment}>
              {payment_terms.includes("cheque") ? (
                cheque.map((info, idx) => {
                  return (
                    <View style={styles.row} key={idx.toString()}>
                      <Text style={styles.cell}>{cheque_do[idx].title}</Text>
                      <Text style={styles.cell}>{info.value}</Text>
                    </View>
                  );
                })
              ) : (
                <></>
              )}
            </View>
            <View style={styles.payment}>
              {payment_terms.includes("cash") ? (
                <View style={styles.row}>
                  <Text style={styles.cell}>Pay by Cash</Text>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InvoicePayment;
