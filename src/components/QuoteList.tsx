"use client";
import React, { FormEvent, useState } from "react";
import { QuoteItem } from ".";
import type { Quote, Quotes } from "../app/quotations/quotations";
import {
  handlePaginator,
  searchQuoteNmbr,
} from "@/app/quotations/quotations-actions";
import { Paginator } from "./Paginator";

interface Props {
  quotesObject: Quotes;
}

export function QuoteList({ quotesObject }: Props) {
  const [quoteObject, setQuoteObject] = useState(quotesObject);
  const [quoteId, setQuoteId] = useState(0);

  const handleChange = (e) => {
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
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">Products Oder</h2>
          <span className="text-xs">All products item</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onChange={(e) => handleChange(e)}
              onKeyPress={handleSubmit}
              className="bg-gray-50 outline-none ml-1 block "
              type="text"
              name=""
              id=""
              placeholder="Quote Id..."
            />
          </div>
          <div className="lg:ml-40 ml-10 space-x-8">
            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
              New Report
            </button>
            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
              Create
            </button>
          </div>
        </div>
      </div>
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
              <tbody >

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
