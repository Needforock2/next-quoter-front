import {
  create_token,
  getSessionServer,
} from "@/app/auth/actions/auth-actions";
import { EditQuoteForm } from "@/quotations/components/EditQuoteForm";
import { Quote } from "@/quotations/quotations";
import React from "react";

interface Props {
  params: { qid: string };
}
export const metadata = {
  title: "Edit Quotation",
  description: "Edit Quotation",
};



const getQuote = async (qid: string): Promise<Quote> => {

  const authToken = await create_token();
   const res = await fetch(`http://localhost:8080/api/quote/${qid}`, {
      cache: "no-store",
      headers: {
        Authorization: authToken!,
      },
    });
    return res.json();
};

export default async function editQuotePage({ params }: Props) {
  const quotation = await getQuote(params.qid);

  return <EditQuoteForm quotation={quotation} />;
}
