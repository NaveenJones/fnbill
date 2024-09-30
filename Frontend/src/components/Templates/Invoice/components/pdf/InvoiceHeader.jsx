import React, { Fragment } from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ImageDownloadURL } from "../../../../../env";

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  reportTitle: {
    color: "#3886bd",
    letterSpacing: 3,
    fontSize: 20,
    textAlign: "right",
    textTransform: "uppercase",
  },
  logo: {
    width: 80,
    height: 66,
  },
  invoiceNoContainer: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
});

const InvoiceHeader = ({ invoice }) => {
  const company_address = invoice.company_address;
  return (
    <View style={styles.titleContainer} wrap={false}>
      <View>
        <Image style={styles.logo} src={`${ImageDownloadURL}${invoice.logo_file}`} />
        <View style={styles.invoiceNoContainer}>
          {/* <Text style={styles.invoiceDate}>#{invoice.invoice_id}</Text>

                    <Text>{invoice.dop}</Text> */}
          <Text style={{ fontWeight: "bold" }}>{invoice.company_name}</Text>

          <Text>{company_address[1].value},</Text>
          <Text>
            {company_address.map((address, index) => {
              if (index === 0 || index === 1) return;
              const value = address.value;
              if (index === company_address.length - 1) return <Fragment key={`company_address_${index}`}>{value}</Fragment>;
              return <Fragment key={`company_address_${index}`}>{value}, </Fragment>;
            })}
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <Text style={styles.reportTitle}>Sales</Text>
        <Text style={styles.reportTitle}>Invoice</Text>
      </View>
    </View>
  );
};

export default InvoiceHeader;
