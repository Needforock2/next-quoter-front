"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PDF from "../pdf/PDF";
import { Quote } from "../quotations";

interface Props{
    quote: Quote
}

const PDFContainer = ({ quote }: Props) => {
   
  return (
    <div className="p-10 min-w-[100%] min-h-screen">
      <PDFDownloadLink
        document={<PDF quote={quote} />}
        fileName="myfirstpdf.pdf"
      >
        {({ loading, url, error, blob }) =>
          loading ? (
            <button>Loading Document ...</button>
          ) : (
            <button className="text-[#07074D] p-3">
              Download now quotation {quote.number}
            </button>
          )
        }
      </PDFDownloadLink>

      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <PDF quote={quote} />
      </PDFViewer>
    </div>
  );
};

export default PDFContainer;
