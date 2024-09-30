import React from "react";
import { Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { cheque_do, bank_account_do } from "../../../../../forms/Invoice/CustomInvoice/CustomInvoice.do";
import ReciptPNG from "../../../../../assets/recipt/recipt-paid-opacity.png";
import moment from "moment";

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
    border: "1px solid #bff0fd",
    alignItems: "center",
    padding: "5px",

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
  },
  payment: {
    display: "flex",
    gap: "4px",
    justifyContent: "space-between",
    width: "40%",
    // padding: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  },
  cell: {
    width: "50%",
  },
  image: { backgroundSize: "80px", backgroundPosition: "center", backgroundRepeat: "no-repeat" },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 50,
    right: 50,
    bottom: 0,
    width: "100px",
    height: "100px",
    opacity: "50",
  },
  trasaction_container: {
    fontFamily: "Helvetica-Oblique",
    padding: 5,
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    width: "100%",
  },
  date: {
    fontSize: 11,
    width: "100%",
  },
});

const RecieptTransaction = ({ payment_details }) => {
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

  return (
    <View style={styles.bill_send_container} wrap={false}>
      <Text style={styles.heading}>Transaction Information</Text>
      {payment_details ? (
        payment_details.map((transaction, idx) => {
          const { payment_terms, bank_account, cheque, paid_by, paid_on } = transaction;
          return (
            <View key={`transaction-${idx}`} className="py-3 px-8 rounded-[6px] bg-white min-h-[100px]" id="payment">
              <View style={styles.container}>
                <View style={styles.payment}>
                  <View style={styles.trasaction_container}>
                    <Text style={styles.name}>{paid_by}</Text>
                    <Text style={styles.date}>{moment(paid_on).local().format("ddd, DD-MM-yyyy h:mm A")}</Text>
                  </View>
                </View>
                {payment_terms === "bank_account" ? (
                  <View style={styles.trasaction_container}>
                    {bank_account.map((info, idx) => {
                      return (
                        <View style={styles.row} key={idx.toString()}>
                          <Text style={styles.cell}>{bank_account_do[idx].title}</Text>
                          <Text style={styles.cell}>{info.value}</Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <></>
                )}
                {payment_terms === "cheque" ? (
                  <View style={styles.trasaction_container}>
                    {cheque.map((info, idx) => {
                      return (
                        <View style={styles.row} key={idx.toString()}>
                          <Text style={styles.cell}>{cheque_do[idx].title}</Text>
                          <Text style={styles.cell}>{info.value}</Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <></>
                )}
                {payment_terms === "cash" ? (
                  <View style={styles.trasaction_container}>
                    <View style={styles.row} key={idx.toString()}>
                      <Text style={styles.cell}>Paid in Cash</Text>
                    </View>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};

export default RecieptTransaction;
