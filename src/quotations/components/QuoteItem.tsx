import Image from "next/image";
import React, { useState } from "react";
import type { Quote } from "../quotations";


import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { handleDeleteQuote, redirection } from "../quotations-Server-actions";
import Swal from "sweetalert2";

interface Props extends Quote {


}

export const QuoteItem = ({
  customer,
  status,
  createdAt,
  total,
  number,
  _id,

}: Props) => {


  const handleEdit = (qid: string) => {
    redirection(`/dashboard/quotations/edit/${qid}`);
  };


  const handleDelete = async () => {
    const res = await handleDeleteQuote(_id);

    if (res.message === "Quote deleted") {
      Swal.fire({
        title: "Success!",
        text: res.message,
        icon: "success",
        confirmButtonText: "Cool",
      });
      // redirection(`/dashboard`);

    } else {
      Swal.fire({
        title: "Error!",
        text: "There is on error",
        icon: "error",
        confirmButtonText: "Confirm",
      });
    }
  };

  const date = new Date(createdAt);
  const fullDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const formattedPrice = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(total);
  return (
    <tr className="grid grid-cols-12">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center col-span-3 ">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <Image
              className="w-full h-full rounded-full"
              src={customer[0].image}
              alt=""
              width={30}
              height={30}
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {customer[0].first_name + " " + customer[0].last_name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-3 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{formattedPrice}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-2 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{fullDate}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-1 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{number}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-2 flex items-center justify-center">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">{status}</span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-1 flex items-center justify-center">
        <div className="flex items-center justify-center gap-4">
          <AiOutlineEdit
            onClick={() => handleEdit(_id)}
            size={20}
            className="hover:cursor-pointer"
          />
          <AiOutlineDelete
            onClick={() => handleDelete()}
            size={20}
            className="hover:cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};
