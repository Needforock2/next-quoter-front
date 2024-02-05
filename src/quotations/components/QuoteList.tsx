"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { QuoteItem } from "../../components";
import type { Quote, Quotes } from "../quotations";
import {
  handlePaginator,
  searchQuoteNmbr,
} from "@/quotations/quotations-actions";
import { Paginator } from "../../components/Paginator";
import { CreateFilterBar } from "../../components/CreateFilterBar";

interface Props {
  quotesObject: Quotes;
}

export function QuoteList({ quotesObject }: Props) {
  const [quoteObject, setQuoteObject] = useState(quotesObject);
  const [quoteId, setQuoteId] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setQuoteId(Number(e.target.value));
    }
  };
  const handleSubmit = async () => {
    const filtered = await searchQuoteNmbr(quoteId);
    setQuoteObject(filtered);
  };

  const handlePagine = async (page: number | null) => {
    const quoteObjectPaginate = await handlePaginator(page);

    setQuoteObject(quoteObjectPaginate);
  };

  return (
    <div className="bg-white p-8 rounded-md w-full ">
      <CreateFilterBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal min-h-[50vh]">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total $
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    QuoteId
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {quoteObject.quotes.map((quote) => (
                  <QuoteItem key={quote._id} {...quote} />
                ))}
              </tbody>
            </table>
            <Paginator
              handlePagine={handlePagine}
              prevPage={quoteObject.prevPage}
              nextPage={quoteObject.nextPage}
              totalPages={quoteObject.totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
