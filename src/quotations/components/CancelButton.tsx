"use client";
import React from "react";
import { sendQuoteToDb, redirection } from "../quotations-Server-actions";
import { clearCookies } from "../quotations-actions";
import Swal from "sweetalert2";


export const CancelButton = async () => {
  const handleClick = () => {
      redirection('/dashboard/quotations')
      clearCookies()
  };
  return (
    <div className="md:col-span-5 text-right mt-10">
      <div className="inline-flex items-end">
        <button
          onClick={() => handleClick()}
          className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
