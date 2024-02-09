"use client";
import React from "react";
import { sendQuoteToDb, redirection } from "../quotations-Server-actions";
import { clearCookies } from "../quotations-actions";
import Swal from "sweetalert2";

interface Props {
  qid: string;
}

export const CreateQuoteButton = async ({ qid }: Props) => {
  const handleClick = async () => {
    try {
      const res = await sendQuoteToDb(qid);
      if (res.message === "quote created") {
        Swal.fire({
          title: "Success!",
          text: res.message,
          icon: "success",
          confirmButtonText: "Cool",
        });
      } else if (res.message === "Quote updated") {
        Swal.fire({
          title: "Success!",
          text: res.message,
          icon: "success",
          confirmButtonText: "Cool",
        });
      }
      clearCookies();
      redirection("/dashboard/quotations/");
    } catch (error) {
        Swal.fire({
          title: "Error!",
          text: 'There is on error',
          icon: "error",
          confirmButtonText: 'Confirm',
        });
    }
  };
  return (
    <div className="md:col-span-5 text-right mt-10">
      <div className="inline-flex items-end">
        <button
          onClick={() => handleClick()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
