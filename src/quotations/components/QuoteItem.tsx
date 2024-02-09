import Image from "next/image";
import React from "react";
import type { Quote } from "../quotations";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { redirection } from "../quotations-Server-actions";

interface Props extends Quote { }

const handleEdit = (qid: string) => {
  console.log("hola")
  redirection(`/dashboard/quotations/edit/${qid}`);
}
export const QuoteItem = ({
  customer,
  status,
  createdAt,
  total,
  number,
  _id
}: Props) => {
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
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
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
          <AiOutlineDelete size={20} className="hover:cursor-pointer" />
        </div>
      </td>
    </tr>
  );
};
