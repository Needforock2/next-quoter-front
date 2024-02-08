'use client'
import React from 'react'
import { createQuote, redirection } from '../quotations-Server-actions';
import { clearCookies } from '../quotations-actions';
import Swal from 'sweetalert2';



export const CreateQuoteButton = async () => {
  const handleClick = async () => {
    const res = await createQuote()
    if (res.message === 'quote created') {
      Swal.fire({
        title: "Success!",
        text: res.message,
        icon: "success",
        confirmButtonText: "Cool",
      });
      clearCookies()
     redirection("/dashboard/quotations/");
    }
  }
  return (
    <div className="md:col-span-5 text-right mt-10">
      <div className="inline-flex items-end">
        <button onClick={()=>handleClick()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
