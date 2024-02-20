import { Quotes } from "@/quotations/quotations";
import { QuoteList } from "@/components";
import React from "react";
import { create_token, getSessionServer } from "@/app/auth/actions/auth-actions";
import { redirection } from "@/quotations/quotations-Server-actions";

export const metadata = {
  title: "Quotations List",
  description: "Quote List",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
const getQuotes = async (): Promise<Quotes | null> => {
  const authToken = await create_token();
  if (authToken) {
    const res = await fetch("http://localhost:8080/api/quote?limit=5&page=1", {
      cache: "no-store",
      headers: {
        Authorization: authToken,
      },
    });
    return res.json();
  } else {
    return null;
  }
};

const Quotations = async () => { 

  const quotesObject = await getQuotes();
  if (quotesObject) {
      return <QuoteList quotesObject={quotesObject} />
  } else {
    redirection('/api/auth/login')
  }


};

export default Quotations;
