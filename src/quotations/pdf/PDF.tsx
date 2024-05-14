// components/PDFDocument.js
"use client";
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { Quote } from "../quotations";
const logo = "../pdf/nextjslogo.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  companyData: {
    fontSize: 15,
    maxWidth: "50%",
  },
  data: {
    marginBottom: 5,
  },
  image: {
      width: 90,
      height: 60
  },
  productTable: {
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCell: {
    padding: 5,
    fontSize: "10px",
    textAlign: "center",
  },
  customerTableCell: {
    padding: 5,
    fontSize: "10px",
    textAlign: "left",
  },
  totalAmount: {
    fontSize: "15px",
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    gap: "10px",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: "10px",
  },
  borderRed: {
    textAlign: "center",
    padding: "10px 10px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d62a1e",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerFlex: {
    display: "flex",

    flexDirection: "row",
    justifyContent: "space-between",
    gap: "10px",
  },
});
interface Props {
  quote: Quote;
}

const PDF = ({ quote }: Props) => {
  const { number, customer, sortedProducts, total, createdAt } = quote;

  const vat = (total * 0.19).toFixed(2);
  const gross = Number(total) + Number(vat);

  const date = new Date(createdAt);
  const fullDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const valid = new Date(createdAt);
  valid.setDate(valid.getDate() + 30);

  const validFullDate = `${valid.getFullYear()}-${
    valid.getMonth() + 1
  }-${valid.getDate()}`;

  const products = {
    code: sortedProducts[0].code,
    name: sortedProducts[0].name,
    description: sortedProducts[0].description,
    quantity: sortedProducts[0].quantity,
    price: sortedProducts[0].price,
    total: "total",
  };

  const customerHeader = {
    first_name: "Customer name:",
    rut: "VAT Number:",
  };
  const customerHeader2 = {
    email: "Email:",
    address: "Address:",
    country: "Country:",
  };

  const dateHeader = {
    date: "Date Quoted",
    valid: "Valid Until",
  };

  const logoSrc =
    "https://drive.google.com/file/d/1fWwMaiCAa2GjS6Vo_FBdL79fgIHecDd9/view?usp=drive_link";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerFlex}>
          <View style={{display: "flex", alignItems: 'center'}}>
            <Image src="../../../logo.png" style={styles.image}  />
          </View>
          <View style={[styles.section]}>
            <Text style={styles.heading}>ElectraTech Solutions</Text>
            <Text style={styles.companyData}>VAT: 5465432556-2</Text>
            <Text style={styles.companyData}>
              Address: 123 Spark Avenue, Silicon Valley, CA 94086, USA
            </Text>
            <Text style={styles.companyData}>Phone: +1 (555) 123-4567</Text>
          </View>
          <View
            style={[
              styles.section,
              styles.borderRed,
              { width: "150px", height: "100px" },
            ]}
          >
            <Text style={styles.heading}>Quotation</Text>
            <Text style={styles.heading}>Number: {number}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.productTable}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {Object.values(customerHeader).map((element) => (
                <Text
                  key={element}
                  style={[styles.customerTableCell, { width: "50%" }]}
                >
                  {element}
                </Text>
              ))}
            </View>
            <View style={[styles.tableRow, { padding: "3px" }]}>
              <Text style={[styles.customerTableCell, { width: "50%" }]}>
                {customer[0].first_name + " " + customer[0].last_name}
              </Text>
              <Text style={[styles.customerTableCell, { width: "50%" }]}>
                {customer[0].rut}
              </Text>
            </View>
          </View>

          <View style={styles.productTable}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {Object.values(customerHeader2).map((element) => (
                <Text
                  key={element}
                  style={[
                    styles.customerTableCell,
                    {
                      width: element === "Address:" ? "40%" : "30%",
                    },
                  ]}
                >
                  {element}
                </Text>
              ))}
            </View>
            <View style={[styles.tableRow, { padding: "3px" }]}>
              <Text style={[styles.customerTableCell, { width: "30%" }]}>
                {customer[0].mail}
              </Text>
              <Text style={[styles.customerTableCell, { width: "40%" }]}>
                {customer[0].street + " " + customer[0].street_number}
              </Text>
              <Text style={[styles.customerTableCell, { width: "30%" }]}>
                {customer[0].country}
              </Text>
            </View>
          </View>
          <View style={styles.productTable}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {Object.values(dateHeader).map((element) => (
                <Text
                  key={element}
                  style={[styles.customerTableCell, { width: "50%" }]}
                >
                  {element}
                </Text>
              ))}
            </View>
            <View style={[styles.tableRow, { padding: "3px" }]}>
              <Text style={[styles.customerTableCell, { width: "50%" }]}>
                {fullDate}
              </Text>
              <Text style={[styles.customerTableCell, { width: "50%" }]}>
                {validFullDate}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.productTable}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {Object.keys(products).map((key) => (
                <Text
                  key={key}
                  style={[
                    styles.tableCell,
                    {
                      width: key === "description" ? "50%" : "10%",
                    },
                  ]}
                >
                  {key.charAt(0).toUpperCase() + key.substring(1)}
                </Text>
              ))}
            </View>
            {sortedProducts.map((product) => (
              <View key={product._id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: "10%" }]}>
                  {product.code}
                </Text>
                <Text style={[styles.tableCell, { width: "10%" }]}>
                  {product.name}
                </Text>
                <Text style={[styles.tableCell, { width: "50%" }]}>
                  {product.description}
                </Text>
                <Text style={[styles.tableCell, { width: "10%" }]}>
                  {product.quantity}
                </Text>
                <Text style={[styles.tableCell, { width: "10%" }]}>
                  $ {product.price}
                </Text>
                <Text style={[styles.tableCell, { width: "10%" }]}>
                  $ {product.price * product.quantity}
                </Text>
              </View>
            ))}
          </View>
          <View style={[styles.totalAmount]}>
            <Text>Net: </Text>
            <Text>$ {total.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalAmount]}>
            <Text>VAT 19%: </Text>
            <Text>$ {vat}</Text>
          </View>
          <View style={[styles.totalAmount]}>
            <Text>Grand Total: </Text>
            <Text>$ {gross.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
      %
    </Document>
  );
};

export default PDF;
