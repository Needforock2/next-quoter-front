
import PDFContainer from "@/quotations/components/PDFContainer";
import { searchQuoteId } from "@/quotations/quotations-Server-actions";
import React from "react";


interface Props {
  params: { qid: string };
}

export const metadata = {
  title: "Preview Quotation",
  description: "Preview Quotation",
};




const ViewQuotePdfpage =  async({ params }: Props) => {
    const qid = params.qid
    const quote = await searchQuoteId(qid)

    return (
      <div className="w-100 min-[100vh]">
        <PDFContainer quote={quote} />
      </div>
    );
};

export default ViewQuotePdfpage;
