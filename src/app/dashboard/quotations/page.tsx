import { Quotes } from "@/quotations/quotations";
import { QuoteList } from "@/components";
import React from "react";

const getQuotes = async (): Promise<Quotes> => {
  const res = await fetch("http://localhost:8080/api/quote?limit=5&page=1");
  return res.json();
};

export const metadata = {
  title: "Quotations List",
  description: "Quote List",
};
const Quotations = async () => {
  const quotesObject = await getQuotes();

  return <QuoteList quotesObject={quotesObject} />;
};

export default Quotations;
