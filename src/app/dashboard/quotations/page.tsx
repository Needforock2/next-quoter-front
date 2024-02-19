import { Quotes } from "@/quotations/quotations";
import { QuoteList } from "@/components";
import React from "react";

export const metadata = {
  title: "Quotations List",
  description: "Quote List",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
const getQuotes = async (): Promise<Quotes> => {
  const res = await fetch("http://localhost:8080/api/quote?limit=5&page=1", {
    cache: "no-store",
  });
  return res.json();
};

const Quotations = async () => {
  const quotesObject = await getQuotes();
  return <QuoteList quotesObject={quotesObject} />;
};

export default Quotations;
